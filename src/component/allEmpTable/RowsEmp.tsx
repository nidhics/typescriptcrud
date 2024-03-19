import React, { useState } from 'react'
import { DataGrid, GridColDef, GridCellParams, GridColumnHeaderParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { deleteEmployee } from '../../api/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalOpen from '../addUpdateEmployeeForm/ModalOpen';
import { Employee } from '../interfaces/employee.interface';

interface RowEmpProps {
    data: Employee[],
    delStatus: (ds: boolean) => void
    updateStatus?: (us: boolean) => void
}

const RowsEmp: React.FC<RowEmpProps> = ({ data, delStatus, updateStatus }): JSX.Element => {

    const [open, setOpen] = React.useState(false);
    const [dataEmpToUpdate, setDataEmpToUpdate] = useState<Employee>()


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'firstName', headerName: 'First Name', width: 90 },
        { field: 'lastName', headerName: 'Last name', width: 90 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'dob', headerName: 'Birthday', width: 120 },
        { field: 'address', headerName: 'Address', width: 100 },
        { field: 'phone', headerName: 'Phone', width: 100 },
        { field: 'gender', headerName: 'Gender', width: 90 },
        {
            field: 'edit', headerName: '', sortable: false,
            renderCell: (params) => <Button variant="contained" color="primary"
                onClick={() => handleEdit(params)}
            ><EditIcon /></Button>
        },
        {
            field: 'delete', headerName: '', sortable: false,
            renderCell: (params) => <Button variant="contained" color="error"
                onClick={() => handleDelete(params)}
            ><DeleteIcon /></Button>
        }
    ];

    const handleDelete = (params: GridCellParams) => {
        console.log(params.row)
        deleteEmployee(params.row.id)
        delStatus(true)
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEdit = (params: GridCellParams) => {
        // console.log(params.row)
        handleOpen()
        setDataEmpToUpdate(params.row)
        updateStatus && updateStatus(true)
    }

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns.map((col) => ({ ...col, renderHeader: (params: GridColumnHeaderParams) => (<strong>{col.headerName}</strong>) }))}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
            <ModalOpen
                updateStatus={updateStatus}
                open={open}
                handleClose={handleClose}
                empDataToUpdate={dataEmpToUpdate}
                isUpdate={true}
            />
        </>
    )
}

export default RowsEmp