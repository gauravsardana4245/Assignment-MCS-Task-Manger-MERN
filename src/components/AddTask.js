import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';


const AddTask = (props) => {
    const dispatch = useDispatch();
    const { addTask } = bindActionCreators(actionCreators, dispatch)
    const { mode } = props;

    const [task, setTask] = useState({ title: "", description: "", tag: "", deadline: "" })

    const changeHandler = (e) => {

        setTask({ ...task, [e.target.name]: e.target.value });


    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(task)
        addTask(task.title, task.description, task.tag, task.deadline); // Pass the formatted deadline
        setTask({ title: "", description: "", tag: "", deadline: "" });


    }
    return (
        <div>
            <div className="container rounded-4 my-3 border border-dark p-12">
                <h2 className='text-center'>Add a Task</h2>
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
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Deadline</label>
                        <input onBlur={changeHandler} type="date" style={{
                            backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                            color: `${mode === 'light' ? "black" : 'white'}`
                        }} className="form-control" id="deadline" name="deadline" value={task.deadline} onChange={changeHandler} />
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button disabled={task.description.length < 5 || task.title.length < 3} type="submit" className="btn btn-dark" onClick={submitHandler}>Add Task</button>
                    </div>
                </form >
            </div >

        </div >
    )
}

export default AddTask
