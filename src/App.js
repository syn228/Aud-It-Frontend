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
import { Route, Redirect } from 'react-router-dom';


class App extends Component {
 
  handleClick = (event) => {
    Adapter.logout();
    <Redirect to="/"/>
  }
  render() {
    return (
      <div className="App">
        <Navbar handleClick={this.handleClick}/>

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
    );
  }
}

export default App;
