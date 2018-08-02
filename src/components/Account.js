import React, { Component } from 'react';
import { List } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Account extends Component {
  handleClick = (event) => {
    switch (event.target.innerText){
      case "Home":
        this.props.history.push("/home")
        break;
      case "My Audio":
        this.props.history.push("/files")
        break;
      case "My Text":
        this.props.history.push("/text")
        break;
    }
  }
  render (){
    return (
      <div style={{height: window.innerHeight}} className="backgroundImg">
      <h1 style={{marginTop: '20px'}}>Welcome {this.props.currentUserName}!</h1>
      <List onClick={this.handleClick} link>
        <List.Item className="account-choice" as='a'>Home</List.Item>
        <List.Item className="account-choice" as='a'>My Audio</List.Item>
        <List.Item className="account-choice" as='a'>My Text</List.Item>
      </List>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  currentUserName: state.currentUserName
  }
}
export default withRouter(connect(mapStateToProps)(Account))