import { useState,
forwardRef } from 'react'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Grid,
    Stack,
    Button,
    Alert,
    InputAdornment
} from '@mui/material'

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

function SettingsPaymentForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const [isUpdatedBanner, setIsUpdatedBanner] = useState(false);

    const [formData, setFormData] = useState({
        amount: "",
        paydates: []
    })

    function handleChange(event) {
        let value;
        event.target.name === 'paydates' ? value = event.target.value.split(" ") : value = event.target.value

        setFormData((formData) => ({
            ...formData,
            [event.target.name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch(`/users/${user.id}/paychecks/${user.paycheck.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            response.json()
                .then(newPaycheck => {
                    dispatch(userSet({
                        ...user,
                        paycheck: newPaycheck
                    }))
                    setIsUpdatedBanner(true)
                })
        }
    }

    return (
        <form
            sx={{
            }}
        >
            <Grid
                container
                spacing={12}
                sx={{
                    width: '100%'
                }}
            >
                <Grid
                    item
                    xs={9}
                >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="amount"
                            label="Paycheck Amount"
                            onChange={handleChange}
                            value={formData.amount}
                            InputProps={{
                                startAdornment:  <InputAdornment position="start">$</InputAdornment>,
                                inputComponent: NumberFormatCustom
                            }}
                        />
                        <FormControl
                            fullWidth
                            sx={{
                            }}
                        >
                            <InputLabel id="paydate">Paydates</InputLabel>
                            <Select
                                onChange={handleChange}
                                name="paydates"
                                labelId="paydates"
                                label="Paydates"
                                value={formData.paydates.join(" ")}
                            >
                                <MenuItem
                                    value="01 15"
                                >
                                    Bi-Weekly (1st & 15th)
                                </MenuItem>
                                <MenuItem
                                    value="01"
                                >
                                    Monthly (1st)
                                </MenuItem>
                            </Select>
                        </FormControl>
                        {isUpdatedBanner && <Alert severity="success">Successfully Updated!</Alert>}
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={3}
                    sx={{
                    }}
                >
                    <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: 'primary.light',
                            width: '100px',
                            margin: 'auto',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'text.primary'
                            }}
                        >
                            Save
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SettingsPaymentForm;