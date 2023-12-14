import { useContext } from "react";
import { useState } from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { TodosContext } from "../../context";
import "./AddTodo.scss";

export default function AddTodo() {
    const { addTodo } = useContext(TodosContext);
    const [text, setText] = useState('');

    const handleAddTodo = () => {
        addTodo(text);
        setText('');
    }

    return (
        <label className="add-todo">
            <input type="text" placeholder="What would you like to do? ..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' ? handleAddTodo() : null} />
            <button type="button" onClick={handleAddTodo}>
                <span><AiOutlinePlusCircle /></span>
                <span className="hover"><AiFillPlusCircle /></span>
            </button>
        </label>
    )
}