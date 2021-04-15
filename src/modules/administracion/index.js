import React from 'react';
import { useState, useEffect, useContext, Fragment } from 'react';
import Axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import InfiniteLoaderBar from '../../components/InfiniteLoaderBar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import New from './new';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import {
  Grid,
  Dialog,
  DialogContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import Edit from './edit';

const useStyles = makeStyles((theme) => ({
    
}));

export default function Clientes(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idEdit, setidEdit] = useState({});
  const classes = useStyles();
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [openModal, setopenModal] = useState(false);
  useEffect(() => {
    search();
  }, []);
  const ChangeRouter = (id) => {
    setidEdit(id);
    setopenModal(true);
  };
  function agregar(){
    setopenModal(true);
    setidEdit({});
  }  
  const handleCloseMsg = () => {
    setAlerta(false);
  };
  const handleClose = () => {
    setopenModal(false);
    setidEdit({})
  };
  const search = async () => {
    setLoading(true);
    try {
      const datas =await new Promise((resolve, reject) => {
      fetch(`http://localhost:5000/usuarios`,
        {
          method: 'GET',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
              if (Object.keys(result).length != 0) {
                setData(result);                
                setLoading(false);
                return [];
              } else {
                setData({});
                setLoading(false);
              };
          },
          (error) => {}
        )});
        setData(datas)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid item xs={12} style={{textAlign:'center'}}>
       {loading &&
          <Grid item xs={12}>
            <div style={{ textAlign: 'center', padding: '1rem 0 0' }}>
              <InfiniteLoaderBar show={loading} />
              <Typography color="secondary" variant="h3">
                {'Cargando'}
              </Typography>
            </div>
          </Grid>
      }
      {
        Object.keys(data).length>0 &&
        <Fragment>
          <Grid container spacing={2}>
            {data.map((resource) => {
                return (
                  <Grid
                    style={{ display: 'grid', maxWidth: '20%' }}
                    key={resource.id}
                    item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Grid
                      container
                      spacing={1}
                      className={classes.card}
                      style={{ background: '#f0f0f0' }}>
                      <Grid item xs={12}>
                        <Typography className={classes.subtitle}>{
                        'Usuario: '+resource.Nombre
                        }</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={classes.subtitle}>{' Contraseña: '+resource.Contrasena}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justify="flex-end">
                          <Grid item>
                            <IconButton
                              disabled={loading}
                              title={'Editar'}
                              size="small"
                              color="secondary"
                              onClick={() => ChangeRouter(resource)}>
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 99999 }}>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Fab disabled={loading} color="primary" onClick={()=>agregar()}>
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </div>
          </Grid>
          <Dialog fullWidth maxWidth="sm" open={openModal} onClose={handleClose}>
            <form>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              {'Nuevo Cliente'}
            </DialogTitle>
              <DialogContent>
                <Grid container>
                  {
                    Object.keys(idEdit).length!=0?
                    <Edit id={idEdit} handleClose={handleClose} search={search} />
                    :<New handleClose={handleClose} search={search} />
                  }
                  
                </Grid>
              </DialogContent>
            </form>
          </Dialog>
        </Fragment>
        
      }
      <Snackbar
        open={alerta}
        autoHideDuration={4000}
        onClose={handleCloseMsg}
        message={mensaje}
        key={'top' + 'center'}
      />
    </Grid>
  );
}