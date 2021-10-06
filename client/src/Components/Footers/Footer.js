import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Stack,
    useTheme

} from '@mui/material'

import logo from '../../Assets/logo-icon-transparent.png'

function Footer() {
    const theme = useTheme();

    return (
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100px',
                    pb: '20px',
                    pt: '20px',
                    backgroundColor: (theme) => theme.palette.primary.dark
                }}
            >
                <AppBar
                    color="transparent"
                    position="static"
                    elevation={0}
                >
                    <Toolbar>
                        <Box
                            sx={{
                                height: '100px',
                                width: '100px',
                                marginRight: '20px',                                textAlign: 'center'
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
                        
                        <Stack>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '1.2rem',
                                    mb: '5px'
                                }}
                            >
                                Joe Christensen
                            </Typography>
                            <a
                                href="https://github.com/ChristensenJoe"
                                style={{
                                    fontWeight: 400,
                                    fontFamily: theme.typography.fontFamily,
                                    color: theme.palette.text.primary,
                                    fontSize: '0.7rem',
                                    marginBottom: '3px'
                                }}
                            >
                                Github: ChristensenJoe
                            </a>
                            <a
                                href="mailto: joechristensenwork@gmail.com"
                                style={{
                                    fontWeight: 400,
                                    color: theme.palette.text.primary,
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: '0.7rem'
                                }}
                            >
                                Email: joechristensenwork@gmail.com
                            </a>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
    )
}

export default Footer;