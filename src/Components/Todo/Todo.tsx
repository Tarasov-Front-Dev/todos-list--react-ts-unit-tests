import { TodoModel } from "../../App";

type TodoProps = {
  todo: TodoModel;
  completeTodo: (id: number) => void;
};

export default function Todo({ todo, completeTodo }: TodoProps) {
  return (
    <li
      className={"todo__item" + (todo.completed ? " completed" : "")}
      onClick={() => completeTodo(todo.id)}
    >
      {todo.value}
    </li>
  );
}
