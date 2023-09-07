import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { TodoModel } from "./App";
import FormNewTodo from "./Components/FormNewTodo/FormNewTodo";

const todosTruthy: TodoModel[] = [
  { id: 1, value: "First todo", completed: false },
  { id: 2, value: "Second todo", completed: true },
];

describe("App", () => {
  it("App renders", () => {
    render(<App />);

    expect(screen.getByText(/todos/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/What needs to be done?/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/items left/)).toBeInTheDocument();
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
    expect(screen.getByText(/Clear completed/)).toBeInTheDocument();
  });

  it("Typing correctly", () => {
    render(<App />);
    expect(screen.queryByDisplayValue(/First task/)).toBeNull();

    userEvent.type(screen.getByRole("textbox"), "First task");
    expect(screen.queryByDisplayValue(/First task/)).toBeInTheDocument();
  });

  it("Adding new todo", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<FormNewTodo setTodos={jest.fn()} />);
    fireEvent.submit(getByTestId("form"));
    expect;
  });
});
