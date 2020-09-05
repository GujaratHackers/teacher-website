import React from "react";
import { Dialog, DialogTitle, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DialogContent } from "@material-ui/core";

import {AddQuestion} from "./addQuestion";


export default function QuizForm(props) { // Submits the name of the quiz and the question list to the quiz list component
  const { open, onClose } = props;

  const classes = useStyles();
  const [name, changeName] = React.useState("");
  const [question_list, changeQuestionList] = React.useState([]);
  const onNameChange = (event) => {
    changeName(event.target.value);
  };

  const onSubmit = (event) => { // Submits the name of the quiz and the question list
    event.preventDefault();
    props.onSubmit(name, question_list);
    changeQuestionList([]);
    changeName("");
  };


  console.log(question_list)
  const addQuestion = (detail) => {
    changeQuestionList([
      ...question_list,
      { index: question_list.length, detail: detail },
    ]);
  };
  const removeQuestion = (key) => {
    const new_question_list = question_list.filter(
      (value, index) => key != index
    );
    changeQuestionList(new_question_list);
  };

  return (
    <Dialog maxWidth="md" fullWidth="md" onClose={onClose} className={classes.dialog} open={open}>
      <DialogTitle id="simple-dialog-title">Create a new quiz</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            id="outlined-basic"
            className={classes.element}
            value={name}
            onChange={onNameChange}
            label="Name of the quiz (short and sweet !)"
            fullWidth
              variant="outlined"
          />
          {/* <AddQuestion onFinal={onFinal}/> */}
          <AddQuestion addQuestion={addQuestion} removeQuestion={removeQuestion} question_list={question_list}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.element}
            onClick={onSubmit}
          >
            Set quiz
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  element: {
    margin: "2px",
  },
}));
