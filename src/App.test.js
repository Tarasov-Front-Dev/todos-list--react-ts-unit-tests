import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { TodoModel } from "./App";
import { act } from "react-dom/test-utils";
import { FilterOptions } from "./Components/FilterTodos/FilterTodos";

const todosTruthy = [
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

    act(() => userEvent.type(screen.getByRole("textbox"), "First task"));
    expect(screen.getByDisplayValue(/First task/)).toBeInTheDocument();
  });

  it("Adding todos correctly", () => {
    render(<App />);
    const form = screen.getByTestId("todos__form");
    const input = screen.getByRole("textbox");

    act(() => userEvent.type(input, "First task"));
    expect(input).toHaveDisplayValue("First task");
    act(() => fireEvent.submit(form));
    expect(input).not.toHaveDisplayValue("First task");

    act(() => userEvent.type(input, "Second task"));
    expect(input).toHaveDisplayValue("Second task");
    act(() => fireEvent.submit(form));
    expect(input).not.toHaveDisplayValue("Second task");
  });

  it("Completing todos correctly", () => {
    render(<App />);
    //--START--Initial state
    const form = screen.getByTestId("todos__form");
    const input = screen.getByRole("textbox");

    act(() => userEvent.type(input, "First task"));
    act(() => fireEvent.submit(form));

    act(() => userEvent.type(input, "Second task"));
    act(() => fireEvent.submit(form));

    const todosList = screen.getByTestId("todos__list");
    //---END--Initial state

    expect(todosList.children[0]).toContainHTML("Second task");
    expect(todosList.children[1]).toContainHTML("First task");

    expect(todosList.children[1]).not.toHaveClass("completed");
    // // Marking "First task" as completed
    act(() => userEvent.click(screen.getByText("First task")));
    expect(todosList.children[1]).toHaveClass("completed");
  });

  it("Toggle todos filter", () => {
    const AppComponent = render(<App />);

    //--START--Initial state
    const form = screen.getByTestId("todos__form");
    const input = screen.getByRole("textbox");

    act(() => userEvent.type(input, "First task"));
    act(() => fireEvent.submit(form));

    act(() => userEvent.type(input, "Second task"));
    act(() => fireEvent.submit(form));

    const todosList = screen.getByTestId("todos__list");
    const todosFilter = screen.getByTestId("todos__filter");

    // // Checking if "First task" toBeInTheDocument() on filter 'ALL'
    expect(todosFilter.children[0]).toHaveClass("toggled");
    expect(todosFilter.children[1]).not.toHaveClass("toggled");
    expect(todosFilter.children[2]).not.toHaveClass("toggled");
    expect(screen.getByText("First task")).toBeInTheDocument();
    // // Marking "First task" as completed
    act(() => userEvent.click(screen.getByText("First task"))); // click <li>'First task'</li>
    expect(screen.getByText("First task")).toBeInTheDocument();
    //---END--Initial state

    expect(screen.getByText("2 items left")).toBeInTheDocument();

    act(() => userEvent.click(todosFilter.children[1])); // click --Active--
    expect(screen.getByText("Second task")).toBeInTheDocument();
    expect(screen.queryByText("First task")).not.toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();

    act(() => userEvent.click(todosFilter.children[2])); // click --Completed--
    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.queryByText("Second task")).not.toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();

    act(() => userEvent.click(screen.getByText(/clear completed/i))); // auto toggle to --All--
    expect(screen.queryByText("First task")).not.toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();

    act(() => userEvent.click(todosFilter.children[1])); // click --Active--
    expect(screen.queryByText("First task")).not.toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();

    expect(AppComponent).toMatchSnapshot();
  });
});
