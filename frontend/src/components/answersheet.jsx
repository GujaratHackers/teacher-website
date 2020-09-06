import React from "react";
import { Paper, Typography, Dialog, DialogContent, DialogTitle } from "@material-ui/core";

export default function Answersheet(props) {
  const sheet = props.answersheet;
  const [open, changeOpen] = React.useState(false);
  const { student, answers } = sheet;

  const handleOpen = (event) => {
    event.preventDefault();
    changeOpen(true);
  };

  const handleClose = (event) => {
      event.preventDefault();
      changeOpen(false); // CLose the dialog
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle style={{ borderBottom: "1px solid gray" }}id="simple-dialog-title">{student.name}'s submissions</DialogTitle>
        <DialogContent>
            {answers.map((answer, index) => {
                return <Typography>
                    Answer {index+1}: {answer.detail}
                </Typography>
            })}
        </DialogContent>

      </Dialog>
      <div
        style={{
          paddding: 20,
          width: "30vw",
          minWidth: "300px",
          margin: 15,
          height: "30px",
          borderBottom: "2px solid gray",
        }}
        onClick={handleOpen}
      >
        <Typography style={{ textAlign: "center" }}>
          Submission by {student.name} ( {student.standard} )
        </Typography>
      </div>
    </>
  );
}
