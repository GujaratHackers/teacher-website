import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";

export default class StudentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.student_id,
      name: "",
      phone_number: "",
      standard: "",
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
    axios
      .get(`/api/classroom/student/${this.state.id}/`, config)
      .then((response) => {
        const data = response.data;
        this.setState({
          name: data["name"],
          phone_number: data["phone_number"],
          standard: data["standard"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { id, name, phone_number, standard } = this.state;
    return (
      <div
        elevation={1}
        style={{
          width: "60vw",
          margin: 10,
          padding: "10px",
          minWidth: "320px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderBottom: "1px grey solid",
        }}
      >
        <div
          style={{
            width: "50vw",
            padding: "10px",
            minWidth: "300px",
            display: 'flex',
            justifyContent: "space-around"
          }}
        >
          <Typography color="textPrimary" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary">
            Phone: {phone_number} 
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {standard}
          </Typography>
        </div>
        <DeleteIcon color="secondary" onClick={() => this.props.removeStudent(id)} />
      </div>
    );
  }
}
