import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import LoginForm from './components/LoginForm'
import Upload from './components/Upload'
import Files from './components/Files'
import Logout from './components/Logout'
import Registration from "./components/Registration"
import { Route, BrowserRouter as Router, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { persistUser } from './actions'
import WebcamCapture from './components/WebcamCapture';
import withAuth from './hoc/withAuth'



class App extends Component {
  componentDidMount() {
    if (localStorage.token !== undefined){
      this.parseJwt(localStorage.token)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (localStorage.token !== undefined){
      this.parseJwt(localStorage.token)
    }   
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    let decodedPayload = JSON.parse(window.atob(base64Url))
    this.props.persistUser(decodedPayload)
  };

  render() {
    const AuthedFiles = withAuth(Files);
    const AuthedWebcamCapture = withAuth(WebcamCapture);
    const AuthedUpload = withAuth(Upload);
    return (
      <Router>
        <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/home" component={Homepage} />   
          <Route exact path="/upload" component={(props) => <AuthedUpload {...props} />} />
          <Route exact path="/files" component={(props) => <AuthedFiles {...props} />} />
          <Route exact path="/home" component={(props) => <Logout {...props} />} />
          <Route exact path="/capture" component={(props) => <AuthedWebcamCapture {...props} />} />
          <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
          <Route exact path="/register" component={(props) => <Registration {...props} />} />
        </Switch>
        </div>
      </Router>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    persistUser: (userId) => dispatch(persistUser(userId))
  } 
}

export default withRouter(connect(null, mapDispatchToProps)(App))
