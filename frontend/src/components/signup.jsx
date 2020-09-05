import React from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

import Copyright from "./copyright";
import { Redirect } from "react-router-dom";

export default function SignUp(props) {
  const classes = useStyles();
  const [name, changeName] = React.useState("");
  const [password, changePassword] = React.useState("");

  const [redirect, changeRedirect] = React.useState(false);

  const onNameChange = (event) => {
    changeName(event.target.value);
  };

  const onPasswordChange = (event) => {
    changePassword(event.target.value);
  };

  const submitUser = (event) => {
    event.preventDefault();
    axios
      .post("/api/classroom/signup", {
        username: name,
        password: password,
      })
      .then((response) => {
        console.log(response);
        props.toast.changeMessage("Successfully created a teacher!");
        props.toast.changeOpen(true);
        changeRedirect(true);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  if(redirect) {
    return <Redirect to='/login'/>
  }

  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid
        className={classes.loginSection}
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register a new teacher
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="user name"
              autoFocus
              value={name}
              onChange={onNameChange}
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
              autoComplete="current-password"
              value={password}
              onChange={onPasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={submitUser}
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  {"Do you have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(addUser.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginSection: {
    height: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
