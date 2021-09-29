import {
    Stack,
    Box,
    Typography,
    Tooltip
} from '@mui/material'


function UserRecentTransactionsItem({ name, amount, primary_category }) {

    const formattedAmount = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

    return (
        <Box
            sx={{
                width: '90%'
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    width: '100%'
                }}
            >
                <Tooltip
                    title={name}
                    placement="bottom"
                    sx={{
                        minWidth: '30%',
                        maxWidth: '30%'
                    }}
                >
                    <Typography
                        noWrap
                        sx={{
                            fontWeight: 500,
                            fontSize: {
                                xs: '2rem',
                                sm: '2.2rem',
                                md: '1.5rem',
                                lg: '1.7rem'
                            }
                        }}
                    >
                        {name}
                    </Typography>
                </Tooltip>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        minWidth: '70%',
                        maxWidth: '70%'
                    }}
                >
                    <Tooltip
                        title={primary_category}
                        placement="bottom"
                    >
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 400,
                                fontSize: {
                                    xs: '1.5rem',
                                    sm: '1.8rem',
                                    md: '1.2rem',
                                    lg: '1.4rem'
                                }
                            }}
                        >
                            {primary_category}
                        </Typography>
                    </Tooltip>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: {
                                xs: '2rem',
                                sm: '2.2rem',
                                md: '1.5rem',
                                lg: '1.7rem'
                            }
                        }}
                    >
                        {
                            Math.sign(amount) === 1 ? `+${formattedAmount}` : formattedAmount
                        }
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default UserRecentTransactionsItem;