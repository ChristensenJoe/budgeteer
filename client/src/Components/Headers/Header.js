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

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.entities)

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    function handleLogout() {
        fetch('/logout', {
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