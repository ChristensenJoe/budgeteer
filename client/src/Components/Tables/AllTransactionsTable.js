import { useState } from 'react'

import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import DeleteTransactionDialog from '../Dialogs/DeleteTransactionDialog'

function AllTransactionsTable({ transactions }) {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState([]);

    function handleDelete(transaction) {
        setSelectedTransaction(transaction)
        setIsDeleteOpen(isDeleteOpen => !isDeleteOpen)
    }

    return <>
        <TableContainer
            component={Paper}
            sx={{
                width: '95%'
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        {!smallScreen && <TableCell>
                            Description
                        </TableCell>}
                        <TableCell>
                            Amount
                        </TableCell>
                        <TableCell>
                            Date
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        transactions.map((payment) => {
                            const date = new Date(payment.date)
                            const amount = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payment.amount)

                            return (
                                <TableRow
                                    key={payment.id}
                                >
                                    <TableCell>
                                        {payment.name}
                                    </TableCell>
                                    {!smallScreen && <TableCell>
                                        {payment.description}
                                    </TableCell>}
                                    <TableCell>
                                        {
                                            Math.sign(payment.amount) === 1 ? `+${amount}` : amount
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => {
                                                handleDelete(payment)
                                            }}
                                            size="large">
                                            <DeleteOutlineIcon

                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <DeleteTransactionDialog
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            transaction={selectedTransaction}
        />
    </>;
}

export default AllTransactionsTable;