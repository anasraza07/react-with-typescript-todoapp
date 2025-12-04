import React, { useEffect, useReducer, useRef, useState } from 'react'
import type { Todo } from '../App.types'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

interface Props {
    todo: Todo,
    editId: string,
    editTodo: (todo: Todo) => void,
    deleteTodo: (id: string) => void,
    saveTodo: (id: string, updated: string) => void,
    updatedTodoInput: string,
    setUpdatedTodoInput: React.Dispatch<React.SetStateAction<string>>,
    toggleTodo: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, editId, editTodo, deleteTodo, saveTodo, updatedTodoInput, setUpdatedTodoInput, toggleTodo }) => {
    const editingInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (editId) editingInputRef.current?.focus();
    }, [editId])
    return (
        <li
            className="bg-gray-100 p-4 shadow-sm rounded-lg flex justify-between items-center transition hover:shadow-md"
        >
            {editId !== todo.id ? (
                <>
                    <div className='flex items-center gap-2'>
                        <button className='cursor-pointer' onClick={() => toggleTodo(todo.id)}>
                            {todo.isDone ? <MdOutlineCheckBox size={20} />
                                : <MdOutlineCheckBoxOutlineBlank size={20} />
                            }
                        </button>
                        <span className={`text-lg font-medium ${todo.isDone && "line-through"}`}>{todo.todo}</span>
                    </div>
                    <div className="space-x-2 flex items-center">
                        <button
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow active:scale-95 transition cursor-pointer"
                            onClick={() => editTodo(todo)}
                        >
                            <FaEdit />
                        </button>
                        <button
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow active:scale-95 transition cursor-pointer"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            <MdDelete />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <input ref={editingInputRef}
                        type="text"
                        value={updatedTodoInput}
                        className="flex-1 bg-white border border-gray-300 rounded-lg p-2 outline-none shadow-sm"
                        onChange={(e) => setUpdatedTodoInput(e.target.value)}
                    />
                    <button
                        className="ml-3 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow active:scale-95 transition"
                        onClick={() => saveTodo(todo.id, updatedTodoInput)}
                    >
                        Save
                    </button>
                </>
            )}
        </li>
    )
}

export default TodoItem