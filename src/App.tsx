import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todoInput, setTodoInput] = useState("");
  const [updatedTodoInput, setUpdatedTodoInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState("");

  interface Todo {
    id: string,
    todo: string
  }

  useEffect(() => {
    console.log("todo:", todos)
  }, [todos])

  const addTodo = () => {
    setTodos(prevTodos => [
      { id: uuidv4(), todo: todoInput }, ...prevTodos
    ])

    setTodoInput("")
  }

  const editTodo = (todo: Todo) => {
    setEditId(todo.id)
    setUpdatedTodoInput(todo.todo)
  }

  const saveTodo = (todoId: string, updatedTodo: string) => {
    setTodos(prevTodos => prevTodos.map(todoItem => {
      return todoItem.id === todoId ? {
        ...todoItem, todo: updatedTodo
      } : todoItem
    }))
    setEditId("")
  }

  const deleteTodo = (todoId: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => {
      return todo.id != todoId;
    }))
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>Todo App!</h1>
      <input type="text" placeholder="Enter your todo..."
        onChange={e => setTodoInput(e.target.value)} value={todoInput} />
      <button onClick={addTodo}>Add</button>

      {/* todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.id != editId ? (
              <>
                <span>{todo.todo}</span>
                <button onClick={() => editTodo(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            ) : (
              <>
                <input type="text" value={updatedTodoInput}
                  onChange={e => setUpdatedTodoInput(e.target.value)} />
                <button onClick={() => saveTodo(todo.id, updatedTodoInput)}>Save</button>
              </>
            )}
          </li>

        ))}
      </ul>
    </div>
  )
}

export default App;