import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { ModalProp } from '../../shareInterface/modalProp';
import { Project } from '../ProjectInfoTable';
import { addProject, updateProject } from '../../../../api/project-api';

const VisuallyHiddenInput = styled('input')({
    width: 1,
});

const AddUpdateProjectForm: FC<ModalProp> = ({
    handleClose,
    // isModalOpen,
    addStatus,
    projectDataToUpdate,
    isUpdate,
    updateStatus
}): JSX.Element => {

    const initialData = {
        pid: "",
        name: "",
        description: "",
        document: "",
        task: []
    }

    const [selectedTasks, setSelectedTasks] = useState([]);
    const [projectData, setProjectData] = useState<Project>(initialData)


    useEffect(() => {
        if (isUpdate) {
            setProjectData(projectDataToUpdate as Project)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProjectData({ ...projectData, [name]: value })
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(projectData)
        if (isUpdate) {

            updateProject(projectData).then((res) => {
                res.status === 200 && alert("project data updated successfully")
                updateStatus && updateStatus(true)
            }).catch((err) => console.log("error occured"))
        } else {
            addProject(projectData).then((res) => {
                alert("project new data has been submitted")
                addStatus && addStatus()
            })
        }
        handleClose()
    }

    return (
        <form onSubmit={handleSubmit}>

            <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item xs={12}>
                    <TextField
                        name="pid"
                        label="Project Id"
                        variant="outlined"
                        value={projectData.pid}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="name"
                        label="Project Name"
                        variant="outlined"
                        value={projectData.name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={projectData.description}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel >Tasks</InputLabel>
                        <Select
                            multiple
                            value={selectedTasks}
                            label="Tasks"
                            // value={projectData.task[0]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setSelectedTasks(e.target.value)}
                            input={<OutlinedInput label="Multiple Select" />}
                        >
                            {/* {rolesList.map((role, index) => <MenuItem key={index} value={role}>{role}</MenuItem>)} */}
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form >
    )
}

export default AddUpdateProjectForm