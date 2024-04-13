import { UserObj } from "../reducers/userReducer"
import { GET_USER_INFO } from "./constant"



// export const getUserInfo = (data: string) => {
export const getUserInfo = (data: UserObj) => {
    return {
        type: GET_USER_INFO,
        payload: data
    }
}