import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material"

import NewTransactionForm from "../Forms/NewTransactionForm";

function NewTransactionDialog({ isOpen, setIsOpen }) {

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
            <NewTransactionForm
                setIsOpen={setIsOpen}
            />
        </Dialog>
    )
}

export default NewTransactionDialog;