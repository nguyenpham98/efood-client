import React, { useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPassword = () => {
    const classes = useStyles()
    let { id, token } = useParams()
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const sendRequest = (e) => {
        e.preventDefault()
        if (password !== repeatPassword) return
        
        const data = { id, token, password }
        axios.post('https://react-express-heroku-nguyen.herokuapp.com/reset-password', data, { withCredentials: true })
            .then(async (response) => {
                setPassword("")
                setRepeatPassword("")
                setError(false)
                setMessage(response.data.msg)
            })
            .catch(err => {
                setError(true)
                setMessage(err.response.data.msg)
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h3">
                    Enter Your New Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={sendRequest}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="repeat_password"
                        label="Repeat Password"
                        type="password"
                        id="new_password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>

                </form>
            </div>
            {(error && message) &&
                <Alert severity="error">{message}</Alert>
            }
            {(!error && message) &&
                <Alert severity="success">{message}</Alert>
            }
        </Container>
    );
}

export default ResetPassword

