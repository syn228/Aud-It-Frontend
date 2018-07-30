import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import LoginForm from './components/LoginForm'
import Upload from './components/Upload'
import Files from './components/Files'
import Logout from './components/Logout'
import Adapter from './components/Adapter'
import Registration from "./components/Registration"
import { Route, BrowserRouter as Router, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { persistUser } from './actions'
import WebcamCapture from './components/WebcamCapture';

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
    this.props.persistUser(decodedPayload.id)
  };

// for certain routes, if you are not logged in an you try it access it, give them the 402 status code.
  render() {
    return (
      <Router>
      <div className="App">
        <Navbar history={this.props.history}/>
        
        <Route exact path="/home" component={Homepage} />
           <Switch>
              <Route exact path="/upload" component={(props) => <Upload {...props} />} />
              <Route exact path="/files" component={(props) => <Files {...props} />} />
              <Route exact path="/home" component={(props) => <Logout {...props} />} />
              <Route exact path="/capture" component={(props) => <WebcamCapture {...props} />} />
              <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
              <Route exact path="/register" component={(props) => <Registration {...props} />} />
            </Switch>
      </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    persistUser: (userId) => dispatch(persistUser(userId))
  } 
}

export default withRouter(connect(null, mapDispatchToProps)(App))
