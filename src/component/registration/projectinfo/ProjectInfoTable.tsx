import React, { useEffect, useState } from 'react'
import { getAllProject } from '../../../api/project-api'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Signin from '../Signin'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers/rootReducer'
import RowProject from './RowProject'
import ModalProject from './addUpdateProj/ModalProject'
import { useNavigate } from 'react-router-dom'


export interface Project {
    id?: number,
    pid: string,
    name: string,
    description: string,
    document: string,
    task: string[]
}



// interface OpenModalProps {
//     handleOpen: () => void
//     handleClose: () => void
// }

const ProjectInfoTable: React.FC = (): JSX.Element => {

    const [data, setData] = useState<Project[]>([])
    const [err, setErr] = useState(false)
    const { user } = useSelector((state: RootState) => state.userReducer)
    const [isAdd, setIsAdd] = useState<boolean>()
    const [isDel, setIsDel] = useState(false)

    const [isUpdate, setIsUpdate] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchData()
        setIsAdd(false)
        setIsUpdate(false)
    }, [isDel, isAdd, isUpdate])


    const addStatus = () => { setIsAdd(true) }

    const updateStatus = (p: boolean) => { setIsUpdate(true) }


    const fetchData = () => {
        getAllProject().then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch((err) => {
            setErr(true)
        })
    }

    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const handleAdd = () => {
        handleOpen()
    }

    return (
        <Container>
            {user.user && !err ?
                <Box marginTop={2} >
                    <Grid container sx={{ display: 'flex', justifyContent: "center" }} spacing={2}>
                        <Grid item lg={4}></Grid>
                        <Grid item lg={4} sx={{ display: 'flex', justifyContent: "center" }}>
                            <Typography variant="h4" color="primary">
                                Project Info
                            </Typography>
                        </Grid>
                        <Grid item lg={4} sx={{ display: 'flex', justifyContent: "flex-end" }}>
                            <Button
                                style={{ margin: "5px" }}
                                variant="contained"
                                // onClick={handleOpen}
                                onClick={handleAdd}
                            >Add</Button>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item lg={12} sx={{ display: "flex", justifyContent: "center" }}>
                            <RowProject
                                data={data}
                                delStatus={setIsDel}
                                // isModalOpen={openModal}
                                // handleModalOpen={handleOpen}
                                updateStatus={updateStatus}
                            />
                        </Grid>
                    </Grid>

                    {/* ======================add Modal============================= */}
                    <ModalProject
                        // handleOpen={}
                        addStatus={addStatus}
                        // updateStatus={setIsUpdate}
                        isModalOpen={openModal}
                        handleClose={handleClose}
                    // isUpdate={false}
                    />
                </Box> :
                <Signin />}
        </Container>
    )
}

export default ProjectInfoTable