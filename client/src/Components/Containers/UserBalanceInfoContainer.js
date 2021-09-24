import {
    Stack,
    Box,
    Typography
} from '@mui/material'

import {
    useSelector
} from 'react-redux'

function UserBalanceInfoContainer() {
    const user = useSelector((state) => state.user.entities);

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
                <Typography
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
                    $25,000.00
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
                <Typography
                    sx={{
                        paddingLeft: {
                            xs: '20px',
                            sm: '40px',
                            md: '30px',
                        },
                        fontWeight: 500,
                        fontSize: {
                            xs: '1.6rem',
                            sm: '1.8rem',
                            md: '1.2rem',
                            lg: '1.9rem'
                        }
                    }}
                >
                    Unallocated Balance
                </Typography>
                <Typography
                    sx={{
                        paddingRight: {
                            xs: '20px',
                            sm: '40px',
                            md: '30px',
                        },
                        fontWeight: 500,
                        fontSize: {
                            xs: '1.6rem',
                            sm: '1.8rem',
                            md: '1.2rem',
                            lg: '1.9rem'
                        }
                    }}
                >
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(user.unallocated_balance)}
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
                <Typography
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
                    14 days
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
                <Typography
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
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(user.paycheck.amount)}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default UserBalanceInfoContainer;