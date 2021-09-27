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
    Typography,
    InputAdornment,
    Autocomplete
} from "@mui/material"

import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'


function NewPrimaryTransactionForm({ setIsOpen, category, setCategory }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const categories = useSelector((state) => state.categories.entities);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: "",
        categories: [],
        primary_category: category.name
    })

    console.log(formData)
    const [errorData, setErrorData] = useState({
        name: "",
        description: "",
        amount: ""
    })

    const filteredCategories = categories.filter(cat => cat.id !== category.id);

    function handleChange(e, newValue) {
        let value;
        let name;
        newValue ? value = newValue : value = e.target.value
        newValue ? name = "categories" : name = e.target.name
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))
    }
    console.log(categories);
    async function handleSubmit(e) {
        e.preventDefault();

        setErrorData({
            name: "",
            description: "",
            amount: ""
        })

        const response = await fetch(`/users/${user.id}/payments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            response.json()
                .then(newTransaction => {
                    setCategory((category) => {
                        const newCategory = {
                            ...category,
                            balance: Number.parseFloat(category.balance) + Number.parseFloat(formData.amount),
                            payments: [
                                ...category.payments,
                                newTransaction
                            ]
                        }
                        dispatch(categoriesUpdated(newCategory))
                        return newCategory;
                    })
                    setIsOpen((isOpen) => !isOpen)
                })
        }
        else {
            response.json()
                .then(data => {
                    data.errors.forEach((error) => {
                        let errorName = error.split(" ")[0].toLowerCase() ;
                        
                        setErrorData(errorData => ({
                            ...errorData,
                            [errorName]: error
                        }))
                    })
                })
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
                    <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                        spacing={6}
                    >
                        <TextField
                            sx={{
                                width: '55%'
                            }}
                            label="Transaction Name"
                            name="name"
                            error={!!errorData.name}
                            helperText={errorData.name}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{
                                width: '30%'
                            }}
                            label="Amount"
                            name="amount"
                            error={!!errorData.amount}
                            helperText={errorData.amount}
                            value={formData.amount}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                        />
                    </Stack>
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Description"
                        name="description"
                        error={!!errorData.description}
                        helperText={errorData.description}
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <Autocomplete
                        multiple
                        name="categories"
                        onChange={handleChange}
                        options={filteredCategories.map((cat) => cat.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Secondary Categories"
                            />
                        )}
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
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

export default NewPrimaryTransactionForm;