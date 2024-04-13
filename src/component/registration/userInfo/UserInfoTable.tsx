import { Box, Button, Container, Grid, Typography } from '@mui/material'
import RowUser from './RowUser'
import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../../api/registration-api'
import ModalUser from './addUpdateUserModal/ModalUser'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import Signin from '../Signin'

export interface User {
    user: string,
    userId: string,
    role: string,
    emailId: string,
    id?: number
}

const UserInfoTable: React.FC = (): JSX.Element => {

    const [data, setData] = useState<User[]>([])
    const [open, setOpen] = useState(false)
    const [del, setIsDel] = useState(false)
    const [err, setErr] = useState(false)
    const select = useSelector((state: RootState) => state.userReducer)

    useEffect(() => {
        fetchData()
    }, [del])

    const fetchData = () => {
        getAllUser().then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch((err) => {
            setErr(true)
        })
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Container>
            {select.user.user ?
                (<Box marginTop={2} >
                    <Grid container sx={{ display: 'flex', justifyContent: "center" }} spacing={2}>
                        <Grid item lg={4}></Grid>
                        <Grid item lg={4} sx={{ display: 'flex', justifyContent: "center" }}>
                            <Typography variant="h4" color="primary">
                                User Info
                            </Typography>
                        </Grid>
                        <Grid item lg={4} sx={{ display: 'flex', justifyContent: "flex-end" }}>
                            <Button
                                style={{ margin: "5px" }}
                                variant="contained"
                                onClick={handleOpen}
                            >Add</Button>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item lg={12} sx={{ display: "flex", justifyContent: "center" }}>
                            <RowUser data={data} del={setIsDel} />
                        </Grid>
                    </Grid>
                    <ModalUser
                        isModalOpen={open}
                        handleClose={handleClose}
                    />

                </Box>) : (<Signin />)}
        </Container >
    )
}

export default UserInfoTable