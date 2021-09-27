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

function CategoryTable({ setCategory, category }) {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState([]);

    function handleDelete(transaction) {
        setSelectedTransaction(transaction)
        setIsDeleteOpen(isDeleteOpen => !isDeleteOpen)
    }

    return (
        <>
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
                            category.payments.map((payment) => {
                                const date = new Date(payment.date)

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
                                                Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payment.amount)
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
                                            >
                                                <DeleteOutlineIcon

                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteTransactionDialog
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                setCategory={setCategory}
                transaction={selectedTransaction}
            />
        </>
    )
}

export default CategoryTable;