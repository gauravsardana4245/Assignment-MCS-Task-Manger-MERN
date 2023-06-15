const host = "https://task-manager-gaurav-backend.onrender.com";
export const getTasks = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            console.log(json)
            dispatch({ type: "SET_TASKS", payload: json });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
};

export const addTask = (title, description, tag, deadline) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${host}/api/tasks/addtask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ title: title, description: description, tag: tag, deadline: deadline }),
            });
            const json = await response.json();
            const task = json.task;
            console.log(task)
            dispatch({ type: "ADD_TASK", payload: task });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
};

export const deleteTask = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`${host}/api/tasks/deletetask/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            dispatch({ type: "DELETE_TASK", payload: id });
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
};

export const editTask = (title, description, tag, deadline, id) => {
    return async (dispatch) => {
        try {
            await fetch(`${host}/api/tasks/updatetask/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ title: title, description: description, tag: tag, deadline: deadline }),
            });
            dispatch({
                type: "EDIT_TASK",
                payload: { id, title, description, deadline, tag },
            });
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };
};

export const toggleComplete = (isCompleted, id) => {
    return async (dispatch) => {
        try {
            await fetch(`${host}/api/tasks/togglecomplete/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ isCompleted }),
            });
            dispatch({
                type: "TOGGLE_COMPLETE",
                payload: { id, isCompleted },
            });
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };
};
