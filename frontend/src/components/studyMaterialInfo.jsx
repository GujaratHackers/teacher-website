import React from "react";
import { Paper, Typography } from "@material-ui/core";

export default function QuestionView(props) {
  const { data } = props;
  return (
    <Paper
      elevation={0}
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
      <Typography style={textStyle} variant="h5"> Study Material: {data.topic} </Typography>
      <Typography style={textStyle}variant="h6">Details</Typography>
      <Typography style={textStyle}>
        {data.detail}
      </Typography>
      
    </Paper>
  );
}
const textStyle = {
    textAlign: "center"
}