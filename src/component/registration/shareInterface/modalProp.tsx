import { Project } from "../projectinfo/ProjectInfoTable"

export interface ModalProp {
    // handleOpen: () => void
    isModalOpen: boolean
    handleClose: () => void
    addStatus?: () => void
    updateStatus?: (ds: boolean) => void
    projectDataToUpdate?: Project
    isUpdate?: boolean
}