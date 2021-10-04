import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material"

import AllocateCategoryPercentageForm from "../Forms/AllocateCategoryPercentageForm"

function AllocateCategoryPercentageDialog({ isOpen, setIsOpen }) {

    return (
        <Dialog
            open={isOpen}
            onClose={() => { setIsOpen(false) }}
            fullWidth={true}
        >
            <DialogTitle>
                <div>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'medium',
                            textAlign: 'center'
                        }}
                    >
                        Edit Category
                    </Typography>
                </div>
            </DialogTitle>
            <AllocateCategoryPercentageForm 
                setIsOpen={setIsOpen}
            />
        </Dialog>
    )
}

export default AllocateCategoryPercentageDialog