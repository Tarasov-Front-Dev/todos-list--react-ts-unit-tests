import { TodoModel } from "../../App";

export enum FilterOptions {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

type FilterTodosProps = {
  filter: (typeof FilterOptions)[keyof typeof FilterOptions];
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
};

export default function FilterTodos({
  filter,
  setFilter,
  setTodos,
}: FilterTodosProps) {
  const handleFilterChange = (value: string) => {
    if (FilterOptions[value as keyof typeof FilterOptions]) {
      setFilter(value);
    }
  };

  return (
    <section className="todos__filter">
      <div className="todos__left">__ items left</div>
      <ul className="todos__filters">
        <li className={"all" + (filter === FilterOptions.ALL ? " picked" : "")}>
          All
        </li>
        <li
          className={
            "active" + (filter === FilterOptions.ACTIVE ? " picked" : "")
          }
        >
          Active
        </li>
        <li
          className={
            "completed" + (filter === FilterOptions.COMPLETED ? " picked" : "")
          }
        >
          Completed
        </li>
      </ul>
      <div className="todos__clearCompleted">Clear completed</div>
    </section>
  );
}
