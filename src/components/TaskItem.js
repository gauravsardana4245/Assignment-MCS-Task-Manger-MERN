import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';

const TaskItem = (props) => {
    const calculateDaysRemaining = (deadline, currentDate) => {
        if (deadline === null) {
            return null;
        }

        // Convert deadline and current date to their respective UTC values
        const deadlineUTC = Date.UTC(
            deadline.getFullYear(),
            deadline.getMonth(),
            deadline.getDate()
        );
        const currentDateUTC = Date.UTC(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );

        // Calculate the difference in days
        const daysDifference = Math.floor(
            (deadlineUTC - currentDateUTC) / (1000 * 60 * 60 * 24)
        );

        return daysDifference;
    }

    const dispatch = useDispatch();
    const { deleteTask, toggleComplete } = bindActionCreators(actionCreators, dispatch)
    const { task, updateTask, mode } = props;
    const deadline = new Date(task.deadline);
    const current_date = new Date();
    const daysRemaining = calculateDaysRemaining(deadline, current_date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = deadline.toLocaleDateString('en-US', options);
    const [isCompleted, setIsCompleted] = useState(task.isCompleted)

    const handleChange = () => {
        // setIsCompleted(isCompleted === false ? true : false)
        if (isCompleted === true) {
            toggleComplete(false, task._id)
            window.location.reload();
        }
        else {
            toggleComplete(true, task._id);
            window.location.reload();
        }
    }
    useEffect(() => {
        setIsCompleted(task.isCompleted)
    }, [task.isCompleted])

    return (
        <div>
            <div className={`card d-flex justify-content-center p-3 my-3 bg-${mode === 'light' ? 'light' : 'dark'} border-${isCompleted === true ? 'success' : 'dark'}`} >
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className={`card-title `}>Title: {task.title}</h5>
                        <p className="card-text">{task.description} </p>
                        {task.deadline != null && <div> <p>Deadline: {dateString}</p>
                            {daysRemaining > 0 ? <span> Days Remaining: <span className='text-success'> {daysRemaining} </span></span>
                                : <span>Deadline expired: <span className='text-danger'>{daysRemaining * -1} days ago</span></span>}
                        </div>
                        }
                    </div>
                    <div>
                        <div>
                            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteTask(task._id); props.showAlert("Task Deleted Succesfully", "success"); }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateTask(task) }}></i>
                        </div>
                        <div>
                            <Checkbox
                                className={`text-${mode === 'dark' ? 'light' : 'dark'}`}
                                checked={isCompleted}
                                onChange={handleChange}
                                color="success"
                            />

                            <div>
                                status: {isCompleted ? <span className='text-success'>Completed!</span> : <span>Not Completed</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskItem
