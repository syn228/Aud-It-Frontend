import React, { Component } from 'react';
import Adapter from './Adapter'
import { connect } from 'react-redux'
import File from './File'
import UUID from 'uuid'
import { Card } from 'semantic-ui-react'
import puzzled from '../assets/puzzled.png'

class Files extends Component {
  state = {
    files: [],
  }

  componentDidMount() {
    Adapter.getFiles()
    .then(json => this.setState(
      {
        files: json.filter(file => file.user_id === this.props.currentUserId)
      }
    ))
  }

  render() {    
    return (
      <div style={{height: window.innerHeight}} className="backgroundImg">
        <h1 style={{marginTop: '20px', width: window.innerWidth}}>Welcome {this.props.currentUserName}!</h1>
        <h1 style={{width: window.innerWidth}}>Your Files:</h1>
        <Card.Group className="fileCard" itemsPerRow={5}>
        {this.state.files.length > 0 
        ?
          this.state.files.map(file =>
            <File key={UUID()} files={this.state.files} file={file}/>
          )
        : 
          <div>
          <h3 style={{position: "absolute", width: window.innerWidth}}>You don't have any files.</h3> 
          <h3 style={{marginTop: "30px", position: "absolute", width: window.innerWidth}}><a href="/upload" >Go convert them first! </a></h3>
          <img style={{top: window.innerHeight/4, left: window.innerWidth/3}}className="puzzled" src={puzzled} alt=""/>
          </div>
          }
          </Card.Group>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId,
  currentUserName: state.currentUserName
  }
}
export default connect(mapStateToProps)(Files);