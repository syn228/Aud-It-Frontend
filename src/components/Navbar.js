import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import Adapter from './Adapter'


  

class Navbar extends Component {
    render() {
        return (
                <header className="nav">
                <NavLink className="tabs" exact to="/">Home</NavLink>
                    { Adapter.isLoggedIn() ?
                        <Fragment>
                        <NavLink className="tabs" exact to="/upload">Upload</NavLink>
                        <NavLink className="tabs" exact to="/files">My Files</NavLink>
                        <NavLink className="tabs" exact to="/logout" onClick={this.props.handleClick}>Log Out</NavLink>
                        </Fragment>
                    :
                        <Fragment>
                        <NavLink className="tabs" exact to="/register">Registration</NavLink>
                        <NavLink className="tabs" exact to="/login">Login</NavLink>
                        </Fragment>
                    }

                </header>    
        );
    }
}


export default Navbar;