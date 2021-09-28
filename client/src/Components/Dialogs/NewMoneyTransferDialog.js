import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material"

import NewMoneyTransferForm from "../Forms/NewMoneyTransferForm";

function NewMoneyTransferDialog({ isOpen, setIsOpen}) {

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
                        Money Transfer
                    </Typography>
                </div>
            </DialogTitle>
            <NewMoneyTransferForm
                setIsOpen={setIsOpen}
            />
        </Dialog>
    )
}

export default NewMoneyTransferDialog;