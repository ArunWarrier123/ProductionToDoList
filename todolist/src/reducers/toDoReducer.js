export const ToDoReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return { tasks: action.payload,
            ...state.tasks };

        case "DELETE_TASK":
            return { tasks: action.payload };

        default:
            return state
    }

}