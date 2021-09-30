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
    Stack,
    Typography,
    InputAdornment,
    Autocomplete
} from "@mui/material"

import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'
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
            allowNegative={true}
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

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
                                newTransaction,
                                ...category.payments
                            ]
                        }
                        dispatch(categoriesUpdated(newCategory))
                        return newCategory;
                    })
                    dispatch(userSet({
                        ...user,
                        total_balance: Number.parseFloat(user.total_balance) + Number.parseFloat(formData.amount)
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