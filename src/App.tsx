import { useMemo, useState } from "react";
import FormNewTodo from "./Components/FormNewTodo/FormNewTodo";
import Todos from "./Components/TodosList/TodosList";
import FilterTodos, {
  FilterOptions,
} from "./Components/FilterTodos/FilterTodos";
import { filteredTodos } from "./Utils/Functions";

export type TodoModel = {
  id: number;
  value: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState(FilterOptions.ALL);

  const memoizedFilteredTodos: TodoModel[] = useMemo(
    () => filteredTodos(todos, filter),
    [todos, filter]
  );

  return (
    <article className="todos__wrapper">
      <h1>todos</h1>
      <FormNewTodo setTodos={setTodos} />
      <Todos todos={memoizedFilteredTodos} setTodos={setTodos} />
      <FilterTodos
        filter={filter}
        setFilter={setFilter}
        setTodos={setTodos}
        itemsLeft={memoizedFilteredTodos.length}
      />
    </article>
  );
}

export default App;
