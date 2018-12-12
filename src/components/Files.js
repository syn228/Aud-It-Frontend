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
        <h1 style={{marginTop: '20px', marginLeft: '10px',width: window.innerWidth}}>Your Audio:</h1>
        <Card.Group className="fileCard" itemsPerRow={5}>
        {this.state.files.length > 0 
        ?
          this.state.files.map(file =>
            <File key={UUID()} files={this.state.files} file={file}/>
          )
        : 
        setTimeout(() => {
          <div>
          <h3 style={{position: "absolute", width: window.innerWidth}}>You don't have any files.</h3> 
          <h3 style={{marginTop: "30px", position: "absolute", width: window.innerWidth}}><a href="/upload" >Go convert them first! </a></h3>
          <img style={{position: 'absolute', height: 'auto', maxWidth: '20%', top: window.innerHeight/3, left: window.innerWidth/2.5}} src={puzzled} alt=""/>
          </div>
        }, 1000)}
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