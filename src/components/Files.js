import React, { Component } from 'react';
import Adapter from './Adapter'
import { connect } from 'react-redux'
import UUID from "uuid"
import VoicePlayer from '../VoicePlayer';

class Files extends Component {
  state = {
    files: [],
    start: false,
    pause: false,
    button: "Play Audio",
    audiotext: ""
  }

  togglePlay = (event) => {
    const match = this.state.files.find( file => file.name === event.target.value)
    this.setState({
      audiotext: match.text,
    }, () => {
          if (this.state.start === false){
            //start
            this.setState({start: true, button: "Pause Audio"}) 
          }
          else if (this.state.start === true && this.state.pause === false)
          //pause
            {
              this.setState({pause: true, button: "Resume Audio"})
            }
            else {
            //resume
          this.setState({pause: false, button: "Pause Audio"}) 
            }  
    });
  }

  cancelAudio = () => {
    this.setState({
      start: false,
      pause: false,
      button: "Play Audio",
    })
  }

  onEnd = () => {
    this.setState({
      start: false,
      pause: false,
      button: "Play Audio",
    })
  }

  componentDidMount() {
    Adapter.getFiles()
    .then(json => this.setState(
      {
        files: json.filter(file => file.user_id === this.props.currentUserId)
      }))
  }
  componentWillUnmount() {
    this.setState({
      start: false,
      pause: false,
      button: "Play Audio"
    });
  }
  
  render() {    
    return (
      <div>
        <h1>Your Files</h1>
        {this.state.files.length > 0 
        ? 
        <div>
          {this.state.files.map(file => 
            <div key={UUID()}>
            <h3>{file.name}</h3>
            <li> 
              <strong>Size</strong>: {file.size} bytes <br/> 
              <strong>Conversion Confidence</strong>: {file.confidence} <br/>
              🔊 <br/>
              <button value={file.name} onClick={this.togglePlay}>{this.state.button}</button><br/>
              <button onClick={this.cancelAudio}>Cancel Audio</button>
              </li>
              
              </div>
        ) }
        {this.state.start === true ? 
        <VoicePlayer onEnd={this.onEnd} manual={this.cancelAudio} play={this.state.start} pause={this.state.pause} text={this.state.audiotext}/>
        : null
        } 
              </div>
        : 
          <h3>You don't have any files. Go convert them first!</h3>}
          
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId
  }
}
export default connect(mapStateToProps)(Files);