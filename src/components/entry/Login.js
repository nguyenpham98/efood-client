import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../UserContext'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const Login = () => {
    const classes = useStyles()
    let history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const user = useContext(UserContext)

    const loginUser = (e) => {
        e.preventDefault()
        const data = {email, password}
        axios.post('http://localhost:5000/login', data, {withCredentials: true})
        .then(async (response) => {
            
            await user.setFirstName(response.data.firstName)
            await user.setEmail(response.data.email)
            await user.setOrderHistory(response.data.orderHistory)
            setEmail("")
            setPassword("")
            setError(false)
            setMessage("")
            history.push('/')
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
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={loginUser}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" onClick={()=>history.push('/forgot-password')}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" onClick={()=> history.push('/signup')}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {(message ) &&
                <Alert severity="error" style={{marginTop: '20px'}}>
                    {message}
                </Alert>
            }
            
        </Container>
    );
}

export default Login

