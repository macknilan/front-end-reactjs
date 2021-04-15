import React from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  smallAvatar: {
    cursor: 'pointer',
    margin: '0 auto',
    width: 48,
    height: 48
    //textTransform: 'lowercase',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 4,
    marginRight: 28
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  avatarContainer: {
    paddingTop: 28
  },
  inlineAvatar: {
    display: 'flex'
  },
  colorUserName: {
    color: theme.palette.secondary.main
  },
  contentUserLogged: {
    marginTop: '0.5rem',
    marginBottom: '0rem',
    marginLeft: '0.5rem',
    marginRight: '5rem'
  },
  listItem: {
    fontWeight: '100',
    transition: 'border 0.125s',
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: 'transparent'
    }
  },
  listItemActive: {
    fontWeight: '100',
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent'
  },
  listItemIcon: {
    margin: '0 0.5rem'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto'
  },
}));
class MenuItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: ''
    };
    this.refreshTokenTimer = 0;
  }

  render() {
    const { classes } = this.props;

    return (
      <ListItem
        onClick={this.props.onClick}
        classes={
          this.props.active || this.state.hover
            ? { root: classes.listItemActive }
            : { root: classes.listItem }
        }
        onMouseEnter={() => {
          this.setState({ hover: true });
        }}
        onMouseLeave={() => {
          this.setState({ hover: false });
        }}
        button>
        <ListItemIcon
          className={classes.listItemIcon}
          classes={
            this.props.active || this.state.hover
              ? { root: classes.listItemActive }
              : { root: classes.listItem }
          }>
          {this.props.icon}
        </ListItemIcon>
        <ListItemText
          primary={this.props.item}
          classes={
            this.props.active || this.state.hover
              ? { primary: classes.listItemActive }
              : { primary: classes.listItem }
          }
        />
      </ListItem>
    );
  }
}

const MenuItem = withStyles(useStyles, { withTheme: true })(MenuItemComponent);


export default function ButtonAppBar({props, children }) {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [avatarLetter, setAvatarLetter] = useState('V');
  const [username, setUsername] = useState('Virgilio Tolentino');
  const [title, setTitle] = useState('V');
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const menuMouseOut = () => {
    setOpen(false);
  };
  const menuMouseOver = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
        elevation={0}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: 'flex',
              flexGrow: '1',
              paddingRight: '1.5rem',
              alignItems: 'center'
            }}>
            <IconButton
              key={1}
              onClick={console.log('hola')}
              color="inherit"
              title="Languages">
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
        onMouseLeave={() => menuMouseOut()}
        onMouseEnter={() => menuMouseOver()}
        >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List component="nav" className={classes.avatarContainer}>
          <div
            className={open ? classes.inlineAvatar : classes.onlyAvatar}
            onClick={() => {
              setActiveMenuItem('None');
            }}>
            <Link href="/usuario/index">
              <Avatar
                src={avatarUrl}
                className={open ? classes.avatar : classes.smallAvatar}>
                {avatarLetter}
              </Avatar>
            </Link>
            <div className={open ? classes.contentUserLogged : classes.hide}>
              <Tooltip title={title} placement="right">
                <Typography
                  variant="h6"
                  gutterBottom
                  onClick={() => {
                    setActiveMenuItem('None');
                  }}>
                    <a className={classes.colorUserName}>{username}</a>
                </Typography>
              </Tooltip>
            </div>
          </div>
        </List>
        <Divider />
        <List component="nav" className={classes.avatarContainer}>
            <Link href="/clientes/index">
                <MenuItem
                    item={'Clientes'}
                    onClick={() => {
                        setActiveMenuItem('Clientes');
                    }}
                    active={activeMenuItem == 'Clientes' ? true : false}
                    icon={<FaceIcon />}
                />
            </Link>
            <Link href="/administracion/index">
                <MenuItem
                    item={'Administracion'}
                    onClick={() => {
                        setActiveMenuItem('Administracion');
                    }}
                    active={activeMenuItem == 'Administracion' ? true : false}
                    icon={<BuildIcon />}
                />
            </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
          <div className={classes.toolbar}></div>
            {children}
      </main>
    </div>
  );
}