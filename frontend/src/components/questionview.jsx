import React from "react";
import { Paper, Typography } from "@material-ui/core";

export default function QuestionView(props) {
  const { quiz, questions } = props;
  return (
    <Paper
      elevation={3}
      style={{
        width: "50vw",
        marginRight: 50,
        marginLeft: 50,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        background: '#d0c8b0'
      }}
    >
      <Typography style={textStyle} variant="h5">{quiz.name} quiz</Typography>
      <Typography style={textStyle}variant="h6">The questions are</Typography>
      {questions.map((question, index) => {
          return <Typography style={textStyle}>
              {index+1}. {question.detail} ? 
          </Typography>
      })}
    </Paper>
  );
}
const textStyle = {
    textAlign: "center"
}