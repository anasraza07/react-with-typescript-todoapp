import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputField from "./components/InputField";
import type { Todo } from "./App.types";
import TodoList from "./components/TodoItem";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");
  const [updatedTodoInput, setUpdatedTodoInput] = useState("");
  const [editId, setEditId] = useState("");

  // add todo function
  const handleAddTodo = () => {
    if (!todoInput.trim()) return;

    setTodos((prev) => [{ id: uuidv4(), todo: todoInput, isDone: false }, ...prev]);
    setTodoInput("");
  };

  // edit todo function
  const handleEditTodo = (todo: Todo) => {
    setEditId(todo.id);
    setUpdatedTodoInput(todo.todo);
  };

  // save todo function
  const handleSaveTodo = (id: string, updated: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, todo: updated } : item
      )
    );
    setEditId("");
  };

  // delete todo function
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-purple-200 flex justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-4xl font-bold mb-8 text-purple-600 text-center">
          Todo App
        </h1>

        {/* Input bar */}
        <InputField todoInput={todoInput} setTodoInput={setTodoInput} addTodo={handleAddTodo} />

        {/* Todo List */}
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} editId={editId}
              editTodo={handleEditTodo} deleteTodo={handleDeleteTodo} saveTodo={handleSaveTodo} updatedTodoInput={updatedTodoInput} setUpdatedTodoInput={setUpdatedTodoInput} toggleTodo={handleToggleTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
