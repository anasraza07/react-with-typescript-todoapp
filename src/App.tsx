import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const App = () => {
  const [todoInput, setTodoInput] = useState("");
  const [updatedTodoInput, setUpdatedTodoInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([{ id: "1", todo: "go to gym" },
  { id: "2", todo: "eat lunch" }
  ]);
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
    <div className="min-h-screen">
      <div className="container max-w-[600px] mx-auto p-4 bg-gray-50">
        <h1 className="text-4xl font-bold my-8">Todo App!</h1>
        <div className="flex gap-3 mb-6">
          <input type="text" className="flex-1 border border-gray-400 rounded-sm p-1 outline-none px-2" placeholder="Enter your todo..."
            onChange={e => setTodoInput(e.target.value)} value={todoInput} />
          <button onClick={addTodo} className="bg-purple-500 text-white px-2 rounded-sm font-extrabold cursor-pointer text-lg border-none outline-none hover:bg-purple-500/90"><IoMdAdd /></button>
        </div>
        {/* todos */}
        <ul className="flex flex-col gap-4">
          {todos.map(todo => (
            <li key={todo.id} className="bg-gray-200 p-1 px-2 flex justify-between items-center rounded-sm">
              {todo.id != editId ? (
                <>
                  <span className="text-lg">{todo.todo}</span>
                  <div className="space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-500/90 p-2 text-white rounded-sm cursor-pointer" onClick={() => editTodo(todo)}><FaEdit /></button>
                    <button className="bg-red-500 hover:bg-red-500/90 p-2 text-white rounded-sm cursor-pointer" onClick={() => deleteTodo(todo.id)}><MdDelete /></button>
                  </div>
                </>
              ) : (
                <>
                  <input type="text" value={updatedTodoInput} className="bg-white rounded-sm px-2"
                    onChange={e => setUpdatedTodoInput(e.target.value)} />
                  <button className="bg-purple-500 text-white px-2 rounded-sm font-bold cursor-pointer text-lg" onClick={() => saveTodo(todo.id, updatedTodoInput)}>Save</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;