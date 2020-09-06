import React from "react";
import {
  Fab,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  TextField,
  Button,
} from "@material-ui/core";
import { Add as AddIcon, Add } from "@material-ui/icons";
import axios from "axios";

import "../styles/App.css";

import StudyMaterialInfo from "./studyMaterialInfo";

export default class StudyMaterial extends React.Component {
  // View for updating Student List for a particular class
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      auth_config: {},
      class_id: props.class_id,
      study_materials: [],
      detail: "",
      topic: "",
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
      auth_config: config,
    });
    axios
      .get(
        `/api/classroom/study_material/?class_id=${this.state.class_id}`,
        config
      )
      .then((response) => {
        console.log(response);
        const data = response.data;
        this.setState({
          study_materials: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.setState({
        class_id: this.props.class_id,
      });
    }
  }
  openForm = () => {
    this.setState({
      form: !this.state.form,
    });
  };

  onFormClose = () => {
    this.setState({
      form: false,
    });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  removeStudyMaterial = (event) => {};

  submitMaterial = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/classroom/study_material/",
        {
          detail: this.state.detail,
          topic: this.state.topic,
          class_id: this.state.class_id,
        },
        this.state.auth_config
      )
      .then((response) => {
        console.log(response);
        this.setState({
          study_materials: [...this.state.study_materials, response.data],
          detail: '',
          topic: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.students);
    const form = (
      <div
        style={{
          width: "100%",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          name="topic"
          label="Study Topic"
          onChange={this.onChange}
          value={this.state.topic}
          style={{ margin: 10, width: "30vw" }}
        />
        <TextareaAutosize
          name="detail"
          label="detail"
          onChange={this.onChange}
          value={this.state.detail}
          style={{ margin: 10, width: "30vw", minHeight: "20vh" }}
        />
        <Button variant="contained" onClick={this.submitMaterial}>
          Post study material
        </Button>
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
          {this.state.study_materials.map((study_material) => {
            return (
              <Grid key={study_material.id} item>
                <StudyMaterialInfo
                  data={study_material}
                  removeStudyMaterial={this.removeStudyMaterial} // Ability to remove study material
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
