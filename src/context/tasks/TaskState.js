import { useState } from "react"
import TaskContext from "./TaskContext"

const TaskState = (props) => {
    const host = "https://itaskbook-backend-gaurav-1.onrender.com"

    const tasksInitial = []
    const [tasks, setTasks] = useState(tasksInitial)

    //Getting all tasks 
    const getTasks = async () => {
        //API call
        const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setTasks(json);
    }

    const addTask = async (title, description, tag) => {

        const response = await fetch(`${host}/api/tasks/addtask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title: title, description: description, tag: tag })
        });
        const json = await response.json();
        const task = json;
        // const newTask = {
        //     title: task.title,
        //     description: task.description,
        //     tag: task.tag
        // }

        setTasks(tasks.concat(task));
    }

    const deleteTask = async (id) => {

        //API call
        const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        console.log(response);
        const newTasks = tasks.filter((task) => { return task._id !== id });
        setTasks(newTasks);
    }

    const editTask = async (title, description, tag, id) => {
        //API call
        const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title: title, description: description, tag: tag })
        });
        const json = await response.json();
        console.log(json);

        let newTasks = JSON.parse(JSON.stringify(tasks));
        for (let index = 0; index < newTasks.length; index++) {
            let element = newTasks[index];
            if (element._id === id) {
                newTasks[index].title = title
                newTasks[index].description = description
                newTasks[index].tag = tag
                break;
            }
        }
        setTasks(newTasks);

    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, deleteTask, getTasks, editTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState
