import React, { Component } from 'react';
import VoicePlayer from '../VoicePlayer';
import { connect } from "react-redux"
import { Button, Card, Image, Message } from 'semantic-ui-react'

class NewCapture extends Component {
  state = {
    start: false,
    pause: false,
    button: "Play Audio",
    audiotext: ""
  }

  togglePlay = (event) => {
    const match = this.props.latestUpload.find( file => file.name === event.target.value)
    if (match.text !== ""){
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
        })
      }
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
      <Card className="ui container center aligned">
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
    </Card>
    <Message>
    <Message.Header>Detected Text:</Message.Header>
    {this.props.file.text !== "" ? 
      <Message compact>{this.props.file.text.slice(0, 500)}...</Message>
    :
    <Message compact>We could not find any text to detect.</Message>
    }
   </Message>
        {this.state.start === true 
        ? 
          <VoicePlayer onEnd={this.onEnd} manual={this.cancelAudio} play={this.state.start} pause={this.state.pause} text={this.state.audiotext}/>
        : null
        } 
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
  latestUpload: state.latestUpload
  }
}

export default connect(mapStateToProps)(NewCapture);