// const URL = "localhost:3000/projects"

import axios from "axios"
import { Project } from "../component/registration/projectinfo/ProjectInfoTable"

const URL: string = `${process.env.REACT_APP_API_PATH}/Projects`

export const getAllProject = () => {
    return axios.get(URL)
}

export const deleteProject = (data: Project) => {
    return axios.delete(`${URL}/${data.id}`)
}

export const updateProject = (data: Project) => {
    return axios.put(`${URL}/${data.id}`, data)
}

export const addProject = (data: Project) => {
    return axios.post(`${URL}`, data)
}
