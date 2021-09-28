import {
    useState,
} from 'react'

import {
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

function SignupForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [errorData, setErrorData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    function handleChange(e) {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setErrorData({
            username: '',
            email: '',
            password: '',
            password_confirmation: ''
        });

        const response = await fetch(`/signup`, {
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
                    data.errors.forEach((error) => {
                        let errorName
                        (error.split(" ")[1] === 'confirmation') ?
                            errorName = "password_confirmation"
                            : 
                            errorName = error.split(" ")[0].toLowerCase() ;
                        
                        setErrorData(errorData => ({
                            ...errorData,
                            [errorName]: error
                        }))
                    })
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
                Signup
            </Typography>
            <form
                onSubmit={handleSubmit}
            >
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
                        error={!!errorData.username}
                        helperText={errorData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Email"
                        name="email"
                        value={formData.email}
                        error={!!errorData.email}
                        helperText={errorData.email}
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
                        error={!!errorData.password}
                        helperText={errorData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Confirm Password"
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        error={!!errorData.password_confirmation}
                        helperText={errorData.password_confirmation}
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
                            Signup
                        </Typography>
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

export default SignupForm;