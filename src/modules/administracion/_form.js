import React from 'react';
import { useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as Util from '../../components/utils';
import Snackbar from '@material-ui/core/Snackbar';
import {
  Grid,
  Button,
  TextField,
  Divider,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = (theme) => ({
  root: {
    padding: '1rem',
    marginBottom: '4rem'
  },
  fixed: {
    textAlign: 'right',
    background: 'white'
  }
});
function Form(props) {
    const [data, setData] = useState(props.data);
    const [name, setName] = useState(data.resourceData.Nombre != '' ? data.resourceData.Nombre : '');
    const [contrasena, setContrasena] = useState(data.resourceData.Contrasena != '' ? data.resourceData.Contrasena : '');
    const [status, setStatus] = useState(data.resourceData.Status != '' ? data.resourceData.Status : '');

    const classes = useStyles();
    const [mensaje, setMensaje] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
    const handleSubmit = async () => {
        setLoading(true);
        if (name == '' || name == undefined) {
            setMensaje('agregar nombre')
            setAlerta(true);
            setLoading(false);
            return;
        }
        if (contrasena == '' || contrasena == undefined) {
            setMensaje('agregar contraseña')
            setAlerta(true);
            setLoading(false);
            return;
        }
        if (status == '' || status == undefined) {
            setMensaje('agregar status')
            setAlerta(true);
            setLoading(false);
            return;
        }
        const dataString = Util.stateToQueryString({
            "nombre": name,
            "contrasena": contrasena,
            "status": status,
            "usuario_creacion":'vtolentino',
            "usuario_modificacion": 'vtolentino'
        });
        try {
            const datas =await new Promise((resolve, reject) => {
            fetch(data.api,
            {
                method: data.storeUrlMethod,
                headers: {
                'Content-Type':'application/x-www-form-urlencoded'
                },
                body: dataString
            }
            )
            .then((res) => res)
            .then(
                (result) => {
                  setName('')
                  setContrasena('')
                  setStatus('')
                  setMensaje('Se aguardo el registro')
                  setAlerta(true);
                  setLoading(false);
                  handleClosess();
                  handlesearch();
                },
                (error) => {
                  setMensaje('error al aguardar el registro'+error)
                  setAlerta(true);
                  setLoading(false);
                }
            )});
    } catch (err) {}
    
 };
  const handleClosess = () => {
    props.handleClose();
  }
  const handlesearch = () => {
    props.search();
  }
  const handleCloseMsg = () => {
    setAlerta(false);
  };
  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="name"
                fullWidth
                label={'Nombre*'}
                value={name || ''}
                onChange={(event, value) => setName(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="iata"
                fullWidth
                label={'Contraseña*'}
                value={contrasena || ''}
                onChange={(event, value) => setContrasena(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="status"
                fullWidth
                label={'Estado*'}
                value={status || ''}
                onChange={(event, value) => setStatus(event.target.value)}
                variant="outlined"
              />
            </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={classes.fixed}>
                            <Button style={{ marginRight: '1rem' }} onClick={handleClosess}>
                            {'Cancelar'}
                            </Button>
                            <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            variant="contained"
                            color="secondary">
                            {'Guardar'}
                            {loading && (
                                <CircularProgress
                                color="secondary"
                                size={16}
                                thickness={4}
                                style={{ marginLeft: '0.25rem' }}
                                />
                            )}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>  
        </Grid>
      </Grid>
      <Snackbar
        open={alerta}
        autoHideDuration={4000}
        onClose={handleCloseMsg}
        message={mensaje}
        key={'top' + 'center'}
      />
    </form>
  );
}
export default withStyles( { withTheme: true })(Form);
