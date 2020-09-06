import React from "react";
import axios from "axios";
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";

import QuestionView from "./questionview";
import Answersheet from "./answersheet";

export default class ExploreQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      quiz: {},
      questions: [],
      answersheets: [],
      //   class_name: "",
      //   students: [],
      //   quizzes: [],
      //   value: 0
    };
  }

  componentDidMount() {
    const quiz_id = this.props.match.params.id;
    const auth_token = localStorage.getItem("auth_token");
    let config = {};
    if (auth_token) {
      config = {
        headers: {
          Authorization: `Token ${auth_token}`,
        },
      };
    }
    axios
      .get(`/api/classroom/quiz/?quiz_id=${quiz_id}`, config)
      .then((response) => {
        console.log(response);
        const data = response.data[0];
        this.setState({
          // set the quiz information, questions in the quiz, and the answersheets in them
          quiz: data,
          questions: data["questions"],
          answersheets: data["answersheets"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    // There will be a route here
    return (
      <>
        <div
          style={{
            width: "100%",
            padding: 20,
            display: "flex",
            flexDirection:"column",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <QuestionView
            quiz={this.state.quiz}
            questions={this.state.questions}
          />
          {this.state.answersheets.length == 0 && <Typography>No submissions yet : O</Typography>}
          {this.state.answersheets.map((answersheet) => <Answersheet answersheet={answersheet}/>)}
        </div>
      </>
    );
  }
}
