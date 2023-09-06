import { useRef } from "react";
import { TodoModel } from "../../App";
import Input from "../../UI/Input/Input";

type FormNewTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
};

export default function FormNewTodo({ setTodos }: FormNewTodoProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target as HTMLFormElement)["newTodo"].value) return;

    setTodos((prev) => {
      return [
        {
          id: Date.now(),
          value: (e.target as HTMLFormElement)["newTodo"].value.trim(),
          completed: false,
        },
        ...prev,
      ];
    });
    setTimeout(() => (e.target as HTMLFormElement).reset(), 0);
  };

  return (
    <form name="todos__form" className="todos__form" onSubmit={handleSubmit}>
      <label htmlFor="newTodo">
        <Input
          id="newTodo"
          name="newTodo"
          placeholder="What needs to be done?"
          autoComplete="off"
        />
      </label>
    </form>
  );
}
