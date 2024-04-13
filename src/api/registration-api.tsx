import axios from "axios"
import { User } from "../component/registration/userInfo/UserInfoTable"

// const URL = "http://localhost:3000/userRegistration"
const URL: string = `${process.env.REACT_APP_API_PATH}/userRegistration` || ""

export const getAllUser = () => {
    return axios.get(URL)
}


export const getUser = async (username: string) => {
    const fetchURL = `${URL}?user=${username}`
    return axios.get(fetchURL)
}

export const getExistingUserName = (username: string) => {
    const fetchURL = `${URL}?user=${username}`
    return axios.get(fetchURL)
}

export const addNewUser = (data: {}) => {
    return axios.post(`${URL}`, data)
}

export const deleteUser = (data: User) => {
    const deleteAPi = `${URL}/${data.id}`
    return axios.delete(deleteAPi)
}