import React, { useContext } from 'react'
import TasksContext from "../context/tasks/TaskContext"

const TaskItem = (props) => {
    const { task, updateTask, mode } = props;

    const context = useContext(TasksContext);
    const { deleteTask } = context;

    return (
        <div className={`col-md-3 `}>
            <div className={`card my-3 bg-${mode === 'light' ? 'light' : 'dark'}`} >
                <div className="card-body">
                    <h5 className={`card-title `}>{task.title}</h5>
                    <p className="card-text">{task.description} </p>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteTask(task._id); props.showAlert("Task Deleted Succesfully", "success"); }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateTask(task) }}></i>
                </div>
            </div>
        </div>
    )
}

export default TaskItem
