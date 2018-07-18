import React, { Component } from 'react';
import { connect } from "react-redux"
import { logInChange, persistUser } from "../actions"

class LoginForm extends Component {
 
    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            username: this.props.username,
            password: this.props.password
        }

        fetch(`http://localhost:4000/sessions/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            if (json.username) {
            localStorage.setItem('token', json.token);
            this.props.persistUser(json)
            this.props.history.push("/");
            }   
            else alert("Your username or password is wrong. Please try again.")
      })
    }

    render() {
        
        return (
            <div className="information">
                Please Sign in:
            <form onChange={this.props.handleChange} onSubmit={this.handleSubmit} className="login">
                <input type="text" placeholder="Username" id="username" value={this.props.username}/><br/>  
                <input type="password" placeholder="password" id="password" value={this.props.password}/><br/>  
                <input type="submit" value="Sign In"/>
            </form>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
    username: state.loginUsername,
    password: state.loginPassword,
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleChange: (event) => dispatch(logInChange(event)),
        persistUser: (userObj) => dispatch(persistUser(userObj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);