import {
    useHistory,
    useLocation
} from 'react-router-dom'

import {
    Stack,
    Box,
    Typography,
    Button,
    styled,
    alpha
} from '@mui/material'



function UserCategoriesItem({ name, balance, percentage, id }) {
    const location = useLocation();
    const history = useHistory();

    const routeName = name.split(" ").join("-").toLowerCase();

    const ButtonRoute = (props) => <Button
        color="inherit"
        sx={{
            textTransform: 'none',
            padding: 0,
            textAlign: 'left'

        }}
        {...props}
    />;

    const StyledButtonRoute = styled(ButtonRoute)(({ theme}) => ({
        'fontFamily': theme.fontFamily,
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2)
        }, 
        '> .MuiTouchRipple-root span': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8)
        }
    }))

    function handleClick() {
        history.push({
            pathname: `${location.pathname}/${routeName}`,
            state: id
        })
    }

    return (
        <Box
            sx={{
                width: '90%'
            }}
            component={StyledButtonRoute}
            onClick={handleClick}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    width: '100%'
                }}
            >
                <Stack>
                    <Typography
                        sx={{
                            paddingLeft: '50px',
                            fontWeight: 500,
                            fontSize: {
                                xs: '1.8rem',
                                sm: '1.9rem',
                                md: '1.45rem',
                                lg: '2.2rem'
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        sx={{
                            paddingLeft: '50px',
                            fontWeight: 400,
                            fontSize: {
                                xs: '1.4rem',
                                sm: '1.6rem',
                                md: '1.5rem',
                                lg: '1.8rem'
                            }
                        }}
                    >
                        {percentage * 100}%
                    </Typography>
                </Stack>
                <Stack
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        sx={{
                            paddingRight: '50px',
                            fontWeight: 500,
                            fontSize: {
                                xs: '1.95rem',
                                sm: '2.2rem',
                                md: '2.3rem',
                                lg: '2.5rem'
                            }
                        }}
                    >
                        {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(balance)}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default UserCategoriesItem;