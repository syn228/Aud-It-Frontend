import React, { Component, Fragment } from 'react';
import { NavLink} from 'react-router-dom'
import Adapter from './Adapter'
import { Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
    handleClick = (event) => {  
        switch (event.target.innerText){
            case "Home":
            this.props.history.push("/home")
            case "Upload":
            this.props.history.push("/login")
            break;
            case "Capture":
            this.props.history.push("/login")
            break;
            case "Log Out":
            Adapter.logout();
            break;
        }
    }
    
    render() {
        return (
            <div>
                <header className="ui menu" style={{backgroundColor: "#333"}}>
                <NavLink style={{color: "white"}} className="item tabs" onClick={this.handleClick} exact to="/home">Home</NavLink>
                    { Adapter.isLoggedIn() 
                    ?
                        <Fragment>
                            <NavLink style={{color: "white"}} className="item tabs" exact to="/upload">Upload</NavLink>
                            <NavLink style={{color: "white"}} className="item tabs" exact to="/capture">Capture</NavLink>
                            <div className="right item">
                            <NavLink style={{marginRight: '20px'}}className="ui primary button" exact to="/account">My Account</NavLink>
                            <NavLink className="ui button" to="/home" onClick={this.handleClick}>Log Out</NavLink>
                            </div>
                        </Fragment>
                    :
                        <Fragment>
                            <Dropdown style={{color: "white"}}className="services" item simple text= 'Services'>
                                <Dropdown.Menu className="dropdown-menu">
                                    <Dropdown.Item className="dropdown-item" onClick={this.handleClick}>Upload</Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" onClick={this.handleClick}>Capture</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="right item">
                            <NavLink style={{marginRight: '20px'}} className="ui primary button" exact to="/register">Registration</NavLink>
                            <NavLink style={{marginRight: '5px'}} className="ui button" exact to="/login">Login</NavLink>
                            </div>
                        </Fragment>
                    }
                </header>    
            </div>
        )
    }
}


export default withRouter(Navbar);