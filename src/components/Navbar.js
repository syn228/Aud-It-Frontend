import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import Adapter from './Adapter'  

class Navbar extends Component {
    handleClick = (event) => {
        Adapter.logout();
        this.props.history.push("/")
    }
    render() {
        return (
                <header className="nav">
                <NavLink className="tabs" exact to="/">Home</NavLink>
                    { Adapter.isLoggedIn() ?
                        <Fragment>
                            <NavLink className="tabs" exact to="/upload">Upload</NavLink>
                            <NavLink className="tabs" exact to="/files">My Files</NavLink>
                            <NavLink className="tabs" exact to="/logout" onClick={this.handleClick}>Log Out</NavLink>
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