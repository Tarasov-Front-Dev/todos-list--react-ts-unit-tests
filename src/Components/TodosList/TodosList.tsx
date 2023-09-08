import { TodoModel } from "../../App";
import Todo from "../Todo/Todo";

type TodosProps = {
  todos: TodoModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
};

export default function Todos({ todos, setTodos }: TodosProps) {
  if (!todos.length) return null;

  const completeTodo = (id: number) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  return (
    <ul className="todos__list" data-testid="todos__list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} completeTodo={completeTodo} />
      ))}
    </ul>
  );
}
