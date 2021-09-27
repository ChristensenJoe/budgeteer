import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material"

import EditCategoryForm from "../Forms/EditCategoryForm";

function EditCategoryDialog({ isOpen, setIsOpen, category, setCategory }) {

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
            <EditCategoryForm
                setIsOpen={setIsOpen}
                category={category}
                setCategory={setCategory}
            />
        </Dialog>
    )
}

export default EditCategoryDialog;