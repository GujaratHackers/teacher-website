import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 30
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function QuizInfo(props) {
  console.log(props);
  const classes = useStyles();
  const { quiz } = props;
  return (
    <Link to={`/quizzes/${quiz.id}`} style={{ textDecoration: "none" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {quiz.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Number of students: {quiz.questions.length}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Examine {quiz.name} quiz</Button>
        </CardActions>
      </Card>
    </Link>
  );
}
