import React from 'react';
import { useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import UsuariosForm from './_form.js';
const styles = (theme) => ({});

function Usuarios(props) {
  const [data, setData] = useState({
    api: 'http://localhost:5000/customers',
    resourceData: {},
    storeUrlMethod: 'POST',
    masterService: [],
    arrayText: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);
  return (
    <Grid>
      <UsuariosForm handleClose={props.handleClose} search={props.search} data={data} />
    </Grid>
  );
}
export default withStyles(styles, { withTheme: true })(Usuarios);
