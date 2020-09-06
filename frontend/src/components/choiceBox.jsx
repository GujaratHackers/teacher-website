import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Add } from "@material-ui/icons";
import MenuBookIcon from "@material-ui/icons/MenuBook";
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
        <Typography variant="h5">Add more of your amazing students !!!</Typography>
        <Link to="/students/" style={{ textDecoration: "none" }}>
          <Add style={{ fontSize: 80 }} />
        </Link>
      </Paper>

      <Paper className={classes.choice}>
        <Typography variant="h5">Explore your inspiring classes !!!</Typography>
        <Link to="/classes/" style={{ textDecoration: "none" }}>
          <MenuBookIcon style={{ fontSize: 80 }} />
        </Link>
      </Paper>
    </div>
  );
}
