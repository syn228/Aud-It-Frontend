import React, { Component } from 'react';
import Webcam from "react-webcam"
import { connect } from 'react-redux'
import { onDrop, clearData } from "../actions"
import UUID from "uuid"
import NewCapture from './NewCapture'
import { Grid, Transition, Image, Message, Icon } from 'semantic-ui-react'

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
      3000)
    })
    
    const imageSrc = this.webcam.getScreenshot(); 
    let file = []   
    file = [...file, this.dataURLtoFile(imageSrc, "imageCapture")] 
    this.props.onDrop(file, this.props.currentUserId)
  }
 
  render() {
    const {loading} = this.state
    const videoConstraints = {
      width: 720,
      height: 1280,
      facingMode: 'user',
    };
    if (!loading){
    return (
      <div className="backgroundImg">
        <h2>
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
        {
          this.props.latestUpload.length !== 0 
          ? 
          this.props.latestUpload.map(file => 
            <NewCapture key={UUID()} file={file}/>
          )
          : null
        }
      </div>
    );
  }
  else {
    return (
        <div className="loader">
          <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            Detection in Progress
          </Message.Content>
          </Message>
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