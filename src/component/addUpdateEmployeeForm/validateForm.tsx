import { Employee } from "../interfaces/employee.interface"

interface EmpDataErr {
    firstName?: string,
    lastName?: string,
    email?: string,
    dob?: string,
    address?: string,
    phone?: string,
    gender?: string,
    terms?: string
}

export const validateForm = (empFilledData: Employee): EmpDataErr => {

    const empDataError = {}
    console.log(empFilledData)
    if (empFilledData.firstName === "") {
        return { ...empDataError, ["firstName"]: "First Name is required" }
    } else if (empFilledData.lastName === "") {
        return { ...empDataError, ["lastName"]: "Last Name is required" }
    } else if (empFilledData.email === "") {
        return { ...empDataError, ["email"]: "email is required" }
    } else if (empFilledData.dob === new Date()) {
        return { ...empDataError, ["dob"]: "date of birth is required" }
    } else if (empFilledData.address === "") {
        return { ...empDataError, ["address"]: "Address is required" }
    } else if (empFilledData.phone === "") {
        return { ...empDataError, ["phone"]: "Phone is required" }
    } else if (empFilledData.gender === "") {
        return { ...empDataError, ["gender"]: "Gender is required" }
    } else if (empFilledData.terms === false) {
        return { ...empDataError, ["terms"]: "terms need to be accepted" }
    }
    return empDataError
}