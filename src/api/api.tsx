import axios from "axios"
import { Employee } from "../component/interfaces/employee.interface"

const URL = " http://localhost:3000/employees"

export const getAllEmployees = () => {
    return axios.get(URL)
}

export const deleteEmployee = (id: number) => {
    return axios.delete(`${URL}/${id}`)
}

export const addEmployee = (data: {}) => {
    return axios.post(`${URL}`, data)
}

export const updateEmployee = (data: Employee) => {
    return axios.put(`${URL}/${data.id}`, data)
}