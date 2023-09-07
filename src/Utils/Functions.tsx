import { TodoModel } from "../App";
import { FilterOptions } from "../Components/FilterTodos/FilterTodos";

export function filteredTodos(todos: TodoModel[], filter: FilterOptions) {
  return todos.filter((todo) => {
    if (filter === FilterOptions.ALL) return true;
    if (filter === FilterOptions.ACTIVE) return !todo[FilterOptions.COMPLETED];
    if (filter === FilterOptions.COMPLETED)
      return todo[FilterOptions.COMPLETED];
  });
}
