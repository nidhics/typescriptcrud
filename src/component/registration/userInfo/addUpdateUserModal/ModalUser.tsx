import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { styleModal } from '../../style/styleModal'
import { ModalProp } from '../../shareInterface/modalProp'

const ModalUser: React.FC<ModalProp> = ({ isModalOpen, handleClose }): JSX.Element => {
    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
        >
            <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}

export default ModalUser