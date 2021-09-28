
import {
    useDispatch,
    useSelector
} from 'react-redux'

import {
    Dialog,
    DialogTitle,
    Typography,
    Button,
    DialogActions,
    DialogContent
} from "@mui/material"

import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'

function DeleteTransactionDialog({ isOpen, setIsOpen, transaction, setCategory, setTransactions }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const categories = useSelector((state) => state.categories.entities);

    function handleSubmit() {
        fetch(`/users/${user.id}/payments/${transaction.id}`, {
            method: "DELETE"
        });

        const primary_category = categories.find((category) => category.id === transaction.primary_category);

        dispatch(categoriesUpdated({
            ...primary_category,
            balance: Number.parseFloat(primary_category.balance) - Number.parseFloat(transaction.amount)
        }));
        
        if(setCategory) {
            setCategory((category) => {
                const filteredPayments = category.payments.filter((t) => t.id !== transaction.id);
    
                if(category.id === transaction.primary_category) {
                    return {
                        ...category,
                        payments: filteredPayments,
                        balance: Number.parseFloat(category.balance) - Number.parseFloat(transaction.amount)
                    }
                }
                else {
                    return {
                        ...category,
                        payments: filteredPayments
                    }
                }
            });
        }
        if(setTransactions) {
            setTransactions((tn) => tn.filter((tn) => tn.id !== transaction.id));
        }

        setIsOpen((isOpen) => !isOpen)
    }

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
                        Delete Transaction
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent
                sx={{
                    marginTop: '20px',
                    marginBottom: '5px'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.4rem',
                        textAlign: 'center'
                    }}
                >
                    Are you sure you want to delete this transaction?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="secondary"
                    variant="outlined"
                    sx={{
                        bgcolor: 'primary.light',
                        width: '100px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: '10px'
                    }}
                >
                    <Typography
                        sx={{
                            color: 'text.primary'
                        }}
                    >
                        Delete
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteTransactionDialog;