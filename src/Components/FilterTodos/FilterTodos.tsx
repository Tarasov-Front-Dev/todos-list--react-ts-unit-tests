import { TodoModel } from "../../App";

export enum FilterOptions {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

type FilterTodosProps = {
  filter: FilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
  itemsLeft: number;
};

export default function FilterTodos({
  filter,
  setFilter,
  setTodos,
  itemsLeft,
}: FilterTodosProps) {
  const handleFilterChange = (value: string | null) => {
    if (!Object.keys(FilterOptions).some((key) => key === value?.toUpperCase()))
      return;
    else
      setFilter(
        FilterOptions[value?.toUpperCase() as keyof typeof FilterOptions]
      );
  };

  const handleClearCompletedTodos = () => {
    setTodos((todos) => todos.filter((todo) => !todo.completed));
    setFilter(FilterOptions.ALL);
  };

  const filterOptions = Object.values(FilterOptions).map((option) => (
    <li
      key={option}
      className={option === filter ? "toggled" : ""}
      onClick={(e) =>
        handleFilterChange((e.target as HTMLLIElement).textContent)
      }
    >
      {option[0].toUpperCase() + option.slice(1)}
    </li>
  ));

  return (
    <section className="todos__filter">
      <div className="todos__left">{itemsLeft} items left</div>
      <ul className="todos__filters">{filterOptions}</ul>
      <div
        className="todos__clearCompleted"
        onClick={handleClearCompletedTodos}
      >
        Clear completed
      </div>
    </section>
  );
}
