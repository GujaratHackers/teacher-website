import React from "react";
import { Fab } from "@material-ui/core";
import {Add as AddIcon} from "@material-ui/icons";

export default class StudentList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      form: false,
    };
  }

  render() {
    console.log("reached here");
    return <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>;
  }
}
