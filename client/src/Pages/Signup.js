import {
    Grid,
    Stack,
    Box
} from '@mui/material'

import FadeIn from 'react-fade-in'
import logo from '../Assets/big-logo.png'

import SignupForm from '../Components/Forms/SignupForm'

function Signup() {

    return (
        <Grid
            container
            sx={{
                marginTop: {
                    xs: '50px',
                    sm: '50px',
                    md: '150px',
                    lg: '150px',
                    xl: '150px'
                },
                marginBottom: '50px'
            }}
        >
            <Grid
                item
                md={8}
                sm={12}
                xs={12}
            >
                <Stack
                    sx={{
                        height: '100%',
                        width: '100%'
                    }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <FadeIn
                        delay={200}
                        transitionDuration={1000}
                    >
                        <Box
                            sx={{
                                width: {
                                    xs: '55vw',
                                    lg: '48vw'
                                },
                                height: 'auto',
                                overflow: 'auto',
                                mt: {
                                    xs: '-20px',
                                    sm: '-20px',
                                    md: '-40px',
                                    lg: '-60px',
                                    xl: '-60px'
                                },
                                float: 'right',
                                textAlign: 'right',
                                "& img": {
                                    width: '100%'
                                }
                            }}
                        >
                        <img
                            src={logo}
                            alt="Budgeteer Logo"
                        />
                        </Box>
                    </FadeIn>
                </Stack>
            </Grid>
            <Grid
                item
                md={4}
                sm={12}
                xs={12}
            >
                <Stack
                    sx={{
                        marginTop: {
                            xs: '40px',
                            sm: '40px'
                        }
                    }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <FadeIn
                        delay={400}
                        transitionDuration={1400}
                    >
                    <SignupForm />
                    </FadeIn>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Signup;