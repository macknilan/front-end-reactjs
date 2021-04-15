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
    const [name, setName] = useState(data.resourceData.name != '' ? data.resourceData.name : '');
    const [last_name, setLast_Name] = useState(data.resourceData.last_name != '' ? data.resourceData.last_name : '');
    const [phone, setPhone] = useState(data.resourceData.phone_number != '' ? data.resourceData.phone_number : '');
    const [email, setEmail] = useState(data.resourceData.email != '' ? data.resourceData.email : '');
    const [city, setCity] = useState(data.resourceData.address!=undefined ? data.resourceData.address.city : '');
    const [state, setState] = useState(data.resourceData.address!=undefined ? data.resourceData.address.state : '');
    const [line1, setLine1] = useState(data.resourceData.address!=undefined ? data.resourceData.address.line1 : '');
    const [line2, setLine2] = useState(data.resourceData.address!=undefined ? data.resourceData.address.line2 : '');
    const [postal_code, setPostal_code] = useState(data.resourceData.address!=undefined  ? data.resourceData.address.postal_code : '');
    const [country_code, setCountry_code] = useState(data.resourceData.address!=undefined ? data.resourceData.address.country_code : '');
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
        if (last_name == '' || last_name == undefined) {
            setMensaje('agregar last_name')
            setAlerta(true);
            setLoading(false);
            return;
        }
        if (email == '' || email == undefined) {
            setMensaje('agregar email')
            setAlerta(true);
            setLoading(false);
            return;
        }
        const dataString = Util.stateToQueryString({
            "name": name,
            "email": email,
            "last_name": last_name,
            "city": city,
            "state": state,
            "line1": line1,
            "line2": line2,
            "postal_code": postal_code,
            "country_code": country_code,
            "phone_number": phone
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
            .then((res) => res.json())
            .then(
                (result) => {
                    if('error_code' in result){
                        setMensaje('Error de consulta '+result.description)
                        setAlerta(true);
                        setLoading(false);
                    }else{
                        setLoading(false);
                        handleClosess();
                        handlesearch();
                    }
                },
                (error) => {}
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
                label={'Name*'}
                value={name || ''}
                onChange={(event, value) => setName(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="iata"
                fullWidth
                label={'Last-name*'}
                value={last_name || ''}
                onChange={(event, value) => setLast_Name(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'Email*'}
                value={email || ''}
                onChange={(event, value) => setEmail(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'phone'}
                value={phone || ''}
                onChange={(event, value) => setPhone(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'city'}
                value={city || ''}
                onChange={(event, value) => setCity(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'state'}
                value={state || ''}
                onChange={(event, value) => setState(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'line1'}
                value={line1 || ''}
                onChange={(event, value) => setLine1(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'line2'}
                value={line2 || ''}
                onChange={(event, value) => setLine2(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'postal_code'}
                value={postal_code || ''}
                onChange={(event, value) => setPostal_code(event.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="icao"
                fullWidth
                label={'country_code'}
                value={country_code || ''}
                onChange={(event, value) => setCountry_code(event.target.value)}
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
