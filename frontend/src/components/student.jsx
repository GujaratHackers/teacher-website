import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

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
  },
  pos: {
    marginBottom: 12,
  },
});

export default function StudentInfo(props) {
  const classes = useStyles();
  const { id, name, phone_number, standard } = props.student;

  return (
    <Paper
      elevation={3}
      style={{
        width: "60vw",
        margin: 10,
        padding: "10px",
        minWidth: "320px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50vw",
          padding: "10px",
          minWidth: "300px",
        }}
      >
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Name {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ( Contact Number {phone_number} )
        </Typography>
        <Typography variant="body2" component="textSecondary">
          Studying in {standard}
        </Typography>
      </div>
        <DeleteIcon color="secondary"/>
    </Paper>
  );
}

// export default function StudentInfo() {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardContent>
// <Typography className={classes.title} color="textSecondary" gutterBottom>
//   Word of the Day
// </Typography>
// <Typography className={classes.pos} color="textSecondary">
//   adjective
// </Typography>
// <Typography variant="body2" component="p">
//   well meaning and kindly.
//   <br />
//   {'"a benevolent smile"'}
// </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }
