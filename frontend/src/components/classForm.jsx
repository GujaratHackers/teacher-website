import React from "react";
import { Dialog, DialogTitle, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function ClassForm(props) {
  const { open, onClose } = props;

  const classes = useStyles();
  const [name, changeName] = React.useState("");

  const onNameChange = (event) => {
    changeName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(name);
  };

  return (
    <Dialog onClose={onClose} className={classes.dialog} open={open}>
      <DialogTitle id="simple-dialog-title">Create a new class</DialogTitle>
      <form>
        <TextField
          id="outlined-basic"
          className={classes.element}
          value={name}
          onChange={onNameChange}
          label="Name"
          fullWidth
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.element}
          onClick={onSubmit}
        >
          Create
        </Button>
      </form>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  element: {
    margin: "2px",
  },
}));
