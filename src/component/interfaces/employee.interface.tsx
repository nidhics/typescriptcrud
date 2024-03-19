export interface Employee {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    dob: Date | null,
    // dob: string,
    address: string,
    phone: string,
    gender: string
    terms: boolean
}