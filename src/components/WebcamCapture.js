import React, { Component } from 'react';
import Webcam from "react-webcam"
import Adapter from './Adapter'
import { connect } from 'react-redux'
import { onDrop } from "../actions"

class WebcamCapture extends Component {
  state = {
    loading: false
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
      loading: true
    }, () => {
      setTimeout(() =>
        this.setState({
          loading: false
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
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/png"
          width={350}
          videoConstraints={videoConstraints}
        /><br/>
        <button onClick={this.capture}>Capture and Convert Photo</button>
      </div>
    );
  }
  else {
    return (
        <div className="loader"/>
    )
  }
  }
}
function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId,
  files: state.files,
  loading: state.loading,
  fileNumber: state.fileNumber,
  totalFiles: state.totalFiles,
  loadingMessage: state.loadingMessage,
  loadingProgress: state.loadingProgress
  }
}

export default connect(mapStateToProps, { onDrop })(WebcamCapture);