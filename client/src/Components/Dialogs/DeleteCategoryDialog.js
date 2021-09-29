import {
    useState
} from 'react'

import {
    useHistory
} from 'react-router-dom'

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
    DialogContent,
    Alert,
    AlertTitle
} from "@mui/material"

import { categoriesRemoved } from '../../Redux/Slices/categoriesSlice'

function DeleteCategoryDialog({ isOpen, setIsOpen, category }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const categories = useSelector((state) => state.categories.entities);

    const [isAlert, setIsAlert] = useState(false);

    function handleSubmit() {
        if (categories.length > 1) {
            fetch(`/users/${user.id}/categories/${category.id}`, {
                method: "DELETE"
            });

            dispatch(categoriesRemoved(category));
            setIsAlert(false);
            history.push(`/${user.username.split(" ").join("")}`)
            setIsOpen((isOpen) => !isOpen);
        }
        else {
            setIsAlert(true);
        }
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
                {isAlert &&
                    <Alert
                        severity="error"
                        sx={{
                            marginTop: '20px'
                        }}
                    >
                        <AlertTitle>Error</AlertTitle>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                textAlign: 'center'
                            }}
                        >
                            You must have at least one category.
                        </Typography>
                    </Alert>
                }
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