import { Box, Button } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import { User } from './UserInfoTable';
import { deleteUser } from '../../../api/registration-api';

interface RowUser {
    data: User[]
    del: (p: boolean) => void
}

const RowUser: React.FC<RowUser> = ({ data, del }): JSX.Element => {
    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'User ID', width: 90 },
        { field: 'user', headerName: 'Name', width: 90 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'emailId', headerName: 'Email', width: 150 },
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

    const handleEdit = (params: GridCellParams) => {

    }

    const handleDelete = (params: GridCellParams) => {
        // console.log(params.row)
        deleteUser(params.row).then((res) => {
            alert("user is deleted.")
            del(true)
        })
    }

    return (
        <Box
        // sx={{ height: 400, width: '55%' }}
        >
            <DataGrid
                // autoPageSize
                rows={data}
                columns={columns.map((col) => ({ ...col, renderHeader: (params: GridColumnHeaderParams) => (<strong>{col.headerName}</strong>) }))}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </Box>

    )
}

export default RowUser