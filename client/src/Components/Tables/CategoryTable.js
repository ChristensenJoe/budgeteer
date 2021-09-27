import { 
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    useMediaQuery
} from '@mui/material'


function CategoryTable({category}) {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
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
                                        Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(payment.amount)
                                    }
                                </TableCell>
                                <TableCell>
                                    {`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}
                                </TableCell>
                            </TableRow>
                        )})
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CategoryTable;