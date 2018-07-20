import React, { Component } from 'react';
import { connect } from "react-redux"
import { logInChange, persistUser } from "../actions"
import Adapter from "./Adapter"

class LoginForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        Adapter.postSession(this.props.username, this.props.password, this.props.persistUser, this.props.history)
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
        persistUser: (userId) => dispatch(persistUser(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);