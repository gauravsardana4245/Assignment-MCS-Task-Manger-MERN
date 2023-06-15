import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddTask from './AddTask';
import TaskItem from './TaskItem';
import { useNavigate } from "react-router-dom"
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

const Tasks = (props) => {
    const dispatch = useDispatch();
    const { getTasks, editTask } = bindActionCreators(actionCreators, dispatch)
    const { showAlert, mode, setName } = props;
    let navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const tasks_from_redux = useSelector(state => state.task.tasks)

    useEffect(() => {
        if (tasks_from_redux.length > 0) {
            setTasks(tasks_from_redux);
        }
    }, [tasks_from_redux])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getTasks();
            async function fetchdata() {
                const response = await fetch("https://todolist-backend-znhc.onrender.com/api/auth/getuser", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")

                    },
                });
                const json = await response.json();
                console.log(json.name);
                setName(json.name);
            }
            fetchdata();
            setName(props.name);
        }
        else {
            navigate("/login");
        }
    }, [])

    const [task, setTask] = useState({ id: "", etitle: "", edescription: "", etag: "", edeadline: "" })

    const ref = useRef(null);
    const ref2 = useRef(null);
    const updateTask = (currentTask) => {
        ref.current.click();
        setTask({ id: currentTask._id, etitle: currentTask.title, edescription: currentTask.description, etag: currentTask.tag })
    }

    const changeHandler = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })

    }

    const submitHandler = (e) => {
        console.log("Updating the task...", task)
        editTask(task.etitle, task.edescription, task.etag, task.edeadline, task.id)
        // e.preventDefault();
        showAlert(" Task Updated Succesfully", "success");
        ref2.current.click();

    }
    return (
        <div className='container tasks-page'>
            <AddTask mode={mode} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className={`modal-content bg-${mode === 'light' ? 'light' : 'dark'}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span style={{ color: `${mode === 'light' ? "black" : 'white'}` }} aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} className="form-control" id="etitle" aria-describedby="emailHelp" name="etitle" onChange={changeHandler} value={task.etitle} />
                                </div>
                                {task.etitle.length > 0 && task.etitle.length < 3 &&
                                    <div className='inputValidate'>
                                        <span>(Title should be atleast 3 characters long)</span>
                                    </div>
                                }
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} value={task.edescription} className="form-control" id="edescription" name="edescription" onChange={changeHandler} />
                                </div>
                                {task.edescription.length > 0 && task.edescription.length < 5 &&
                                    <div className='inputValidate'>
                                        <span>(description should be atleast 5 characters long)</span>
                                    </div>
                                }
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag (Optional)</label>
                                    <input type="text" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} value={task.etag} className="form-control" id="etag" name="etag" onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edeadline" className="form-label">Deadline</label>
                                    <input onBlur={changeHandler} type="date" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} className="form-control" id="edeadline" name="edeadline" value={task.edeadline} onChange={changeHandler} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" ref={ref2} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={task.edescription.length < 5 || task.etitle.length < 3} onClick={submitHandler} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5  container tasks-container'>
                <h2 className='text-center'>Your Tasks</h2>
                {tasks.length === 0 ? <div className='container'> No tasks to display</div>
                    :
                    tasks.map((currenttask) => {
                        return <TaskItem key={Math.random()} updateTask={updateTask} task={currenttask} showAlert={showAlert} mode={mode} />

                    })
                }

            </div>
        </div>
    )
}

export default Tasks
