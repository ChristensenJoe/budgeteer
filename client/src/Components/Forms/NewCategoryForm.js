import { 
    useState,
    forwardRef
} from 'react'

import {
    useHistory,
    useLocation
} from 'react-router-dom'

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
    InputAdornment,
    Stack,
    Typography,
    Alert,
} from "@mui/material"

import { categoriesAdded } from '../../Redux/Slices/categoriesSlice'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, maxinput, ...other } = props;

    const withValueCap = (inputObj) => {
        const {value} = inputObj;
        if (value <= maxinput) return true;
        return false;
    }
    console.log(maxinput)

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
            decimalScale={0}
            allowNegative={false}
            isAllowed={withValueCap}
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    maxinput: PropTypes.number.isRequired,
}

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

    const allowedPercentage = Math.floor((100-(categories.reduce((total, category) => Number.parseFloat(category.percentage)+total, 0)*100)))

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
                    style={{
                        width: 'calc(25% + 12px)'
                    }}
                        variant="outlined"
                        name="percentage"
                        label="Percentage"
                        onChange={handleChange}
                        value={formData.percentage}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            inputComponent: NumberFormatCustom,
                            inputProps: {
                                maxinput: allowedPercentage
                            }
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