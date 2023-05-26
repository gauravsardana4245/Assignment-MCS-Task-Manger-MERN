import React, { useContext } from 'react'
import { useState } from 'react';
import tasksContext from "../context/tasks/TaskContext"

const AddTask = (props) => {
    const context = useContext(tasksContext);
    const { mode } = props;
    const { addTask } = context;

    const [task, setTask] = useState({ title: "", description: "", tag: "" })

    const changeHandler = (e) => {

        setTask({ ...task, [e.target.name]: e.target.value })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        addTask(task.title, task.description, task.tag);

        setTask({ title: "", description: "", tag: "" });

    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Todo</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title <span className={`mandatory-mark-${mode}`}>*</span></label>
                        <input required type="text" style={{
                            backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                            color: `${mode === 'light' ? "black" : 'white'}`
                        }} className="form-control" id="title" value={task.title} aria-describedby="emailHelp" name="title" onChange={changeHandler} />

                    </div>
                    {task.title.length > 0 && task.title.length < 3 &&
                        <div className='inputValidate'>
                            <span>(Title should be atleast 3 characters long)</span>
                        </div>
                    }
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description <span className={`mandatory-mark-${mode}`}>*</span></label>
                        <input required type="text" style={{
                            backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                            color: `${mode === 'light' ? "black" : 'white'}`
                        }} className="form-control" id="description" value={task.description} name="description" onChange={changeHandler} />
                    </div>
                    {
                        task.description.length > 0 && task.description.length < 5 &&
                        <div className='inputValidate'>
                            <span>(description should be atleast 5 characters long)</span>
                        </div>
                    }
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag (Optional)</label>
                        <input type="text" style={{
                            backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                            color: `${mode === 'light' ? "black" : 'white'}`
                        }} className="form-control" id="tag" name="tag" value={task.tag} onChange={changeHandler} />
                    </div>

                    <button disabled={task.description.length < 5 || task.title.length < 3} type="submit" className="btn btn-primary" onClick={submitHandler}>Add Todo</button>
                </form >
            </div >

        </div >
    )
}

export default AddTask
