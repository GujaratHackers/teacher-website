import React from "react";
import { Fab, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import axios from 'axios';

import "../styles/App.css";
import ClassForm from "./classForm";
import ClassInfo from "./class";

import QuizForm from "./quizForm";

export default class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      classes: [],
      auth_config: {}
    };
  }

  componentDidMount() {
    const auth_token = localStorage.getItem("auth_token");
    let config = {};

    if (auth_token) {
        config = {
            headers:{ 
                "Authorization": `Token ${auth_token}`
            }
        }   
    }

    this.setState({auth_config: config});
    axios.get("/api/classroom/class/", config).then(response => {
        console.log(response);
        this.setState({classes: response.data})
    }).catch(error => {
        console.log(error);
    });

  }

  openForm = () => {
      this.setState({
          form: !this.state.form
      });

  }

  addClass = (name) => {
      this.setState({
          form: false
      });
      axios.post("/api/classroom/class/", {
          "name": name,
      }, this.state.auth_config).then(response => {
          console.log("Class successfully created");
          this.setState({
              classes: [...this.state.classes, response.data]
          })
      }).catch(error => {
          console.log("Some error occurred");
      })
  }

  onFormClose = () => {
    this.setState({
        form: false
    })
  }

  render() {
    console.log(this.state.classes);
    const form = <div></div>;

    return (
      <div className="classList">
        <ClassForm open={this.state.form} onClose={this.onFormClose} onSubmit={this.addClass}/>
        <Grid container direction="row" justify="start" alignItems="space-around" className="classList">
            {this.state.classes.map(class_detail => {
                return (<Grid item>
                    <ClassInfo class_detail={class_detail}/>
                    </Grid>)
            })}

        </Grid>
        <Fab color="primary" aria-label="add" style={fabStyle}>
          <AddIcon onClick={this.openForm}/>
        </Fab>
      </div>
    );
  }
}

const fabStyle = {
    right: 40,
    bottom: 40,
    position: 'fixed'
}
