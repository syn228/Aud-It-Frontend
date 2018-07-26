import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop } from "../actions"

class Upload extends React.Component {
  handleUpload = (files) => {
    this.props.onDrop(files, this.props.currentUserId)
  }
  
  render() {
    if (!this.props.loading){
      return (
        <section>
          <div >
            <img className="imgrep" src="https://www.ukessays.com/images/services/essay/macbook-sample.png" alt=""/>
            <img className="arrowrep" src="http://www.transparentpng.com/thumb/arrow/big-right-arrow-icon-png-10.png" alt=""/>
            <img className="audiorep" src="http://pngimg.com/uploads/headphones/headphones_PNG7623.png" alt=""/>
            <h2 className="directions">Click or drag files into the box below to convert your document into an audio file!</h2>
            <h3>(Acceptable extensions: jpeg, png)</h3>
            <h3>*jpeg files will yield less accurate results! png files are preferred.</h3>
            <Dropzone className="dropzone" accept="image/png, image/jpeg, application/pdf" onDrop={this.handleUpload}>
              <p>
                Drop Files Here
              </p>
              <p>
                or
              </p>
              <button>
                Select Files
              </button>
            </Dropzone>
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
        <div>
          <div className="loadingDisplay">
            <h3>Converting {this.props.fileNumber}/{this.props.totalFiles} Files</h3>
            <h3>{this.props.loadingMessage}</h3>
            <h3>{parseFloat(Math.round(this.props.loadingProgress * 100))}%</h3>
          </div>
          <div className="loader"/>
        </div>
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

export default connect(mapStateToProps, { onDrop })(Upload);