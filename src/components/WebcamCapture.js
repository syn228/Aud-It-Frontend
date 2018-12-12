import React, { Component } from 'react';
import Webcam from "react-webcam"
import { connect } from 'react-redux'
import { onDrop, clearData } from "../actions"
import UUID from "uuid"
import NewCapture from './NewCapture'
import { Message, Icon, Button } from 'semantic-ui-react'

class WebcamCapture extends Component {
  state = {
    loading: false,
    visible: false
  }

  componentDidMount() {
    this.props.clearData()
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  capture = () => {
    this.setState({
      loading: true,
      visible: true
    }, () => {
      setTimeout(() =>
        this.setState({
          loading: false,
          visible: false
        }),
      5000)
    })
    
    const imageSrc = this.webcam.getScreenshot(); 
    let file = []   
    file = [...file, this.dataURLtoFile(imageSrc, "imageCapture")] 
    this.props.onDrop(file, this.props.currentUserId)
  }
 
  render() {
    const {loading} = this.state
    const videoConstraints = {
      width: 1280,
      height: 1280,
      facingMode: 'user',
    };
    if (!loading){
      if(this.props.latestUpload.length !== 0 ){
        return (
          <div className="background-image">
            <ul className="new-upload">
              { 
                this.props.latestUpload.map(file => 
                <NewCapture key={UUID()} file={file}/>)
              }
            </ul>
            <form>
              <Button className="upload-button" primary size='huge'>
                Capture Another Picture
              </Button>
            </form>
          </div>
        )
      }
      else {
        return (
          <div style={{height: window.innerHeight}} className="background-image">
            <h2 style={{marginTop: '20px'}}>
              Take a picture of text and get the audio!
            </h2>
            <Webcam style={{marginTop: '50px'}}
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/png"
              width={350}
              videoConstraints={videoConstraints}
            /><br/><br/>
            <button onClick={this.capture}>Capture and Convert Photo</button><br/>
          </div>
        );
      }
    }
    else {
      return (
        <div className="background-image">
          <div className="loader">
            <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              Detection in Progress
            </Message.Content>
            </Message>
          </div>
        </div>
      )
    }
  }
}
function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId,
  latestUpload: state.latestUpload,
  }
}

export default connect(mapStateToProps, { onDrop, clearData })(WebcamCapture);