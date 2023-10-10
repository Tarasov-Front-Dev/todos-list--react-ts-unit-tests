import { render, screen } from "@testing-library/react";
import FormNewTodo from "./FormNewTodo";

describe("FormNewTodo", () => {
  it("FormNewTodo renders", () => {
    render(<FormNewTodo setTodos={jest.fn()} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
