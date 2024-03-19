import { Button, Checkbox, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import styles from './addUpdateEmpForm.module.css'
import { addEmployee, updateEmployee } from '../../api/api';
import { useEffect, useState } from 'react';
import { validateForm } from './validateForm';
import dayjs from 'dayjs';
import { Employee } from '../interfaces/employee.interface';
import styled from '@emotion/styled';

interface ModalProps {
    addStatus?: (ds: boolean) => void
    updateStatus?: (ds: boolean) => void
    modalClose: () => void
    dataToUpdate?: Employee
    isUpdate?: boolean
}

interface ErrorObj {
    firstName?: string,
    lastName?: string,
    email?: string,
    dob?: string,
    address?: string,
    phone?: string,
    gender?: string
    terms?: string
}

// const RootContainer = styled('p')({
//     // backgroundColor: FormStyle.myBackground
//     backgroundColor: "lightgray"
// })

const AddUpdateEmpForm: React.FC<ModalProps> = ({ addStatus, modalClose, dataToUpdate, isUpdate, updateStatus }): JSX.Element => {

    const initialEmpData = {
        firstName: "",
        lastName: "",
        email: "",
        dob: null,
        address: "",
        phone: "",
        gender: "",
        terms: false
    }

    const [empData, setEmpData] = useState<Employee>(initialEmpData)
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialEmpData.dob);
    const [isChecked, setIsChecked] = useState<boolean>()
    // const [isFormError, setIsFormError] = useState(false)
    const [validationObj, setValidationObj] = useState<ErrorObj>()
    const [isUpdateStaus, setIsUpdateStatus] = useState(isUpdate)

    useEffect(() => {
        if (isUpdateStaus) {
            setEmpData(dataToUpdate as Employee)
            setSelectedDate(dayjs(dataToUpdate?.dob) as any)
        }
    }, [])

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        let newVal = false
        if (name === 'terms') {
            newVal = e.target.checked
            setIsChecked(newVal)
        }
        setEmpData({ ...empData, [name]: value, terms: newVal, dob: selectedDate as any })
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // console.log(Object.keys(validateForm(empData)).length)

        let validateFormError = validateForm(empData)
        console.log("Validation Object: ", validateFormError)

        if (Object.keys(validateFormError).length !== 0) {

            setValidationObj(validateFormError)
            // setIsFormError(true)

        } else {
            if (isUpdateStaus) {
                updateEmployee({ ...empData, id: dataToUpdate?.id as any }).then((res) => console.log(res.data))
                updateStatus && updateStatus(true)
                console.log('Form updating with data');
            } else {
                addEmployee(empData).then((res) => console.log(res.data))
                addStatus && addStatus(true)
                console.log('Form submitted with data');
            }
            modalClose()
        }
    }

    // const enableSubmit = () => {
    //     setIsChecked(!isChecked)
    // }

    return (
        <>
            <form
                noValidate autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>
                    <FormLabel component="legend"><strong>Add/Update Employee Details</strong></FormLabel>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            value={empData.firstName}
                            onChange={handleChange}
                            error={Boolean(validationObj?.firstName)}
                        />
                        {validationObj?.firstName && <FormHelperText>{validationObj?.firstName}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            // size="small"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={empData.lastName}
                            onChange={handleChange}
                            error={Boolean(validationObj?.lastName)}
                        />
                        {validationObj?.lastName && <FormHelperText>{validationObj?.lastName}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            // size="small"
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={empData.email}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(validationObj?.email)}
                        />
                        {validationObj?.email && <FormHelperText>{validationObj?.email}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // required
                                name="dob"
                                label="Birthday Date*"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                        {validationObj?.dob && <FormHelperText>{validationObj?.dob}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address"
                            variant="outlined"
                            value={empData.address}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(validationObj?.address)}
                        />
                        {validationObj?.address && <FormHelperText>{validationObj?.address}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            // size="small"
                            id="phone"
                            name="phone"
                            label="Phone"
                            type="phone"
                            variant="outlined"
                            value={empData.phone}
                            onChange={handleChange}
                            error={Boolean(validationObj?.phone)}
                        />
                        {validationObj?.phone && <FormHelperText>{validationObj?.phone}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row
                            //  size="small"
                            name="gender"
                            value={empData.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        {validationObj?.gender && <FormHelperText error>{validationObj?.gender}</FormHelperText>}
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            required
                            name="terms"
                            value={empData.terms}
                            control={<Checkbox
                                checked={isChecked}
                                onChange={handleChange}
                            />}
                            label="Accept the terms & conditions"
                        />
                        {validationObj?.terms && <FormHelperText className={styles.myBackground} error>
                            {validationObj?.terms}
                        </FormHelperText>}
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Grid>
            </form >
        </>
    )
}

export default AddUpdateEmpForm