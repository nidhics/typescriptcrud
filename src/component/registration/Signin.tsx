import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { getUser } from '../../api/registration-api'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from './redux/actions/actions'

interface User {
    username: string
}

const Signin: React.FC = (): JSX.Element => {
    const initialData = {
        user: "",
        password: ""
    }
    const [loginDetail, setLoginDetail] = useState(initialData)
    const [isInValidUser, setIsInValidUser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginDetail({ ...loginDetail, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await getUser(loginDetail.user).then(async (res) => {
            if (res.data.length === 0) {
                setIsInValidUser(true)
                // console.log("Fail to login")
            } else {

                console.log(res.data[0])
                const dcryptPass = await bcrypt.compare(loginDetail.password, res.data[0].password)
                if (dcryptPass) {
                    console.log("Login Successful")
                    //authToken
                    // const hashedPassword = bcrypt.hash(loginDetail.user, 10)
                    // hashedPassword.then((res) => localStorage.setItem("token", res))
                    dispatch(getUserInfo(res.data[0]))
                    navigate('/')
                } else {
                    setIsInValidUser(true)
                }
            }
        })
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }} marginTop={2}>
                <form
                    onSubmit={handleSubmit}>
                    <Grid>
                        <FormLabel><strong>Signin</strong></FormLabel>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="userName"
                                name="user"
                                label="User Name"
                                variant="outlined"
                                margin="normal"
                                value={loginDetail.user}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                value={loginDetail.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        {isInValidUser && <FormHelperText color="error">Invalid User. Please Sign Up</FormHelperText>}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Sign In
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={handleSignUp}>Sign Up </Button>
                    </Grid>
                </form>
            </Box>

        </Container>
    )
}

export default Signin