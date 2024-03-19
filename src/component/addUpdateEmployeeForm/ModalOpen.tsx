import React from 'react'
import { Box, Fade, Modal, Backdrop, Typography, Grid } from '@mui/material';
import AddUpdateEmpForm from '../addUpdateEmployeeForm/AddUpdateEmpForm';
import { Employee } from '../interfaces/employee.interface';

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height: 400,
    p: 4,
    overflow: 'auto'
};

interface ModalProps {
    addStatus?: (ds: boolean) => void
    updateStatus?: (ds: boolean) => void
    open: boolean
    handleClose: () => void
    empDataToUpdate?: Employee
    isUpdate?: boolean
}

const ModalOpen: React.FC<ModalProps> = ({ open, handleClose, addStatus, empDataToUpdate, isUpdate, updateStatus }) => {
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={styleModal}>
                        <AddUpdateEmpForm
                            addStatus={addStatus}
                            modalClose={handleClose}
                            dataToUpdate={empDataToUpdate}
                            isUpdate={isUpdate}
                            updateStatus={updateStatus}
                        />
                        {/* <AddUpdateEmpFormFormik addStatus={addStatus} modalClose={handleClose} /> */}
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalOpen