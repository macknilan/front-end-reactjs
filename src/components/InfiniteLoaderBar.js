import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    marginBottom: '0.5rem'
  },
  progress: {
    flexGrow: 1,
    textAlign: 'center',
    alignSelf: 'center'
  }
});

class InfiniteLoaderBar extends React.Component {
  render() {
    const { classes, message } = this.props;

    return this.props.show ? (
      <div className={classes.progress}>
        <LinearProgress className={classes.root} color="secondary" />
        {message !== undefined && (
          <Typography color="secondary" variant="h3">
            {message}
          </Typography>
        )}
      </div>
    ) : (
      ''
    );
  }
}

export default withStyles(styles, { withTheme: true })(InfiniteLoaderBar);
