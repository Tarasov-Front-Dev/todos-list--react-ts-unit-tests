import { useState } from "react";
import { TodoModel } from "../../App";
import Input from "../../UI/Input/Input";

type FormNewTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
};

export default function FormNewTodo({ setTodos }: FormNewTodoProps) {
  const [newTodoValue, setNewTodoValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value)
      return;

    setTodos((prev) => {
      return [
        {
          id: Date.now(),
          value: (
            (e.target as HTMLFormElement).elements[0] as HTMLInputElement
          ).value.trim(),
          completed: false,
        },
        ...prev,
      ];
    });
    setNewTodoValue("");
  };

  return (
    <form
      name="todos__form"
      className="todos__form"
      onSubmit={handleSubmit}
      data-testid="todos__form"
    >
      <label htmlFor="newTodo">
        <Input
          id="newTodo"
          name="newTodo"
          value={newTodoValue}
          onChange={(e) => setNewTodoValue(e.target.value)}
          placeholder="What needs to be done?"
          autoComplete="off"
        />
      </label>
    </form>
  );
}
