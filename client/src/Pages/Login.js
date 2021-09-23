import {
    Grid,
    Box,
} from '@mui/material'

import LoginForm from '../Components/Forms/LoginForm'

function Login() {

    return (
        <Grid
            container
            sx={{
            }}
        >
            <Grid
                item
                sm={8}
                xs={12}
            >
                <Box
                    sx={{
                    }}
                >
                    test
                </Box>
            </Grid>
            <Grid
                item
                sm={4}
                xs={12}
            >
                <Box
                    sx={{
                    }}
                >
                    <Box
                        sx={{ 
                            marginTop: '200px',
                            height: '500px',
                            width: '300px'
                        }}
                    >
                        <LoginForm />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login;