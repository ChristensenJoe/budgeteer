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

import Chart from 'react-apexcharts';

import {
    Stack,
    Typography,
    Grid,
    DialogContent,
    DialogActions,
    Button,
    InputAdornment,
    TextField,
    Alert,
    IconButton,
    Collapse,
    useMediaQuery,
    useTheme
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

import { categoriesUpdated } from '../../Redux/Slices/categoriesSlice'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, maxinput, ...other } = props;

    const withValueCap = (inputObj) => {
        const { value } = inputObj;
        if (value <= maxinput) return true;
        return false;
    }

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
            suffix={'%'}
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

function AllocateCategoryPercentageForm({ setIsOpen }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities)
    const categories = useSelector((state) => state.categories.entities)

    let startingFormData = {}
    let startingPercentage = 0.0
    let startingSeries = []
    let startingLabels = []

    const sortedCategories = JSON.parse(JSON.stringify(categories));
    sortedCategories.sort((a, b) => a.id - b.id);

    sortedCategories.forEach((category) => {
        startingFormData[category.id] = Math.floor(Number.parseFloat(category.percentage) * 100).toString();

        startingPercentage += Math.floor(Number.parseFloat(category.percentage) * 100);

        startingSeries.push(Math.floor(category.percentage * 100))
        startingLabels.push(category.name)
    })
    startingSeries.push(100 - startingPercentage);
    startingLabels.push("Unallocated Percentage")

    const [chartState, setChartState] = useState({
        options: {
            labels: startingLabels
        },
        series: startingSeries
    })
    const [formData, setFormData] = useState(startingFormData)
    const [unallocatedPercentage, setUnallocatedPercentage] = useState(100 - startingPercentage);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isXS = useMediaQuery(theme.breakpoints.only('xs'));

    function handleChange(e) {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value
        };

        setFormData(newData);

        const filteredData = Object.values(newData).filter((formData) => formData !== "");

        const newPercentage = filteredData.reduce((total, current) => {
            return total + (Number.parseFloat(current) / 100)
        }, 0);

        setUnallocatedPercentage(Math.ceil(100 - (newPercentage * 100)));

        let newSeries = Object.values(newData);

        newSeries = newSeries.map((value) => {
            if (value === "") return 0;
            return Number.parseInt(value);
        });

        newSeries.push(Math.ceil(100 - (newPercentage * 100)));

        setChartState((chartState) => ({
            ...chartState,
            series: newSeries
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();


        Object.keys(formData).forEach(async (categoryId) => {
            let newPercentage;
            formData[categoryId] === ""
                ?
                newPercentage = 0.0
                :
                newPercentage = Number.parseFloat(formData[categoryId]) / 100

            const response = await fetch(`/users/${user.id}/categories/${categoryId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    percentage: newPercentage
                })
            });

            const newCategory = await response.json();

            dispatch(categoriesUpdated(newCategory));
        })

        setIsSubmitted(true);
        setIsOpen(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <DialogContent>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                >
                    <Chart
                        options={chartState.options}
                        series={chartState.series}
                        type="pie"
                        width={
                            isXS ?
                                "300"
                                :
                                "500"
                        }
                    />
                    <Collapse
                        sx={{
                            mt: '20px',
                            mb: '20px'
                        }}
                        in={isSubmitted}
                    >
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setIsSubmitted(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Successfully Updated
                        </Alert>
                    </Collapse>
                    <Grid
                        container
                        sx={{
                            justifyContent: 'center',
                        }}
                        spacing={4}
                    >
                        {
                            sortedCategories.map((category) => {


                                return (
                                    <Grid
                                        key={category.id}
                                        item
                                        xs={6}
                                        sm={4}
                                    >
                                        <TextField
                                            style={{
                                                width: '100%'
                                            }}
                                            variant="outlined"
                                            name={category.id.toString()}
                                            label={`${category.name} Percentage`}
                                            onChange={handleChange}
                                            value={formData[category.id]}
                                            InputProps={{
                                                endAdornment: (formData[category.id] === "" ? <InputAdornment position="end">%</InputAdornment> : null),
                                                inputComponent: NumberFormatCustom,
                                                inputProps: {
                                                    maxinput: unallocatedPercentage
                                                }
                                            }}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Alert
                        severity="info"
                        sx={{
                            marginTop: '20px',
                            width: 'calc(85% + 12px)'
                        }}
                    >
                        <strong>Unallocated Percentage</strong> — {unallocatedPercentage}%
                    </Alert>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
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
                        Update
                    </Typography>
                </Button>
            </DialogActions>
        </form>
    )
}

export default AllocateCategoryPercentageForm;