import { render, screen } from "@testing-library/react";
import TodosList from "./TodosList";
import { TodoModel } from "../../App";

const todosTruthy: TodoModel[] = [
  { id: 1, value: "First todo", completed: false },
  { id: 2, value: "Second todo", completed: true },
];

const todosEmpty: [] = [];

describe("TodoList", () => {
  it("TodoList renders", () => {
    render(<TodosList todos={todosTruthy} setTodos={jest.fn()} />);

    expect(screen.getByText(/First todo/)).toBeInTheDocument();
    expect(screen.getByText(/Second todo/)).toBeInTheDocument();
  });

  it("TodoList doesn't render without data", () => {
    render(<TodosList todos={todosEmpty} setTodos={jest.fn()} />);

    expect(screen.queryByRole("list")).toBeNull();
  });

  it("TodosList snapshot with data", () => {
    const todoList = render(
      <TodosList todos={todosTruthy} setTodos={jest.fn()} />
    );

    expect(todoList).toMatchSnapshot();
  });

  it("TodosList snapshot without data", () => {
    const todoList = render(
      <TodosList todos={todosEmpty} setTodos={jest.fn()} />
    );

    expect(todoList).toMatchSnapshot();
  });
});
