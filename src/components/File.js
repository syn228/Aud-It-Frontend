import React, { Component } from 'react';
import VoicePlayer from '../VoicePlayer';
import { Button, Card, Image } from 'semantic-ui-react'

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
      if (this.state.start === false)
      {
        //start
        this.setState({start: true, button: "Pause Audio"}) 
      }
      else if (this.state.start === true && this.state.pause === false)
      {
        //pause
        this.setState({pause: true, button: "Resume Audio"})
      }
      else 
      {
        //resume
        this.setState({pause: false, button: "Pause Audio"}) 
      }  
    })
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
        <Card style={{marginLeft: '10px', marginRight: '10px', marginTop: '50px'}}>
      <Card.Content>
        <Image floated='right' size='mini' src='https://www.freeiconspng.com/uploads/volume-icon-31.png' />
        <Card.Header>{this.props.file.name}</Card.Header>
        <Card.Description>
          {this.props.file.size} bytes
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button value={this.props.file.name} onClick={this.togglePlay} basic color='green'>
            {this.state.button}
          </Button>
          <Button onClick={this.cancelAudio} basic color='red'>
            Cancel Audio
          </Button>
        </div>
      </Card.Content>
    
        {this.state.start === true 
        ? 
          <VoicePlayer onEnd={this.onEnd} manual={this.cancelAudio} play={this.state.start} pause={this.state.pause} text={this.state.audiotext}/>
        : null
        } 
      </Card>
    );
  }
}

export default File;