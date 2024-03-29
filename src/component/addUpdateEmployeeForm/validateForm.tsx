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

// export const validateForm = (empFilledData: Employee): EmpDataErr => {
//     const empDataError = {}
//     console.log(empFilledData)
//     if (empFilledData.firstName === "") {
//         return { ...empDataError, ["firstName"]: "First Name is required" }
//     } else if (empFilledData.lastName === "") {
//         return { ...empDataError, ["lastName"]: "Last Name is required" }
//     } else if (empFilledData.email === "") {
//         return { ...empDataError, ["email"]: "Email is required" }
//     } else if (empFilledData.dob === new Date()) {
//         return { ...empDataError, ["dob"]: "Date of birth is required" }
//     } else if (empFilledData.address === "") {
//         return { ...empDataError, ["address"]: "Address is required" }
//     } else if (empFilledData.phone === "") {
//         return { ...empDataError, ["phone"]: "Phone number is required" }
//     } else if (empFilledData.gender === "") {
//         return { ...empDataError, ["gender"]: "Gender is required" }
//     } else if (empFilledData.terms === false) {
//         return { ...empDataError, ["terms"]: "Terms needs to be accepted" }
//     }
//     return empDataError
// }

export const validateForm = (empFilledData: any): EmpDataErr => {
    let empDataError = {}
    let validateObj = [
        {
            name: "firstName",
            equals: ""
        },
        {
            name: "lastName",
            equals: ""
        },
        {
            name: "email",
            equals: ""
        },
        {
            name: "dob",
            equals: null
        },
        {
            name: "address",
            equals: ""
        },
        {
            name: "phone",
            equals: ""
        },
        {
            name: "gender",
            equals: ""
        },
        {
            name: "terms",
            equals: false
        }
    ]

    validateObj.map(each => {

        if (empFilledData[each.name] === each.equals) {
            empDataError = {
                ...empDataError,
                [each.name]: "required"
            }
        }
    })
    console.log(empDataError)
    return empDataError
}