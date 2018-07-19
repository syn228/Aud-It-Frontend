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
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import { persistUser } from './actions'


class App extends Component {
 
  componentDidMount() {
    if (localStorage.token !== undefined){
      this.parseJwt(localStorage.token)
    }
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    let decodedPayload = JSON.parse(window.atob(base64Url))
    this.props.persistUser(decodedPayload.id)
  };


  render() {
    return (
      <Router>
      <div className="App">
        <Navbar/>

        
        <Route exact path="/" component={Homepage} />
        { Adapter.isLoggedIn() ?
           <Fragment>
              <Route exact path="/upload" component={(props) => <Upload {...props} />} />
              <Route exact path="/files" component={(props) => <Files {...props} />} />
              <Route exact path="/logout" component={(props) => <Logout {...props} />} />
            </Fragment>
          :
            <Fragment>
              <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
              <Route exact path="/register" component={(props) => <Registration {...props} />} />
            </Fragment>
        }
        
      </div>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch){
  console.log('this should log');
  
  return {
    persistUser: (userId) => dispatch(persistUser(userId))
  } 
}

export default connect(null, mapDispatchToProps)(App);
