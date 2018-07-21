import React, { Component, Fragment } from 'react';
import { NavLink} from 'react-router-dom'
import Adapter from './Adapter'
import homelogo from '../assets/homelogo.png'

class Navbar extends Component {
    handleClick = (event) => {  
        Adapter.logout();
        this.props.history.push("/")
    }
    
    render() {
        return (
            <div>
            <div className="logodiv">
                <img onClick={this.handleClick} className="logo" src={homelogo} alt=""/>
            </div>
                <div>
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
                </div>
            </div>
        );
    }
}


export default Navbar;