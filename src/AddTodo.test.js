import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';



let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  
  fireEvent.change(inputTask, {target:{value: "Duplicate Task"}});  //this item is added
  fireEvent.change(inputDate, {target:{value: "12/12/2022"}});
  fireEvent.click(button);                                           

  fireEvent.change(inputTask, {target:{value: "Duplicate Task"}});  //this item is a duplicate and is not
  fireEvent.change(inputDate, {target:{value: "12/12/2023"}});      // going to be added, but we still try
  fireEvent.click(button);

  const times = screen.getAllByText(/Duplicate Task/i);
  
  expect(times).toHaveLength(1); // only one was added

  
 });                              

 
 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});
  const check = screen.getByText(/You have no todo's left/i)

  fireEvent.change(inputTask, {target:{value: null}});
  fireEvent.change(inputDate, {target:{value: "12/12/2022"}});
  fireEvent.click(button);
  expect(check).toBeInTheDocument();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});
  const check = screen.getByText(/You have no todo's left/i)

  fireEvent.change(inputTask, {target:{value: "Task with no due date"}});
  fireEvent.change(inputDate, {target:{value: null}});
  fireEvent.click(button);
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, {target:{value: "Delete this task"}});
  fireEvent.change(inputDate, {target:{value: "12/12/2022"}});
  fireEvent.click(button);

  const deletebutton = screen.getByRole('checkbox');
  fireEvent.click(deletebutton);
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, {target:{value: "Late Task"}});
  fireEvent.change(inputDate, {target:{value: "12/12/2021"}});
  fireEvent.click(button);

  const LateTask = screen.getByTestId(/Late Task/i).style.background;
  expect(LateTask).toBe("rgb(136, 8, 8)");
 });
