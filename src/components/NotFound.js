import { makeStyles, Typography, Button } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import React from 'react'

const useStyles = makeStyles(theme => ({
    notfound: {
        textAlign: 'center',
        paddingTop: '360px'
    },
    button: {
        margin: '30px 0px'
    }
}))

const NotFound = () => {
    const classes = useStyles()
    const history = useHistory()
    const goBack = () => {
        history.push('/')
    }
    return (
        <div className={classes.notfound}>
            <Typography variant="h2">Oops, Nothing To See Here...</Typography>
            <Button className={classes.button} variant="contained" color="primary" onClick={goBack}>
                <Typography variant="h5">Go Back</Typography>
            </Button>
        </div>
    )
}

export default NotFound
