import { Box, Modal, Typography } from '@mui/material'
import React, { FC } from 'react'
import { styleModal } from '../../style/styleModal'
import { ModalProp } from '../../shareInterface/modalProp'
import AddUpdateProjectForm from './AddUpdateProjectForm'



const ModalProject: FC<ModalProp> = ({
    // handleOpen,
    isModalOpen,
    handleClose,
    addStatus,
    updateStatus,
    projectDataToUpdate,
    isUpdate
}): JSX.Element => {


    // console.log(projectDataToUpdate);

    return (

        <Modal
            open={isModalOpen}
            onClose={handleClose}
        >
            <Box sx={styleModal}>
                <AddUpdateProjectForm
                    isModalOpen={isModalOpen}
                    addStatus={addStatus}
                    handleClose={handleClose}
                    projectDataToUpdate={projectDataToUpdate}
                    isUpdate={isUpdate}
                    updateStatus={updateStatus}
                />
            </Box>
        </Modal>
    )
}

export default ModalProject