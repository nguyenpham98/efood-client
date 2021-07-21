import React, { useState } from 'react';
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

const ForgotPassword = () => {
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const sendRequest = (e) => {
        e.preventDefault()
        const data = { email }
        axios.post('http://localhost:5000/request-password-reset', data, { withCredentials: true })
            .then(async (response) => {
                setEmail("")
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
                    Forgot Password?
                </Typography>
                <Typography variant="h5">
                    Enter your email address
                </Typography>
                <form className={classes.form} noValidate onSubmit={sendRequest}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send Password Reset Link To Email
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

export default ForgotPassword

