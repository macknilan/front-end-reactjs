import React from 'react';
import { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import * as Util from '../../components/utils';
import Snackbar from '@material-ui/core/Snackbar';

const styles = (theme) => ({
  loginBackground: {
    height: '50vh',
    background: theme.palette.primary.main
  },
  login: {
    transform: 'translateY(-50%)'
  },
  loginContent: {
    position: 'relative',
    padding: '2.5rem',
    paddingTop: '1.75rem'
  },
  loginInput: {
    width: '100%'
  },
  loginLogo: {
    textAlign: 'center',
    margin: 0,
    color: theme.palette.primary.main
  },
  alert: {
    color: theme.palette.secondary.main,
    margin: 0,
    marginTop: '0.5rem',
    fontSize: '1em',
    fontWeight: '100'
  },
  btnLogin: {
    fontSize: '0.75em',
    marginTop: '1rem'
  },
  title: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    margin: 0,
    marginTop: '-0.25rem',
    textTransform: 'uppercase',
    fontSize: '0.8em'
  },
  subtitle: {
    fontSize: '1em',
    fontWeight: '100',
    textAlign: 'center',
    marginTop: '0',
    marginBottom: '0'
  },
  forgotPass: {
    fontWeight: '100',
    fontSize: '0.825rem',
    margin: 0,
    marginTop: '1rem',
    marginBottom: '0.5rem',
    color: theme.palette.primary.dark + ' !important'
  }
});

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [message, setMessage] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(false);
  const login=()=>{
    const dataString = Util.stateToQueryString({
        "usuario": username,
        "contrasena": password
    });
    fetch('http://localhost:5000/usuarios/login/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: dataString
      })
    .then(data => data.json())
    .then(
        (result) => {
            if(result){
                sessionStorage.setItem('token', JSON.stringify(true))
                window.location.replace('')
            }else{
                sessionStorage.setItem('token', JSON.stringify(false))
                setMensaje('Usuario o contraseña son invalidos')
                setAlerta(true);
                window.location.replace('')
            }
        })
  }

  useEffect(() => {
  }, []);
  const handleCloseMsg = () => {
    setAlerta(false);
  };
  const { classes, theme } = props;

  return (
    <div>
      <div className={classes.loginBackground}>&nbsp;</div>
      <Grid className={classes.login} container alignContent="center" justify="center">
        <Grid item xs style={{ width: '100%', maxWidth: '400px' }}>
            <Paper className={classes.loginContent} elevation={8}>
              <Grid container>
                <Grid item xs={12}>
                  <p className={classes.loginLogo}>
                  </p>
                  <p className={classes.subtitle}>
                    {'Iniciar session'}
                  </p>
                </Grid>
              </Grid>
              {message == '' ? null : (
                <Grid container>
                  <Grid item xs={12}>
                    <p className={classes.alert}>{message}</p>
                  </Grid>
                </Grid>
              )}
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    autoFocus={true}
                    id="username"
                    label={'Usuario'}
                    className={classes.loginInput}
                    value=""
                    margin="normal"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    value={username}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label={'Contraseña'}
                    className={classes.loginInput}
                    margin="normal"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                  <Button
                    className={classes.btnLogin}
                    onClick={()=>{
                        login()
                    }}
                    disabled={loginDisabled}
                    color="secondary"
                    variant="contained"
                    fullWidth={true}
                    size="large">
                    {loginDisabled ? (
                      <CircularProgress color="secondary" size={24} thickness={4} />
                    ) : (
                      'continue'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
        </Grid>
      </Grid>
        <Snackbar
            open={alerta}
            autoHideDuration={4000}
            onClose={handleCloseMsg}
            message={mensaje}
            key={'top' + 'center'}
        />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Login);
