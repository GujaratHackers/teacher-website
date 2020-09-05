import React from "react";
import axios from "axios";

import { Fab, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

import QuizInfo from "./quiz";
import QuizForm from "./quizForm";

export default class QuizList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class_id: props.class_id,
      quiz_list: [],
      auth_config: {},
      form: false,
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
      .get(`/api/classroom/quiz/?class_id=${this.state.class_id}`, config)
      .then((response) => {
        console.log(response);
        this.setState({ quiz_list: response.data });
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
  onFormClose = () => {
    this.setState({
      form: false,
    });
  };

  addQuiz = (name, question_list) => {
    this.setState({
        form: false
    });
    console.log(name, question_list);
    axios.post("/api/classroom/quiz/", {
        "name": name,
        "class_id": this.state.class_id,
        "question_list": question_list.map(question => question.detail),
        "questions": [] // A nice hack for my ineptitude : ()
    }, this.state.auth_config).then(response => {
        console.log("Quiz successfully created");
        this.setState({
            quiz_list: [...this.state.quiz_list, response.data]
        })
    }).catch(error => {
        console.log("Some error occurred");
    })
}

  render() {
    return (
      <div>
        <QuizForm
          open={this.state.form}
          onClose={this.onFormClose}
          onSubmit={this.addQuiz}
        />
        <Grid
          container
          direction="row"
          justify="start"
          alignItems="space-around"
          className="classList"
        >
          {this.state.quiz_list.map((quiz) => {
            return (
              <Grid item>
                <QuizInfo quiz={quiz} />
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
    position: 'fixed'
}
