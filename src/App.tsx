import { useState } from "react";
import FormNewTodo from "./Components/FormNewTodo/FormNewTodo";
import Todos from "./Components/Todos/Todos";
import FilterTodos, {
  FilterOptions,
} from "./Components/FilterTodos/FilterTodos";

export type TodoModel = {
  id: number;
  value: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<keyof typeof FilterOptions>(
    FilterOptions.ALL
  );

  return (
    <article className="todos__wrapper">
      <h1>todos</h1>
      <FormNewTodo setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
      <FilterTodos filter={filter} setFilter={setFilter} setTodos={setTodos} />
    </article>
  );
}

export default App;
