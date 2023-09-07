import { render, screen } from "@testing-library/react";
import FilterTodos, { FilterOptions } from "./FilterTodos";

describe("FilterTodos", () => {
  it("FilterTodos renders with 2 items left", () => {
    render(
      <FilterTodos
        filter={FilterOptions.ALL}
        setFilter={jest.fn()}
        setTodos={jest.fn()}
        itemsLeft={2}
      />
    );
    expect(screen.getByText(/2 items left/)).toBeInTheDocument();
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
    expect(screen.getByText(/Clear completed/)).toBeInTheDocument();

    // Check for 'toggled' class
    expect(screen.getByText(/All/)).toHaveClass("toggled");
    expect(screen.getByText(/All/)).toHaveStyle("border-color: $bgColor;");
  });

  it("FilterTodos renders with 'undefined' items left", () => {
    render(
      <FilterTodos
        filter={FilterOptions.ACTIVE}
        setFilter={jest.fn()}
        setTodos={jest.fn()}
        itemsLeft={({} as []).length}
      />
    );
    expect(screen.getByText(/items left/)).toBeInTheDocument();
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
    expect(screen.getByText(/Clear completed/)).toBeInTheDocument();

    // Check for 'toggled' class
    expect(screen.getByText(/Active/)).toHaveClass("toggled");
    expect(screen.getByText(/Active/)).toHaveStyle("border-color: $bgColor;");
  });

  it("FilterOption has toggled style", () => {
    render(
      <FilterTodos
        filter={FilterOptions.COMPLETED}
        setFilter={jest.fn()}
        setTodos={jest.fn()}
        itemsLeft={5}
      />
    );

    // Check for 'toggled' class
    expect(screen.getByText(/Completed/)).toHaveClass("toggled");
    expect(screen.getByText(/Completed/)).toHaveStyle(
      "border-color: $bgColor;"
    );
  });

  it("FilterTodos snapshot", () => {
    const filterTodos = render(
      <FilterTodos
        filter={FilterOptions.ALL}
        setFilter={jest.fn()}
        setTodos={jest.fn()}
        itemsLeft={0}
      />
    );
    expect(filterTodos).toMatchSnapshot();
  });
});
