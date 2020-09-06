import React from "react";
import axios from 'axios';
import { AppBar, Tabs, Tab } from "@material-ui/core";

import UpdateStudentList from './updateStudentList';
import QuizList from './quizList';
import StudyMaterial from './studyMaterial';

export default class ExploreClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      class_name: "",
      students: [],
      quizzes: [],
      value: 0
    };
  }

  componentDidMount() {
    const class_id = this.props.match.params.id;
    const auth_token = localStorage.getItem("auth_token");
    let config = {};
    if (auth_token) {
        config = {
            headers:{ 
                "Authorization": `Token ${auth_token}`
            }
        }
    }
    axios.get(`/api/classroom/class/${class_id}/`, config).then(response => {
        console.log(response);
        const data = response.data;
        this.setState({
            class_name: data["name"],
            students: data["students"],
        })
    }).catch(error => {
        console.log(error);
    })
  }

  handleChange = (event, newValue) => {
    this.setState({
        value: newValue
    })
  }

  render() {
    // There will be a route here
    return (
       <>
        <AppBar position="static"variant="fullWidth" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="simple tabs example"
            centered
            
          >
            <Tab label="Attendees" />
            <Tab label="Quizzes" />
            <Tab label="Upload files" />
          </Tabs>
        </AppBar>
        <div className="class">
            {
                this.state.value == 0 && <UpdateStudentList class_id={this.state.id} students={this.state.students}/>
            }
            {
                this.state.value == 1 && <QuizList class_id={this.state.id}/>
            }
            {
                this.state.value == 2 && <StudyMaterial class_id={this.state.id}/>
            }
        </div>
      </>
    );
  }
}
