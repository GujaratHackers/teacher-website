import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';
import { Drawer, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const {name} = props;
  const classes = useStyles();
  const [redirect, changeRedirect] = React.useState(false);
  const [draw, changeDraw] = React.useState(false);

  const logout = () => {
      localStorage.removeItem('auth_token');
      changeRedirect(true);
  }

  const onOption = () => {
      changeDraw(true);
  }

  const onCloseDraw = () => {
      changeDraw(false);
  }

  const username = localStorage.getItem('user');
  if(redirect) return <Redirect to='/login'/>
  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={onOption}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {name}
          </Typography>
          <Typography edge="end" variant="p">
              User: {username}
          </Typography>
          <Button color="inherit" contained onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
