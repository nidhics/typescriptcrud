import React, { useEffect, useState } from 'react'
import RowsEmp from './RowsEmp';
import { Box, Button, Typography, Grid } from '@mui/material';
import { getAllEmployees } from '../../api/api';
import ModalOpen from '../addUpdateEmployeeForm/ModalOpen';
import { Employee } from '../interfaces/employee.interface';

const AllEmpDetails: React.FC = () => {
    const [empData, setEmpData] = useState<Employee[]>([])
    const [isDelete, setIsDelete] = useState<boolean>()
    const [isAdd, setIsAdd] = useState<boolean>()
    const [isUpdate, setIsUpdate] = useState<boolean>()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchData()
        setIsDelete(false)
        setIsAdd(false)
        setIsUpdate(false)
    }, [isDelete, isAdd, isUpdate])

    const fetchData = () => {
        getAllEmployees().then((res) => setEmpData(res.data))
    }

    const deleteStatus = (isDelS: boolean) => {
        setIsDelete(isDelS)
    }

    const addStatus = (isAddS: boolean) => {
        setIsAdd(isAddS)
    }

    const updateStatus = (isUpdateS: boolean) => {
        setIsUpdate(isUpdateS)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                        <Typography variant="h4" color="primary" style={{ margin: "5px" }}>
                            Employees
                        </Typography>
                    </Grid>
                    <Grid item xs={4} lg={4}></Grid>
                    <Grid item xs={4} lg={4}>
                        <Button
                            // className={EmpStyle.mybutton}
                            style={{ margin: "5px" }}
                            variant="contained"
                            onClick={handleOpen}
                        >Add </Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={12}>
                        <RowsEmp data={empData} delStatus={deleteStatus} updateStatus={updateStatus} />
                    </Grid>
                </Grid>
                <ModalOpen
                    addStatus={addStatus}
                    open={open}
                    handleClose={handleClose} />
            </Box>
        </>
    )
}

export default AllEmpDetails