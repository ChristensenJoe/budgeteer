import {
    useState,
    useEffect
} from 'react'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    Box,
    Stack,
    Typography
} from '@mui/material'

import { fetchRecentTransactions } from '../../Redux/Slices/recentTransactionsSlice'
import UserRecentTransactionsItem from '../Items/UserRecentTransactionsItem'

function UserRecentTransactionsInfoContainer() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const recentTransactions = useSelector((state) => state.recentTransactions.entities);

    useEffect(() => {
        dispatch(fetchRecentTransactions(user.id))
    }, [user.id])

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '30px',
                marginBottom: '30px',
                width: '100%'
            }}
        >
            <Typography
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    marginBottom: '10px',
                    fontSize: {
                        xs: '2.3rem',
                        md: '1.8rem',
                        lg: '2.3rem'
                    }
                }}
            >
                Recent Transactions
            </Typography>
            <Box
                borderRadius="16px"
                sx={{
                    width: '90%',
                    height: '3px',
                    bgcolor: 'primary.main',
                    marginBottom: '10px'
                }}
            />
            {
                recentTransactions.map((transaction) => (
                    <Box
                        key={transaction.id}
                        sx={{
                            display: 'contents'
                        }}
                    >
                        <UserRecentTransactionsItem
                            name={transaction.name}
                            amount={transaction.amount}
                            primary_category={transaction.primary_category}
                        />
                        <Box
                            borderRadius="16px"
                            sx={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: '90%',
                                height: '1px',
                                bgcolor: 'secondary.main'
                            }}
                        />
                    </Box>
                ))
            }
        </Stack>
    );
}

export default UserRecentTransactionsInfoContainer;