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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    FormHelperText
} from "@mui/material"

import SwapVertIcon from '@mui/icons-material/SwapVert';

import { userSet } from '../../Redux/Slices/userSlice'
import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'


function NewMoneyTransferForm({ setIsOpen }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const cat = useSelector((state) => state.categories.entities);
    const categories = [
        ...cat,
        {
            name: 'Unallocated Balance',
            id: "unallocated_balance"
        }
    ]
    const [formData, setFormData] = useState({
        name: "Money Transfer",
        amount: "",
        primary_category: categories[0].name,
        secondary_category: ""
    })

    const [errorData, setErrorData] = useState({
        amount: "",
        secondary_category: ""
    })

    const [primaryCategories, setPrimaryCategories] = useState(categories)

    const [secondaryCategories, setSecondaryCategories] = useState(categories.filter((category) => category.name !== formData.primary_category))

    function handleChange(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    function handlePrimaryCategoryChange(e) {
        setFormData((formData) => ({
            ...formData,
            primary_category: e.target.value
        }));

        setSecondaryCategories(categories.filter((category) => category.name !== e.target.value))
    }

    function handleSecondaryCategoryChange(e) {
        setFormData((formData) => ({
            ...formData,
            secondary_category: e.target.value
        }));

        setPrimaryCategories(categories.filter((category) => category.name !== e.target.value))
    }

    function handleCategorySwap() {
        const oldPrimary = formData.primary_category;
        const oldSecondary = formData.secondary_category;

        setFormData((formData) => ({
            ...formData,
            primary_category: oldSecondary,
            secondary_category: oldPrimary
        }));

        setPrimaryCategories(categories.filter((category) => category.name !== oldPrimary))
        setSecondaryCategories(categories.filter((category) => category.name !== oldSecondary))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setErrorData({
            amount: "",
            primary_category: "",
            secondary_category: ""
        })

        if (formData.primary_category && formData.secondary_category) {

            const fromTransaction = {
                name: formData.name,
                description: `Money transfer to ${formData.secondary_category}`,
                amount: Number.parseFloat(formData.amount) * (-1),
                primary_category: formData.primary_category,
            }

            const toTransaction = {
                name: formData.name,
                description: `Money transfer from ${formData.primary_category}`,
                amount: formData.amount,
                primary_category: formData.secondary_category,
            }

            const response = await fetch(`/users/${user.id}/payments`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fromTransaction)
            });

            if (response.ok) {
                response.json()
                    .then(newFromTransfer => {
                        fetch(`/users/${user.id}/payments`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(toTransaction)
                        })
                            .then(res => res.json())
                            .then(newToTransfer => {
                                const fromCategory = categories.find((category) => category.id === newFromTransfer.primary_category)
                                const toCategory = categories.find((category) => category.id === newToTransfer.primary_category)

                                console.log(newToTransfer);

                                if (fromCategory.name !== "Unallocated Balance") {
                                    dispatch(categoriesUpdated({
                                        ...fromCategory,
                                        balance: Number.parseFloat(fromCategory.balance) + Number.parseFloat(newFromTransfer.amount)
                                    }))
                                }
                                else {
                                    dispatch(userSet({
                                        ...user,
                                        unallocated_balance: Number.parseFloat(user.unallocated_balance) +
                                        Number.parseFloat(newFromTransfer.amount) 
                                    }))
                                }
                                if (toCategory.name !== "Unallocated Balance") {
                                    dispatch(categoriesUpdated({
                                        ...toCategory,
                                        balance: Number.parseFloat(toCategory.balance) + Number.parseFloat(newToTransfer.amount)
                                    }))
                                }
                                else {
                                    dispatch(userSet({
                                        ...user,
                                        unallocated_balance: Number.parseFloat(user.unallocated_balance) +
                                        Number.parseFloat(newToTransfer.amount) 
                                    }))
                                }
                                setIsOpen((isOpen) => !isOpen)
                            })
                    })
            }
            else {
                response.json()
                    .then(data => {
                        data.errors.forEach((error) => {
                            let errorName = error.split(" ")[0].toLowerCase();

                            setErrorData(errorData => ({
                                ...errorData,
                                [errorName]: error
                            }))
                        })
                    })
            }
        }
        else {
            if (formData.primary_category) {
                if (formData.amount) {
                    setErrorData(errorData => ({
                        ...errorData,
                        secondary_category: "Category can't be blank"
                    }))
                }
                else {
                    setErrorData(errorData => ({
                        ...errorData,
                        amount: "Amount can't be blank",
                        secondary_category: "Category can't be blank"
                    }))
                }
            }
            else if (formData.secondary_category) {
                if (formData.amount) {
                    setErrorData(errorData => ({
                        ...errorData,
                        primary_category: "Category can't be blank"
                    }))
                }
                else {
                    setErrorData(errorData => ({
                        ...errorData,
                        amount: "Amount can't be blank",
                        primary_category: "Category can't be blank"
                    }))
                }
            }
            else {
                if (formData.amount) {
                    setErrorData(errorData => ({
                        ...errorData,
                        primary_category: "Category can't be blank",
                        secondary_category: "Category can't be blank"
                    }))
                }
                else {
                    setErrorData(errorData => ({
                        ...errorData,
                        amount: "Amount can't be blank",
                        primary_category: "Category can't be blank",
                        secondary_category: "Category can't be blank"
                    }))
                }
            }
        }

    }

    return (
        <form>
            <DialogContent>
                <Stack
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <TextField
                        sx={{
                            width: '30%',
                            marginBottom: '20px'
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
                    <FormControl
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        error={!!errorData.primary_category}
                    >
                        <InputLabel id="primary_category">Transfer From</InputLabel>
                        <Select
                            name="primary_category"
                            labelId="primary-category"
                            value={formData.primary_category}
                            label="Transfer From"
                            onChange={handlePrimaryCategoryChange}
                        >
                            {primaryCategories.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errorData.primary_category}</FormHelperText>
                    </FormControl>
                    <IconButton onClick={handleCategorySwap} size="large">
                        <SwapVertIcon
                            sx={{
                                height: '40px',
                                width: '40px'
                            }}
                        />
                    </IconButton>
                    <FormControl
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        error={!!errorData.secondary_category}
                    >
                        <InputLabel id="secondary_category">Transfer To</InputLabel>
                        <Select
                            name="secondary_category"
                            labelId="secondary-category"
                            value={formData.secondary_category}
                            label="Transfer To"
                            onChange={handleSecondaryCategoryChange}
                        >
                            {secondaryCategories.map((category) => (
                                <MenuItem
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errorData.secondary_category}</FormHelperText>
                    </FormControl>
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
    );
}

export default NewMoneyTransferForm;