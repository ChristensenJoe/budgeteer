import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material"

import NewPrimaryTransactionForm from "../Forms/NewPrimaryTransactionForm";

function NewPrimaryTransactionDialog({ isOpen, setIsOpen, setCategory, category }) {

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
                        New Transaction
                    </Typography>
                </div>
            </DialogTitle>
            <NewPrimaryTransactionForm
                setIsOpen={setIsOpen}
                category={category}
                setCategory={setCategory}
            />
        </Dialog>
    )
}

export default NewPrimaryTransactionDialog;