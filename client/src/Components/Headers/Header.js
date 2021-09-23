import { NavLink } from 'react-router-dom'

import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar
} from '@mui/material'

import logo from '../../Assets/logo-placeholder.png'

function Header() {


    return (
        <Box
            sx={{ flexGrow: 1 }}
        >
            <AppBar
                color="transparent"
                position="static"
                elevation="0"
            >
                <Toolbar>
                    <Box
                        component={NavLink}
                        to="/"
                        sx={{
                            height: '100px',
                            width: '100px',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'cover'
                            }}
                            src={logo}
                            alt="Logo"
                        />
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'medium'
                        }}
                    >
                        Budgeteer
                    </Typography>
                    <Button
                        component={NavLink}
                        variant="text"
                        to="/login"
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'medium',
                                color: 'text.primary'
                            }}
                        >
                            Login
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;