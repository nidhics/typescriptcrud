import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { addEmployee } from '../../api/api';

interface ModalProps {
    addStatus: (ds: boolean) => void
    modalClose: () => void
}

interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
    dob: string,
    address: string,
    phone: string,
    gender: string
}

const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    address: "",
    phone: "",
    gender: ""
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: Yup.date().nullable().required('Date of Birth is required'),
    address: Yup.string().required('address is required'),
    phone: Yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number').required('Phone number is required').required('phone is required'),
    gender: Yup.string().required('Gender is required'),
});

const AddUpdateEmpFormFormik: React.FC<ModalProps> = ({ addStatus, modalClose }): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleSubmit = (values: FormValues) => {
        addEmployee(values).then((res) => console.log(res.data))
        addStatus(true)
    };

    return (
        <div>
            <h5>Add/Update Employee Details</h5>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="First Name"
                                    name="firstName"
                                    fullWidth
                                />
                                <ErrorMessage name="firstName" component="div" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="Last Name"
                                    name="lastName"
                                    fullWidth
                                />
                                <ErrorMessage name="lastName" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    fullWidth
                                />
                                <ErrorMessage name="email" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Field
                                        as={DatePicker}
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        fullWidth
                                        format="DD/MM/YYYY"
                                        inputVariant="outlined"
                                        onChange={
                                            (date: Date | null) => {
                                                setSelectedDate(date);
                                            }
                                        }
                                    />
                                </LocalizationProvider>
                                <ErrorMessage name="dateOfBirth" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="Address"
                                    name="address"
                                    fullWidth
                                />
                                <ErrorMessage name="address" component="div" />
                            </Grid>

                            <Grid item xs={8}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="Phone Number"
                                    name="phone"
                                    fullWidth
                                />
                                <ErrorMessage name="phone" component="div" />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <Field as={RadioGroup} name="gender" row>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </Field>
                                </FormControl>
                                <ErrorMessage name="gender" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Field as={Checkbox} name="agree" />}
                                    label="I agree to the terms and conditions"
                                />
                                <ErrorMessage name="agree" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUpdateEmpFormFormik