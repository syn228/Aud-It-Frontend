import React, { Component, Fragment } from 'react';
import { NavLink} from 'react-router-dom'
import { Redirect } from 'react-router'
import Adapter from './Adapter'
import homelogo from '../assets/homelogo.png'
import { Container, Dropdown } from 'semantic-ui-react'

class Navbar extends Component {
    state = {
    
    }
    
    handleClick = (event) => {  
        Adapter.logout();
    }

    handleDropDown = () => {
        this.props.history.push("/login")
        this.setState({})
    }
    
    render() {
        return (
            <div>
                <div className="logodiv">
                    <img onClick={this.handleClick} className="logo" src={homelogo} alt=""/>
                </div>
            <div>
                    <header className="nav">
                    <NavLink className="tabs" exact to="/home">Home</NavLink>
                        { Adapter.isLoggedIn() ?
                            <Fragment>
                                <NavLink className="tabs" exact to="/upload">Upload</NavLink>
                                <NavLink className="tabs" exact to="/files">My Files</NavLink>
                                <NavLink className="tabs" exact to="/capture">Capture</NavLink>
                                <NavLink className="tabs logs" to="/home" onClick={this.handleClick}>Log Out</NavLink>
                            </Fragment>
                        :
                            <Fragment>
                                <Dropdown item simple text= 'Services'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.handleDropDown}>Upload</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleDropDown}>Capture</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <NavLink className="tabs logs" exact to="/register">Registration</NavLink>
                                <NavLink className="tabs logs" exact to="/login">Login</NavLink>
                            </Fragment>
                        }
                    </header>    
                </div>
            </div>
        )
    }
}


export default Navbar;