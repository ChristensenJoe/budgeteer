import { useState } from 'react'

import {
    useHistory,
    useLocation
} from 'react-router-dom'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Typography
} from "@mui/material"

import { categoriesAdded } from '../../Redux/Slices/categoriesSlice'

function NewCategoryForm({ setIsOpen }) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)

    const [formData, setFormData] = useState({
        name: "",
        percentage: 0.0
    })
    const [errorData, setErrorData] = useState({
        name: ""
    })

    function handleChange(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }
    
    async function handleSubmit(e) {
        e.preventDefault();

        setErrorData({
            name: ""
        })

        const response = await fetch(`/users/${user.id}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            response.json()
                .then(newCategory => {
                    const routeName = newCategory.name.split(" ").join("-").toLowerCase();

                    dispatch(categoriesAdded(newCategory));
                    setIsOpen(false);
                    history.push({
                        pathname: `${location.pathname}/${routeName}`,
                        state: newCategory.id
                    })
                });
        }
        else {
            response.json()
                .then(data => {
                    data.errors.forEach((error) => {
                        setErrorData((errorData) => ({
                            ...errorData,
                            [error.split(" ")[0].toLowerCase()]: error
                        }));
                    });
                });
        }
    }

    return (
        <form>
            <DialogContent>
                <Stack
                    spacing={6}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Category Name"
                        name="name"
                        value={formData.name}
                        error={!!errorData.name}
                        helperText={errorData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Percentage of Income"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
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
                        Create
                    </Typography>
                </Button>
            </DialogActions>
        </form>
    )
}

export default NewCategoryForm;