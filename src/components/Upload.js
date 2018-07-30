import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop, clearData } from "../actions"
import NewUpload from './NewUpload';
import UUID from 'uuid'

class Upload extends React.Component {
  state = {
    loading: false,
    start: false,
    pause: false,
    button: "Play Audio",
    audiotext: ""
  }

  componentDidMount() {
    this.props.clearData()
  }
  

  handleUpload = (files) => {
    this.setState({
      loading: true
    }, () => {
      setTimeout(() => 
        this.setState({
          loading: false
        }),
      3000)
    })
    this.props.onDrop(files, this.props.currentUserId)
  }
  
  render() {
    console.log(this.props.latestUpload)
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
                Select Files
              </button>
            </Dropzone>
          </div>
          <aside>
            <ul>
              {
                this.props.latestUpload.length !== 0 
                ? 
                this.props.latestUpload.map(file => 
                  <NewUpload key={UUID()} file={file}/>
                )
                : null
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
  latestUpload: state.latestUpload
  }
}

export default connect(mapStateToProps, { onDrop, clearData })(Upload);