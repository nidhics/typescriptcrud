import { GET_USER_INFO } from "../actions/constant"


export interface UserObj {
    user: string,
    password: string,
    userId: string,
    role: string,
    emailId: string
}

export interface UserState {
    user: UserObj
}

const initialState: UserState = {
    user: {
        user: "",
        password: "",
        userId: "",
        role: "",
        emailId: ""
    }
}

interface ActionObj {
    type: string,
    payload: UserObj
}

export const userReducer = (state = initialState, action: ActionObj) => {
    switch (action.type) {
        case GET_USER_INFO:

            console.log(action.payload);

            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}