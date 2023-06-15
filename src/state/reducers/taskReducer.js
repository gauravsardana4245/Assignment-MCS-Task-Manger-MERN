const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TASKS":
            return { ...state, tasks: action.payload };
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload),
            };
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task._id === action.payload.id) {
                        return {
                            ...task,
                            title: action.payload.title,
                            description: action.payload.description,
                            tag: action.payload.tag,
                            deadline: action.payload.deadline,
                        };
                    }
                    return task;
                }),
            };
        case "TOGGLE_COMPLETE":
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            isCompleted: action.payload.isCompleted,
                        };
                    }
                    return task;
                }),
            };
        default:
            return state;
    }
};

export default taskReducer;
