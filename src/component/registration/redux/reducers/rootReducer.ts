import { combineReducers } from "redux";
import { UserObj, UserState, userReducer } from "./userReducer";

export interface RootState {
    userReducer: UserState
}

const rootReducer = combineReducers({ userReducer })

export default rootReducer