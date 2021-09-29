import {
    useState
} from 'react'

import {
    NavLink,
} from 'react-router-dom'

import {
    useSelector,
} from 'react-redux'

import {
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Collapse,
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard';
import Settings from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import NewMoneyTransferDialog from '../Dialogs/NewMoneyTransferDialog'
import NewTransactionDialog from '../Dialogs/NewTransactionDialog';

function UserMenu({ isOpen, anchorEl, setAnchorEl }) {

    const user = useSelector(state => state.user.entities)
    const categories = useSelector(state => state.categories.entities)

    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [isTransferOpen, setIsTransferOpen] = useState(false);
    const [isTransactionOpen, setIsTransactionOpen] = useState(false);

    function handleCloseMenu() {
        setAnchorEl(null);
        setIsCollapseOpen(false);
    }

    function handleClickCollapse() {
        setIsCollapseOpen((isCollapseOpen) => !isCollapseOpen)
    }

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    component={NavLink}
                    onClick={handleCloseMenu}
                    to={`/${user.username.split(" ").join("")}`}
                >
                    <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                </MenuItem>
                <MenuItem
                    component={NavLink}
                    onClick={handleCloseMenu}
                    to={`/settings`}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleCloseMenu()
                        setIsTransactionOpen((isTransactionOpen) => !isTransactionOpen)
                    }}
                >
                    <ListItemIcon>
                        <ReceiptIcon fontSize="small" />
                    </ListItemIcon>
                    New Transaction
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleCloseMenu()
                        setIsTransferOpen((isTransferOpen) => !isTransferOpen)
                    }}
                >
                    <ListItemIcon>
                        <SwapHorizIcon fontSize="small" />
                    </ListItemIcon>
                    Money Transfer
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={handleClickCollapse}
                    id="categories"
                >
                    <ListItemIcon>
                        <ListIcon fontSize="small" />
                    </ListItemIcon>
                    Categories
                    {isCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </MenuItem>
                <Collapse
                    in={isCollapseOpen}
                    timeout="auto"
                    unmountOnExit
                >
                    {
                        categories.map((category) => {
                            const path = `/${user.username.split(" ").join("")}/${category.name.split(" ").join("-").toLowerCase()}`;

                            return (
                            <MenuItem
                                key={category.id}
                                component={NavLink}
                                onClick={handleCloseMenu}
                                to={{
                                    pathname: path,
                                    state: category.id
                                }}
                                sx={{
                                    pl: 4
                                }}
                            >
                                {category.name}
                            </MenuItem>
                            )
                        })
                    }
                </Collapse>
                <MenuItem
                    component={NavLink}
                    onClick={handleCloseMenu}
                    to={`/${user.username.split(" ").join("")}/transactions`}
                >
                    <ListItemIcon>
                        <ListAltIcon fontSize="small" />
                    </ListItemIcon>
                    All Transactions
                </MenuItem>
            </Menu>
            <NewMoneyTransferDialog
                isOpen={isTransferOpen}
                setIsOpen={setIsTransferOpen}
            />
            <NewTransactionDialog
                isOpen={isTransactionOpen}
                setIsOpen={setIsTransactionOpen}
            />
        </>
    )
}

export default UserMenu;