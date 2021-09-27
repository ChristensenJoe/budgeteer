import {
    Dialog,
    DialogTitle,
    Typography,
    Button,
    DialogActions,
    DialogContent
} from "@mui/material"

function DeleteCategoryDialog({ isOpen, setIsOpen, category }) {

    function handleSubmit() {
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
                        Delete Category
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
                    Are you sure you want to delete this category?
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

export default DeleteCategoryDialog;