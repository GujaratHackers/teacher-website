import React from "react";
import { Fab, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import axios from "axios";

import "../styles/App.css";
import StudentForm from "./studentForm";
import StudentInfo from "./student";

export default class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      students: [],
      auth_config: {},
    };
  }

  componentDidMount() {
    const auth_token = localStorage.getItem("auth_token");
    let config = {};

    if (auth_token) {
      config = {
        headers: {
          Authorization: `Token ${auth_token}`,
        },
      };
    }
    this.setState({ auth_config: config });
    axios
      .get("/api/classroom/student/", config)
      .then((response) => {
        console.log(response);
        this.setState({ students: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openForm = () => {
    this.setState({
      form: !this.state.form,
    });
  };

  addStudent = (name, phone_number, standard) => {
    this.setState({
      form: false,
    });
    axios
      .post(
        "/api/classroom/student/",
        {
          name: name,
          phone_number: phone_number,
          standard: standard,
        },
        this.state.auth_config
      )
      .then((response) => {
        console.log("Student successfully created");
        this.setState({
          students: [...this.state.students, response.data],
        });
      })
      .catch((error) => {
        console.log("Some error occurred");
      });
  };

  removeStudent = (id) => {
    axios
      .delete(`/api/classroom/student/${id}/`, this.state.auth_config)
      .then((response) => {
        console.log("Student successfully deleted");
        this.setState({
          students: this.state.students.filter((student) => student.id != id),
        });
      })
      .catch((error) => {
        console.log("Some error occurred");
      });
  };

  onFormClose = () => {
    this.setState({
      form: false,
    });
  };

  render() {
    console.log(this.state.students);
    const form = <div></div>;

    return (
      <div className="studentList">
        <StudentForm
          open={this.state.form}
          onClose={this.onFormClose}
          onSubmit={this.addStudent}
        />
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          {this.state.students.map((student) => {
            return (
              <Grid item>
                <StudentInfo
                  student={student}
                  removeStudent={this.removeStudent}
                />
              </Grid>
            );
          })}
        </Grid>
        <Fab color="primary" aria-label="add" style={fabStyle}>
          <AddIcon onClick={this.openForm} />
        </Fab>
      </div>
    );
  }
}

const fabStyle = {
  right: 40,
  bottom: 40,
  position: "fixed",
};
