import React, { Component } from 'react';
import { connect } from "react-redux"
import { registerChange, persistUser } from "../actions"
import register from '../registerServiceWorker';
import Adapter from './Adapter'

class Registration extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            username: this.props.username,
            password: this.props.password,
            first_name: this.props.first_name,
            last_name: this.props.last_name
        }
    fetch(`http://localhost:4000/users/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(
          json => {
        if (json.username){
        localStorage.setItem('token', json.token);
        Adapter.postSession(this.props.username, this.props.password, this.props.persistUser)
        this.props.history.push("/");
        }
        else {
            alert("Something went wrong during your registration. Please try again later.")
        }
    })
    }

    render() {
        return (
            <div className="information">
                Please Enter Your Information:
            <form onChange={this.props.handleChange} onSubmit={this.handleSubmit} className="login">
                <input type="text" placeholder="Username" id="username" value={this.props.registerUsername}/><br/>  
                <input type="password" placeholder="password" id="password" value={this.props.registerPassword}/><br/>
                <input type="first_name" placeholder="First Name" id="first_name" value={this.props.first_name}/><br/>
                <input type="last_name" placeholder="Last Name" id="last_name" value={this.props.last_name}/><br/>
                <input type="submit" value="Create Account"/>
            </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
    username: state.registerUsername,
    password: state.registerPassword
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleChange: (event) => dispatch(registerChange(event)),
        persistUser: (userId) => dispatch(persistUser(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);