import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

function Task(props) {
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const elements = JSON.parse(localStorage.getItem('Tasks'))
        const thisTask = elements.find(element => element.id === props.id)
        if (thisTask) setIsCompleted(thisTask.completed)
    }, [])

    const handleTaskCompleted = () => {
        props.setTaskCompleted(props.id, true)
        setIsCompleted(true)
    }

    const editFunction = () => { 
        props.EditFunction(props.id) 
        props.EditStatus(true)
    }

    const removeFunction = () => {props.DeleteFunction(props.id)}

    return (
        <div className={`task ${isCompleted ? "completed" : ""}`} >
            <section className="task-info">
                <h3>{props.taskName}</h3>
            </section>
            <section className="task-options">
                <span className="task-date">{props.date}</span>
                <div className="modify-task-section">
                    <FaCheckCircle 
                        className="fa-icon check-icon" 
                        onClick={handleTaskCompleted}
                        style={{
                            color: isCompleted ? "#05e505" : "",
                            cursor: isCompleted ? "not-allowed" : ""                            
                        }}                        
                    />
                    <FaEdit className="fa-icon edit-icon" onClick={editFunction}/>
                    <FaTrash className="fa-icon trash-icon" onClick={removeFunction}/>
                </div>
            </section>
        </div>
    )
}

export default Task;
