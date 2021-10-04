import {
    useState,
    forwardRef
} from 'react'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

import {
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Stack,
    Typography,
    InputAdornment,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'
import { transactionsAdded } from '../../Redux/Slices/transactionsSlice'
import { recentTransactionsAdded, recentTransactionsRemoved } from '../../Redux/Slices/recentTransactionsSlice'
import { userSet } from '../../Redux/Slices/userSlice'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                })
            }}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator={true}
            allowNegative={false}
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

function NewTransactionForm({ setIsOpen }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const categories = useSelector((state) => state.categories.entities);
    const recentTransactions = useSelector((state) => state.recentTransactions.entities);

    let sortedCategories = JSON.parse(JSON.stringify(categories));
    sortedCategories.sort((a, b) => a.position - b.position);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: false,
        amount: "",
        categories: [],
        primary_category: sortedCategories[0].name
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

        let newFormData = JSON.parse(JSON.stringify(formData))
        if(!newFormData.type) {
            newFormData = {
                ...newFormData,
                amount: (Number.parseFloat(newFormData.amount)*-1).toString()
            }
        }
        const response = await fetch(`/users/${user.id}/payments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFormData)
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
                        let errorName = error.split(" ")[0].toLowerCase();

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
                    >
                        <TextField
                            sx={{
                                width: '50%',
                                mr: '50px'
                            }}
                            label="Transaction Name"
                            name="name"
                            error={!!errorData.name}
                            helperText={errorData.name}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <IconButton
                            color={formData.type ? "primary" : "error"}
                            onClick={() => {setFormData((formData) => ({
                                ...formData,
                                type: !formData.type
                            }))}}
                        >
                            {
                                formData.type ? <AddIcon  
                                sx={{
                                    height: '30px',
                                    width: '30px'
                                }}
                                /> : 
                                <RemoveIcon 
                                sx={{
                                    height: '30px',
                                    width: '30px'
                                }}
                                />
                            }
                        </IconButton>
                        <TextField
                            style={{
                                width: '30%'
                            }}
                            variant="outlined"
                            name="amount"
                            label="Amount"
                            onChange={handleChange}
                            error={!!errorData.amount}
                            helperText={errorData.amount}
                            value={formData.amount}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumberFormatCustom
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