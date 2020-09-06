import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    borderBottom: "1px grey solid",
  },
  pos: {
    marginBottom: 12,
  },
});

export const AddQuestion = (props) => {
  const { addQuestion, removeQuestion, question_list } = props;
  const [question, changeQuestion] = React.useState("");

  const onDetailChange = (event) => {
    const detail = event.target.value;
    changeQuestion(detail);
  };

  const classes = useStyles();
  return (
    <>
      {question_list.map(({ detail, index }) => {
        // Destructure the question data
        return (
          <Question
            key={index}
            index={index}
            detail={detail}
            onDelete={removeQuestion}
          />
        );
      })}
      <form
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          className={classes.element}
          value={question}
          onChange={onDetailChange}
          label="Question"
          fullWidth
          //   variant="outlined"
        />
        <Add
          onClick={() => {
            addQuestion(question);
            changeQuestion("");
          }}
        />
      </form>
    </>
  );
};

export default function Question(props) {
  const classes = useStyles();
  const { index, detail } = props;
  const { onDelete } = props;

  return (
    <Paper
      elevation={0}
      style={{
        margin: 10,
        padding: "10px",
        minWidth: "300px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div style={{ width: "90%" }}>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {index+1}. {detail}
        </Typography>
      </div>
      <DeleteIcon
        style={{ width: "10%" }}
        onClick={() => onDelete(index)}
        color="secondary"
      />
    </Paper>
  );
}
