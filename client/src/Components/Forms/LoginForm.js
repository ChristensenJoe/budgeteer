import {
    useState,
} from 'react'

import {
    NavLink,
    useHistory
} from 'react-router-dom'

import {
    Box,
    Typography,
    TextField,
    Button,
    Stack
} from '@mui/material'

import { 
    useDispatch
} from 'react-redux';

import { userSet } from '../../Redux/Slices/userSlice'

function LoginForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errorData, setErrorData] = useState(false)

    function handleChange(e) {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
            setErrorData(false);

            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                response.json()
                    .then(user => {
                        dispatch(userSet(user))
                        history.push(`/${user.username}`)
                    })
            }
            else {
                response.json()
                    .then(data => {
                        setErrorData(data.errors)
                    })
            }
    }

    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'medium',
                    marginTop: '20px',
                    marginBottom: '40px'
                }}
            >
                Login
            </Typography>
            <form
                onSubmit={handleSubmit}
            >
                {
                        !!errorData && (
                            <Typography
                                color="error"
                                variant="body1"
                                sx={{
                                    marginBottom: '20px'
                                }}
                            >{errorData}</Typography>
                        )
                    }
                <Stack
                    spacing={6}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Username"
                        name="username"
                        value={formData.username}
                        error={!!errorData}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        error={!!errorData}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        color="secondary"
                        variant="outlined"
                        sx={{
                            bgcolor: 'primary.light',
                            width: '100px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'text.primary'
                            }}
                        >
                            Login
                        </Typography>
                    </Button>
                </Stack>
                <Typography
                    variant="body"
                    component={NavLink}
                    to="/signup"
                    sx={{
                        color: 'text.primary'
                    }}
                >
                    Dont have an account? Signup!
                </Typography>
            </form>
        </Box>
    )
}

export default LoginForm;