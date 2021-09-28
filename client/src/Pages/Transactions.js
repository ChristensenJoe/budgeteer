import {
    useState,
    useEffect
} from 'react'

import {
    useSelector
} from 'react-redux'

import {
    Box,
    Stack,
    Container,
    Typography,
    Button,
    Skeleton
} from '@mui/material'

import AllTransactionsTable from '../Components/Tables/AllTransactionsTable'
import NewTransactionDialog from '../Components/Dialogs/NewTransactionDialog'

function Transitions() {
    const user = useSelector((state) => state.user.entities);

    const [transactions, setTransactions] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch(`/users/${user.id}/payments`)
            .then(res => res.json())
            .then(setTransactions);
    }, [user.id])

    return (
        <>
            <Container>
                {transactions ? <Box
                    sx={{
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 12,
                        minHeight: '800px'
                    }}
                >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            marginTop: '30px',
                            marginBottom: '30px',
                            width: '100%'
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: {
                                    xs: '1.55rem',
                                    sm: '1.95rem',
                                    md: '2.5rem',
                                    lg: '2.7rem'
                                }
                            }}
                        >
                            All Transactions
                        </Typography>
                        <Box
                            borderRadius={16}
                            sx={{
                                width: '95%',
                                height: '3px',
                                bgcolor: 'primary.main'
                            }}
                        />
                        <Button
                            color="secondary"
                            variant="outlined"
                            sx={{
                                bgcolor: 'primary.light',
                            }}
                            onClick={() => { setIsOpen((isOpen) => !isOpen)}}
                        >
                            <Typography
                                sx={{
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    fontSize: '1rem'
                                }}
                            >
                                New Transaction
                            </Typography>
                        </Button>
                        <AllTransactionsTable 
                            transactions={transactions}
                            setTransactions={setTransactions}
                        />
                    </Stack>
                </Box>
                    :
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                        sx={{
                            marginTop: '80px',
                            marginBottom: '30px',
                            width: '100%'
                        }}
                    >
                        <Skeleton
                            animation="wave"
                            sx={{
                                width: '90%',
                                height: '80px',
                                marginBottom: '10px'
                            }}
                        />
                        <Box
                            sx={{
                                display: 'contents'
                            }}
                        >
                            <Skeleton
                                animation="wave"
                                sx={{
                                    width: '90%',
                                    height: '80px',
                                    marginBottom: '50px'
                                }}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                sx={{
                                    width: '90%',
                                    height: '600px'
                                }}
                            />
                        </Box>
                    </Stack>}
            </Container>

            <NewTransactionDialog 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setTransactions={setTransactions}
            />
        </>
    )
}

export default Transitions;