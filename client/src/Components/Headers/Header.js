import {
    useState
} from 'react'

import {
    NavLink,
    useHistory
} from 'react-router-dom'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,

} from '@mui/material'

import { userSet } from '../../Redux/Slices/userSlice'
import logo from '../../Assets/logo-icon.png'
import UserMenu from '../Menus/UserMenu'
import createTypography from '@mui/material/styles/createTypography'

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.entities)

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    function handleLogout() {
        fetch('/api/logout', {
            method: "DELETE"
        });
        dispatch(userSet(false));
        history.push('/login');
    }

    function handleClickMenu(e) {
        setAnchorEl(e.currentTarget);
    }

    return (
        <>
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
                                height: {
                                    sm: '100px',
                                    xs: '40px'
                                },
                                width: {
                                    sm: '100px',
                                    xs: '40px'
                                },
                                marginRight: '20px', textAlign: 'center'
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
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'medium',
                                fontSize: {
                                    sm: '3rem',
                                    xs: '1.2rem'
                                }
                            }}
                        >
                            Budgeteer
                        </Typography>
                        {user ?
                            (<>
                                <Button
                                    variant="text"
                                    onClick={handleClickMenu}
                                    sx={{
                                        height: '90px'
                                    }}
                                >
                                    <Typography
                                        noWrap
                                        sx={{
                                            fontWeight: 'medium',
                                            color: 'text.primary',
                                            fontSize: {
                                                sm: '1.2rem',
                                                xs: '1rem'
                                            }
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
                                            color: 'text.primary',
                                            fontSize: {
                                                sm: '1.2rem',
                                                xs: '1rem'
                                            }
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
                                    sx={{
                                        fontWeight: 'medium',
                                        color: 'text.primary',
                                        fontSize: {
                                            sm: '1.2rem',
                                            xs: '1rem'
                                        }
                                    }}
                                >
                                    Login
                                </Typography>
                            </Button>)}
                    </Toolbar>
                </AppBar>
            </Box>
            {user &&
                <UserMenu
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    isOpen={isOpen}
                />
            }
        </>
    )
}

export default Header;