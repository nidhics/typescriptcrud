import React, { FC, useState } from 'react'
import { Project } from './ProjectInfoTable'
import { Box, Button } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProject } from '../../../api/project-api';
import ModalProject from './addUpdateProj/ModalProject';

interface RowProject {
    data: Project[]
    delStatus: (p: boolean) => void
    // handleModalOpen: () => void
    // isModalOpen: boolean
    updateStatus: (p: boolean) => void
}

const RowProject: FC<RowProject> = ({
    data,
    delStatus,
    updateStatus,
    // isModalOpen,
    // handleModalOpen
}): JSX.Element => {


    const [openModal, setOpenModal] = useState(false)

    const [projectDataUpdate, setProjectDataUpdate] = useState<Project>()

    const columns: GridColDef[] = [
        { field: 'pid', headerName: 'PID', width: 90 },
        { field: 'name', headerName: 'Name', width: 90 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'task', headerName: 'Task Id', width: 90 },
        {
            field: 'edit', headerName: '', sortable: false,
            renderCell: (params) =>
                <Button variant="contained" color="primary"
                    onClick={() => handleEdit(params)}
                ><EditIcon />
                </Button>
        },
        {
            field: 'delete', headerName: '', sortable: false,
            renderCell: (params) => <Button variant="contained" color="error"
                onClick={() => handleDelete(params)}
            ><DeleteIcon /></Button>
        }
    ]

    const handleDelete = (param: GridCellParams) => {
        deleteProject(param.row).then((res) => {
            alert("Project is deleted.")
            if (res.status === 200) {
                delStatus(true)
            }
        }).catch((err) => console.log("error occur while deleting the project."))
    }

    const handleEdit = (param: GridCellParams) => {
        //update
        setProjectDataUpdate(param.row)
        handleOpen()
        // updateStatus && updateStatus(true)
    }

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <Box>
            <DataGrid rows={data}
                columns={columns.map((col) => ({ ...col, renderHeader: (params: GridColumnHeaderParams) => (<strong>{col.headerName}</strong>) }))} />


            {/* ====================update project modal ==================================== */}
            <ModalProject
                updateStatus={updateStatus}
                // handleOpen={open}
                isModalOpen={openModal}
                handleClose={handleClose}
                projectDataToUpdate={projectDataUpdate}
                isUpdate={true}
            />

        </Box>
    )
}

export default RowProject