import { IoMdAdd } from "react-icons/io";

interface Props {
    todoInput: string,
    setTodoInput: React.Dispatch<React.SetStateAction<string>>,
    addTodo: () => void;
}

const InputField: React.FC<Props> = ({ todoInput, setTodoInput, addTodo }) => {
    return (
        <div className="flex gap-3 mb-6">
            <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg p-3 outline-none shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                placeholder="Write a new task..."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            <button
                onClick={addTodo}
                className="p-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 active:scale-95 transition"
            >
                <IoMdAdd size={24} />
            </button>
        </div>
    )
}

export default InputField