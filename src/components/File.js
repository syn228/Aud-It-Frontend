import React, { Component } from 'react';
import UUID from "uuid"
import VoicePlayer from '../VoicePlayer';

class File extends Component {
  state = {
    start: false,
    pause: false,
    button: "Play Audio",
    audiotext: ""
  }

  togglePlay = (event) => {
    const match = this.props.files.find( file => file.name === event.target.value)
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
        <div key={UUID()}>
          <h3>{this.props.file.name}</h3>
            <li> 
              <strong>Size</strong>: {this.props.file.size} bytes <br/> 
              <strong>Conversion Confidence</strong>: {this.props.file.confidence} <br/>
              🔊 <br/>
              <button value={this.props.file.name} onClick={this.togglePlay}>{this.state.button}</button><br/>
              <button onClick={this.cancelAudio}>Cancel Audio</button>
            </li>
          </div>
        {this.state.start === true 
        ? 
          <VoicePlayer onEnd={this.onEnd} manual={this.cancelAudio} play={this.state.start} pause={this.state.pause} text={this.state.audiotext}/>
        : null
        } 
      </div>
    );
  }
}

export default File;