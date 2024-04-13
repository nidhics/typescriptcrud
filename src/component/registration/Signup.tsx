import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addNewUser, getExistingUserName } from '../../api/registration-api'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from './bcryptUtil'



const Signup: React.FC = (): JSX.Element => {

    const initialData = {
        user: "",
        password: "",
        userId: "",
        role: "Project Manager",
        emailId: ""
    }

    const rolesList = ["Project Manager", "Team Lead", "Software Enginner"]

    const navigate = useNavigate()
    const [newUserDetails, setNewUserDetails] = useState(initialData)
    const [isUserAlreadyExist, setIsUserAlreadyExist] = useState(false)
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)
    const [password, setPassword] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any): void => {
        const { name, value } = e.target
        if (name === "password") {
            setPassword(value)
        }
        //userId
        let newUserIdGen = `U${Math.floor(Math.random() * 1000000)}`
        setNewUserDetails({ ...newUserDetails, [name]: value, userId: newUserIdGen })
    }

    const checkPasswordMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        password !== value ? setIsPasswordMatch(true) : setIsPasswordMatch(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const hashedPassword = await hashPassword(newUserDetails.password)
        // console.log(hashedPassword);

        // setNewUserDetails({ ...newUserDetails, "password": hashedPassword })
        // console.log(newUserDetails);
        const newObj = { ...newUserDetails, "password": hashedPassword }
        console.log(newObj)

        await getExistingUserName(newUserDetails.user).then((res) => {
            res.data.length ?
                (
                    setIsUserAlreadyExist(true)
                ) :

                addNewUser(newObj).then((res) => {
                    alert("New user created successfully. Please Login")
                    navigate('/signin')
                })

        })

    }

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }} marginTop={2}>
                <form
                    onSubmit={handleSubmit}>
                    <Grid>
                        <FormLabel>
                            <Typography variant='h5' component='h1' >
                                Sign Up
                            </Typography>
                        </FormLabel>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="userName"
                                name="user"
                                label="User Name"
                                variant="filled"
                                margin="normal"
                                value={newUserDetails.user}
                                onChange={handleChange}
                            />
                        </Grid>
                        {isUserAlreadyExist && <FormHelperText>This User name Already Exist</FormHelperText>}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                variant="filled"
                                margin="normal"
                                value={newUserDetails.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="confirmpassword"
                                name="consfirmpassword"
                                type="password"
                                label="Confirm Password"
                                variant="filled"
                                margin="normal"
                                // value={newUserDetails.password}
                                onChange={checkPasswordMatch}
                            />
                        </Grid>
                        {isPasswordMatch && <FormHelperText>Confirm Password field is not same as Password</FormHelperText>}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="emailId"
                                name="emailId"
                                type="email"
                                label="Email Id"
                                variant="filled"
                                margin="normal"
                                value={newUserDetails.emailId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Select
                                required
                                id="role"
                                name="role"
                                label="Select Role"
                                variant="filled"
                                sx={{ marginY: 2 }}
                                value={newUserDetails.role}
                                onChange={handleChange}
                            >
                                {rolesList.map((role, index) => <MenuItem key={index} value={role}>{role}</MenuItem>)}
                            </Select>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default Signup