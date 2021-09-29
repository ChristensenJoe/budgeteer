import { useState } from 'react'

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
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material"

import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'
import { transactionsAdded } from '../../Redux/Slices/transactionsSlice'
import { recentTransactionsAdded, recentTransactionsRemoved } from '../../Redux/Slices/recentTransactionsSlice'
import { userSet } from '../../Redux/Slices/userSlice'


function NewTransactionForm({ setIsOpen }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const categories = useSelector((state) => state.categories.entities);
    const recentTransactions = useSelector((state) => state.recentTransactions.entities);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: "",
        categories: [],
        primary_category: categories[0].name
    })

    const [errorData, setErrorData] = useState({
        name: "",
        description: "",
        amount: ""
    })


    const [secondaryCategories, setSecondaryCategories] = useState(categories.filter((category) => category.name !== formData.primary_category).map((category) => category.name))

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

    function handleCategoryChange(e) {
        setFormData((formData) => ({ 
            ...formData,
            primary_category: e.target.value,
            categories: formData.categories.filter((category) => category !== e.target.value)
        }));
        setSecondaryCategories(categories.filter((category) => category.name !== e.target.value).map((category) => category.name))
    }

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
                const primary_category = categories.find((category) => category.id === newTransaction.primary_category)

                dispatch(categoriesUpdated({
                    ...primary_category,
                    balance: Number.parseFloat(primary_category.balance) + Number.parseFloat(newTransaction.amount)
                }))

                dispatch(recentTransactionsRemoved(recentTransactions[recentTransactions.length - 1]))
                const recentTransactionsCategory = categories.find((category) => category.id === newTransaction.primary_category);
                dispatch(recentTransactionsAdded({
                    ...newTransaction,
                    primary_category: recentTransactionsCategory.name
                }))

                dispatch(transactionsAdded(newTransaction))

                dispatch(userSet({
                    ...user,
                    total_balance: Number.parseFloat(user.total_balance) + Number.parseFloat(newTransaction.amount)
                }))
                
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

                    <FormControl
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                    >
                        <InputLabel id="primary_category">Primary Category</InputLabel>
                        <Select
                            name="primary_category"
                            labelId="primary-category"
                            value={formData.primary_category}
                            label="Primary Category"
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Autocomplete
                        multiple
                        value={formData.categories}
                        name="categories"
                        onChange={handleChange}
                        options={secondaryCategories}
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

export default NewTransactionForm;