import React from "react";
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper, AppBar } from "@material-ui/core";

import '../styles/App.css';
import { Redirect } from "react-router-dom";
import Header from './header';

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      loading: true,
    };
  }

  componentDidMount() {
    const auth_token = localStorage.getItem("auth_token")
    if (auth_token) {
        console.log(response);
            localStorage.setItem("user", response.data.user.username);
            this.setState({
                loading: false,
                authenticated: true
            });
    }
    else {
        this.setState({
            loading: false,
            authenticated: false
        })
    }
  }

  render() {
    let match = useRouteMatch();
    if (this.state.loading) {
      return (
        <div className="loaderBody">
          <CircularProgress />
        </div>
      );
    }
    else if(!this.loading && !this.state.authenticated) { // If not authenticated, return to the login page
        return <Redirect to='/login'/>
    } else  {
        return <div className="mainBody">
            <Header/>
            <Switch>
                <Route path={`${match.url}/students`}>

                </Route>
                                <Route path={`${match.url}/students`}>
                    
                </Route>
            </Switch>

        </div>
    }
  }
}
