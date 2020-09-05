import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Header } from "./header";
import Login from "./login";
import SignUp from "./signup";

import "../styles/App.css";

// const useStyles = makeStyles({
//   helloStyle: {
//     fontStyle: "oblique",
//     color: "pink",
//     fontSize: "30px",
//   },
//   buttonStyle: {
//     color: "white",
//     border: 10,
//   },
// });

const App = () => {
  // const classes = useStyles();
  const [open, changeOpen] = React.useState(false);
  const [message, changeMessage] = React.useState('');
  const [severity, changeSeverity] = React.useState('success');

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp toast={{changeOpen, changeMessage, changeSeverity}}/>
          </Route>
        </Switch>
      </Router>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity={severity}>
        {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
