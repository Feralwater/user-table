import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import usersReducer from "./usersReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    users: usersReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))