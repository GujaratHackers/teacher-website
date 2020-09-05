import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Add } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "row",
    height: "90vh",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "20",
  },
  choice: {
    width: "60vw",
    minWidth: "300px",
    height: "30vh",
    //   border: "2px solid gray",
    //   borderRadius: 4,
    margin: 20,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

export default function ChoiceBox() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.choice}>
        <Typography>Add more of your amazing students !!!</Typography>
        <Link to="/students/" style={{ textDecoration: "none" }}>
          <Add fontSize="large" />
        </Link>
      </Paper>

      <Paper className={classes.choice}>
        <Typography>Explore your inspiring classes !!!</Typography>
        <Link to="/classes/" style={{ textDecoration: "none" }}>
          <Add fontSize="large" />
        </Link>
      </Paper>
    </div>
  );
}
