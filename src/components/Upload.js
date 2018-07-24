import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop } from "../actions"
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import {jimp} from './New'


class Upload extends React.Component {
  state = {
    loading: false,
    tempUrl: ""
  }

  onUploadStart = (info, next) => {
    console.log('base.preprocess()', info);
    return next(info);
    // should use JIMP here
  }

  onUploadError = (err) => {
    console.log("err",err)
  }

  onUploadProgress = (percent, status, file) => {
    return console.log('base.onProgress()', percent, status);
  };

  handleS3Upload = info => {
    debugger
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
  }

  handleUpload = (files) => {
  




    let formData = new FormData()

    formData.append("name", files[0].name)
    formData.append("attachment", files[0])


   
    fetch("http://localhost:4000/uploads/", {
      method: 'POST',
      body: formData
  }
)


    // this.setState({
    //   loading: true 
    // }, () => {
    //   this.props.onDrop(files)
    //   setTimeout(() => this.setState({
    //     loading: false
    //   }), 10000)
    // })
  }

  componentDidUpdate(prevProps, prevState) {
    
  }
  
  render() {
    console.log(typeof(this.state.tempUrl))
    const uploadOptions = {
      preprocess: this.onUploadStart,
      uploadRequestHeaders: {'x-amz-acl': 'public-read' },
      autoUpload: true,
      signingUrl: "/s3/sign",
      signingUrlMethod: "GET",
      accept: "image/*",
      s3path: "/uploads/",
    }
    const s3Url = 'https://aud-it-pictures.s3.amazonaws.com/'
    const {loading} = this.state
    if (!loading){
      return (
        <section>
          <div >
            <img className="imgrep" src="https://www.ukessays.com/images/services/essay/macbook-sample.png" alt=""/>
            <img className="arrowrep" src="http://www.transparentpng.com/thumb/arrow/big-right-arrow-icon-png-10.png" alt=""/>
            <img className="audiorep" src="http://pngimg.com/uploads/headphones/headphones_PNG7623.png" alt=""/>
            <h2 className="directions">Click or drag files into the box below to convert your document into an audio file!</h2>
            <h3>(Acceptable extensions: jpeg, png)</h3>
            <Dropzone className="dropzone" accept="image/png, image/jpeg, application/pdf" onDrop={this.handleUpload}>
            <p>
              Drop Files Here
            </p>
            <p>
              or
            </p>
            <button>
              Select File
            </button>
            </Dropzone>
            <DropzoneS3Uploader
              onFinish={this.handleS3Upload}
              onError={this.onUploadError}
              onProgress={this.onUploadProgress}
              s3Url={s3Url}
              maxSize={1024 * 1024 * 5}
              upload={uploadOptions}
            />
          </div>
          <aside>
            <ul>
              {
                /*Insert process here*/
              }
            </ul>
          </aside>
        </section>
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
  files: state.files
  }
}

function mapDispatchToProps(dispatch){
  return {
      onDrop: (files) => dispatch(onDrop(files))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Upload);