import React from "react";
import { Fab, Grid, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Add as AddIcon, Add } from "@material-ui/icons";
import axios from "axios";

import "../styles/App.css";
import StudentForm from "./studentForm";
import StudentInfo from "./studentInfo";

export default class UpdateStudentList extends React.Component {
  // View for updating Student List for a particular class
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      students: props.students,
      auth_config: {},
      class_id: props.class_id,
      all_students: [],
      student_id: -1,
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
    this.setState({
        auth_config: config
    })
    axios
      .get(`/api/classroom/class/${this.state.class_id}/`, config)
      .then((response) => {
        console.log(response);
        const data = response.data;
        this.setState({
          class_name: data["name"],
          students: data["students"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get("/api/classroom/student/", config).then((response) => {
      console.log(response);
      this.setState({
        all_students: response.data.filter((student) => student.name),
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.students != prevProps.students ||
      this.props.class_id != prevProps.class_id
    ) {
      this.setState({
        students: this.props.students,
        class_id: this.props.class_id,
      });
    }
  }
  openForm = () => {
    this.setState({
      form: !this.state.form,
    });
  };

  addStudent = () => {
    this.setState({
      form: false,
    });
    axios
      .post(
        `/api/classroom/class/${this.state.class_id}/add_student/`,
        {
          student_id: this.state.student_id,
          class_id: this.state.class_id
        },
        this.state.auth_config
      )
      .then((response) => {
        console.log("Student successfully added");
        this.setState({
          students: response.data.students,
          student_id: -1
        });
      })
      .catch((error) => {
        console.log("Some error occurred");
      });
  };

  removeStudent = (id) => {
    this.setState({
      form: false,
    });
    axios
      .post(
        `/api/classroom/class/${this.state.class_id}/remove_student/`,
        {
          student_id: id,
          class_id: this.state.class_id,
        },
        this.state.auth_config
      )
      .then((response) => {
        console.log("Student successfully removed");
        this.setState({
          students: response.data.students // Store only the additional id here
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

  handleChange = (event) => {
    this.setState({
      student_id: event.target.value,
    });
  };
  render() {
    console.log(this.state.students);
    const form = (
      <div style={{width: '100%', padding:20, display:'flex', justifyContent:'space-around', alignItems: 'center'}}>
        <InputLabel id="demo-simple-select-label">Add students</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.student_id}
          onChange={this.handleChange}
          style={{width: '80%'}}    
        >
          {this.state.all_students.map((student) => {
            return <MenuItem value={student.id}>{student.name}</MenuItem>;
          })}
        </Select>
        <AddIcon onClick={this.addStudent}/>
        
      </div>
    );

    return (
      <div className="studentList">
        {form}
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          {this.state.students.map((student_id) => {
            return (
              <Grid key={student_id} item>
                <StudentInfo
                  student_id={student_id}
                  removeStudent={this.removeStudent}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const fabStyle = {
  right: 40,
  bottom: 40,
  position: "fixed",
};
