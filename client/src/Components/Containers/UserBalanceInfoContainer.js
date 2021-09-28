import {
    Stack,
    Box,
    Typography,
    Tooltip
} from '@mui/material'

import {
    useSelector
} from 'react-redux'

import * as dateMath from 'date-arithmetic'

function UserBalanceInfoContainer() {
    const user = useSelector((state) => state.user.entities);

    const today = new Date();

    const dates = user.paycheck.paydates.map((paydate) => {
        let date = new Date();
        date.setDate(Number.parseInt(paydate.paydate.split("-")[2]))
        if(dateMath.gt(today, date, "day")) {
            date.setMonth(date.getMonth()+1)
        }
        return date
    })

    let nextPaycheck = 31;
    dates.forEach((date) => {
        const difference = dateMath.diff(today, date, "day")
        if(difference < nextPaycheck) {
            nextPaycheck = difference;
        }
    })
    console.log(user)


    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
                marginTop: '30px',
                marginBottom: '30px',
                width: '100%'
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{
                    width: '100%'
                }}
            >
                <Tooltip title="Total Balance" placement="bottom">
                    <Typography
                        noWrap
                        sx={{
                            paddingLeft: {
                                xs: '20px',
                                sm: '40px',
                                md: '30px',
                            },
                            fontWeight: 600,
                            fontSize: {
                                xs: '1.95rem',
                                sm: '2.15rem',
                                md: '1.15rem',
                                lg: '1.8rem'
                            }
                        }}
                    >
                        Total Balance
                    </Typography>
                </Tooltip>
                <Typography
                    sx={{
                        paddingRight: {
                            xs: '20px',
                            sm: '40px',
                            md: '30px',
                        },
                        fontWeight: 600,
                        color: 'primary.main',
                        fontSize: {
                            xs: '1.95rem',
                            sm: '2.15rem',
                            md: '1.15rem',
                            lg: '1.8rem'
                        }
                    }}
                >
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.total_balance)}
                </Typography>
            </Stack>
            <Box
                borderRadius={16}
                sx={{
                    width: '90%',
                    height: '3px',
                    bgcolor: 'primary.main'
                }}
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{
                    width: '100%',
                    paddingTop: '10px'
                }}
            >
                <Tooltip title="Unallocated Balance" placement="bottom">
                    <Typography
                        noWrap
                        sx={{
                            paddingLeft: {
                                xs: '20px',
                                sm: '40px',
                                md: '30px',
                            },
                            fontWeight: 500,
                            fontSize: {
                                xs: '1.5rem',
                                sm: '1.7rem',
                                md: '1.2rem',
                                lg: '1.4rem'
                            }
                        }}
                    >
                        Unallocated Balance
                    </Typography>
                </Tooltip>
                <Typography
                    sx={{
                        paddingRight: {
                            xs: '20px',
                            sm: '40px',
                            md: '30px',
                        },
                        fontWeight: 500,
                        fontSize: {
                            xs: '1.5rem',
                            sm: '1.7rem',
                            md: '1.2rem',
                            lg: '1.4rem'
                        }
                    }}
                >
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.unallocated_balance)}
                </Typography>
            </Stack>
            <Box
                borderRadius={16}
                sx={{
                    width: '90%',
                    height: '1px',
                    bgcolor: 'primary.main'
                }}
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{
                    width: '100%',
                    paddingTop: '10px'
                }}
            >
                <Tooltip title="Next Payment" placement="bottom">
                    <Typography
                        noWrap
                        sx={{
                            paddingLeft: {
                                xs: '20px',
                                sm: '40px',
                                md: '30px',
                            },
                            fontWeight: 400,
                            fontSize: {
                                xs: '1.2rem',
                                sm: '1.3rem',
                                md: '1.1rem',
                                lg: '1.4rem'
                            }
                        }}
                    >
                        Next Payment
                    </Typography>
                </Tooltip>
                <Typography
                    noWrap
                    sx={{
                        paddingRight: {
                            xs: '20px',
                            sm: '40px',
                            md: '30px',
                        },
                        fontWeight: 400,
                        fontSize: {
                            xs: '1.2rem',
                            sm: '1.3rem',
                            md: '1.1rem',
                            lg: '1.4rem'
                        }
                    }}
                >
                    {nextPaycheck} days
                </Typography>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{
                    width: '100%',
                    paddingTop: '10px'
                }}
            >
                <Tooltip title="Paycheck Amount" placement="bottom">
                    <Typography
                        noWrap
                        sx={{
                            paddingLeft: {
                                xs: '20px',
                                sm: '40px',
                                md: '30px',
                            },
                            fontWeight: 400,
                            fontSize: {
                                xs: '1.2rem',
                                sm: '1.3rem',
                                md: '1.1rem',
                                lg: '1.4rem'
                            }
                        }}
                    >
                        Paycheck Amount
                    </Typography>
                </Tooltip>
                <Typography
                    sx={{
                        paddingRight: {
                            xs: '20px',
                            sm: '40px',
                            md: '30px',
                        },
                        fontWeight: 400,
                        fontSize: {
                            xs: '1.2rem',
                            sm: '1.3rem',
                            md: '1.1rem',
                            lg: '1.4rem'
                        }
                    }}
                >
                    {
                        user.paycheck
                            ?
                            Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.paycheck.amount)
                            :
                            "$0.00"
                    }
                </Typography>
            </Stack>
        </Stack >
    )
}

export default UserBalanceInfoContainer;