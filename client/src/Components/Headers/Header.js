import {
    NavLink,
    useHistory
 } from 'react-router-dom'

import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar
} from '@mui/material'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import { userSet } from '../../Redux/Slices/userSlice'
import logo from '../../Assets/logo-placeholder.png'

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.entities)

    function handleLogout() {
        fetch('/logout', { 
            method: "DELETE"
        });
        dispatch(userSet(false));
        history.push('/login');
    }

    return (
        <Box
            sx={{ 
                flexGrow: 1,
                marginBottom: '20px'
            }}
        >
            <AppBar
                color="transparent"
                position="static"
                elevation={0}
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
                    {user ?
                        (<>
                        <Button
                            component={NavLink}
                            variant="text"
                            to={`/${user.username}`}
                            sx={{
                                height: '90px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'medium',
                                    color: 'text.primary'
                                }}
                            >
                                {user.username}
                            </Typography>
                        </Button>
                        <Button
                            variant="text"
                            onClick={handleLogout}
                            sx={{
                                height: '90px',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'medium',
                                    color: 'text.primary'
                                }}
                            >
                                Logout
                            </Typography>
                        </Button>
                        </>)
                        :
                        (<Button
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
                        </Button>)}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;