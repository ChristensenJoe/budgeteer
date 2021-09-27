import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material"

import NewCategoryForm from "../Forms/NewCategoryForm";

function NewCategoryDialog({ isOpen, setIsOpen }) {

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
                        New Category
                    </Typography>
                </div>
            </DialogTitle>
            <NewCategoryForm
                setIsOpen={setIsOpen}
            />
        </Dialog>
    )
}

export default NewCategoryDialog;