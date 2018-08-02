import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react'
import Adapter from './Adapter'
import { connect } from 'react-redux'
import ConvertedText from './ConvertedText'
import UUID from "uuid"
import puzzled from '../assets/puzzled.png'

class ConvertedTexts extends Component {
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
      <h1 style={{marginTop: '20px', width: window.innerWidth}}>Your Texts:</h1>
        <Accordion className="text-list">
        {this.state.files.length > 0 
        ?
          this.state.files.map(file =>
            <ConvertedText key={UUID()} files={this.state.files} file={file}/>
          )
        : 
          <div>
          <h3 style={{position: "absolute", width: window.innerWidth}}>You don't have any files.</h3> 
          <h3 style={{marginTop: "30px", position: "absolute", width: window.innerWidth}}><a href="/upload" >Go convert them first! </a></h3>
          <img style={{position: 'absolute', height: 'auto', maxWidth: '20%', top: window.innerHeight/3, left: window.innerWidth/2.5}} src={puzzled} alt=""/>
          </div>
          }
        </Accordion>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId,
  currentUserName: state.currentUserName
  }
}

export default connect(mapStateToProps)(ConvertedTexts);