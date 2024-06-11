import { useState, useEffect } from 'react';
import Task from './Task'

function InputComponent() {
    const [inputValue, setInputValue] = useState('')
    const [elements, setElements] = useState([]);
    const [isEditing, setIsEditing] = useState(false)
    const [taskId, setTaskId] = useState(null)

    useEffect(() => {
        const storedElements = JSON.parse(localStorage.getItem('Tasks'));
        if ( storedElements) setElements([...storedElements])
    }, []);

    const inputChange = (event) => {
      setInputValue(event.target.value)
    };

    const handleIsCompleted = (id, taskCompleted) => {
        setElements(prevElements => {
                const editedTasks = prevElements.map(task => 
                    task.id === id ? {...task, completed: taskCompleted} : task
                )
                localStorage.setItem('Tasks', JSON.stringify(editedTasks))
                return editedTasks
            }
        )
    }

    const setEditMode = (editStatus) => { setIsEditing(editStatus) }

    const editFunctionPart1 = (taskId) => {
        const task = elements.find(element => element.id === taskId)
        if (task) setInputValue(task.name);
        setTaskId(taskId)
    };
    
    const editFunctionPart2 = () => {
        setElements(prevElements => {
            const editedTasks = prevElements.map(task => 
                task.id === taskId ? {...task, name: inputValue} : task
            )
            localStorage.setItem('Tasks', JSON.stringify(editedTasks))
            return editedTasks
        }
        )
        setEditMode(false)
        setInputValue('')
    };

    const removeElement = (taskId) => {
        setElements(prevElements => {
            const tasksLeft = prevElements.filter(elem => elem.id !== taskId)
            localStorage.setItem('Tasks', JSON.stringify(tasksLeft))
            return tasksLeft
        })
    };

    const appendElement = () => {
        if (inputValue.trim()) {
            const timeId = new Date().getMilliseconds() 
            const newTask = {id: timeId, name: inputValue, date: new Date().toDateString(), completed: false};
            setElements(prevElements => {
                const tasks = prevElements ? [...prevElements, newTask] : [newTask];
                localStorage.setItem('Tasks', JSON.stringify(tasks))
                return tasks
            });
            setInputValue('');
        }
    };

    return(
        <>
            <div className="user-input">
                <input 
                    type="text" 
                    placeholder="Enter the task's name" 
                    className="task-name-input"
                    value={inputValue}
                    onChange={inputChange}
                />
                <button style={{display: !isEditing ? "inline" : "none"}} onClick={appendElement}>CREATE</button>
                <button style={{display: isEditing ? "inline" : "none"}} onClick={editFunctionPart2}>SAVE</button>
            </div>
            <div className="task-list">
                {elements !== null && elements.map((element, index) => (
                    <Task 
                        key={index} 
                        id={element.id} 
                        taskName={element.name} 
                        date={element.date}
                        DeleteFunction={removeElement} 
                        EditFunction={editFunctionPart1}
                        EditStatus={setEditMode}
                        setTaskCompleted={handleIsCompleted}
                    /> 
                ))}
            </div>
        </>
    )
}

export default InputComponent