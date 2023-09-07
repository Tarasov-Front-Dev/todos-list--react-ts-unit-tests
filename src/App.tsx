import { useState } from "react";
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

  return (
    <article className="todos__wrapper">
      <h1>todos</h1>
      <FormNewTodo setTodos={setTodos} />
      <Todos todos={filteredTodos(todos, filter)} setTodos={setTodos} />
      <FilterTodos
        filter={filter}
        setFilter={setFilter}
        setTodos={setTodos}
        itemsLeft={filteredTodos(todos, filter).length}
      />
    </article>
  );
}

export default App;
