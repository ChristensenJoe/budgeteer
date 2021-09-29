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
    InputAdornment,
    Stack,
    Typography,
    Alert,
} from "@mui/material"

import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { categoriesAdded } from '../../Redux/Slices/categoriesSlice'

function NewCategoryForm({ setIsOpen }) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const categories = useSelector((state) => state.categories.entities)

    const [formData, setFormData] = useState({
        name: "",
        percentage: ""
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

        const newFormData = {
            ...formData,
            percentage: Number.parseInt(formData.percentage)/100
        }

        
        const response = await fetch(`/users/${user.id}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFormData)
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

    const allowedPercentage = (100-(categories.reduce((total, category) => Number.parseFloat(category.percentage)+total, 0)*100)).toString()

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
                    <CurrencyTextField
                    style={{
                        width: 'calc(45% + 12px)'
                    }}
                        variant="outlined"
                        currencySymbol=""
                        label="Percentage of Income"
                        name="percentage"
                        minimumValue="0"
                        maximumValue={allowedPercentage}
                        outputFormat="string"
                        decimalPlaces={0}
                        onChange={handleChange}
                        value={formData.percentage}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                    />
                    <Alert 
                    severity="info"
                    sx={{
                        width: 'calc(85% + 12px)'
                    }}
                    >
                        <strong>Unallocated Percentage</strong> — {allowedPercentage}%
                    </Alert>
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