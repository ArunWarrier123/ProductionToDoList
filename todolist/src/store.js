import { createStore , combineReducers ,  applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { ToDoReducer } from "./reducers/toDoReducer";

const reducer = combineReducers({
    //contains all reducers
    //this is responsible for changing states
    Taskred : ToDoReducer
})

const initialState = {}

const middleware = [thunk]

export const store = createStore(
    reducer , 
    initialState ,
    composeWithDevTools(applyMiddleware(...middleware))
)
