import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, {useContext} from 'react'
import {UserContext} from '../components/UserContext'

const useStyles = makeStyles(theme => ({
    header: {
        margin: '40px 0'
    },
    table: {
        minWidth: 650,
    },

}))

const OrderHistory = () => {
    const user = useContext(UserContext)
    const classes = useStyles()
    return (
        <Container>
            <Typography variant="h4" className={classes.header}>{user.firstName}'s Orders</Typography>
            {user.orderHistory.map((item, index) => (
                <TableContainer component={Paper} style={{marginBottom: '40px'}} key={index}>
                    <Table stickyHeader className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Placed<br />{item.order_date}</TableCell>
                                <TableCell >Product Name</TableCell>
                                <TableCell >Quantity</TableCell>
                                <TableCell >Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row"/>
                                    <TableCell >{product.description}</TableCell>
                                    <TableCell >{product.quantity}</TableCell>
                                    <TableCell >${(parseFloat(product.amount_subtotal) / 100).toFixed(2)}</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
            
        </Container>
    )
}

export default OrderHistory
