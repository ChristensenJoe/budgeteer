import {
    Grid,
    Stack
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
                sm={8}
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
                        <img
                            sx={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                            }}
                            src={logo}
                            alt="Budgeteer Logo"
                        />
                    </FadeIn>
                </Stack>
            </Grid>
            <Grid
                item
                sm={4}
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