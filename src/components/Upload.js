import Dropzone from 'react-dropzone'
import React, {Component, Fragment} from 'react'
import { connect } from "react-redux"
import { onDrop, clearData } from "../actions"
import NewUpload from './NewUpload';
import { withRouter } from 'react-router-dom';
import UUID from 'uuid'
import Animation from './Animation'
import { Message, Icon, Button } from 'semantic-ui-react'

class Upload extends Component {
  state = {
    loading: false,
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
      5000)
    })
    this.props.onDrop(files, this.props.currentUserId)
  }
  
  render() {
    const { loading } = this.state
    if (!loading){
      if (this.props.latestUpload.length !== 0){
        return (
          <div className="backgroundImg">
            <div className="upload-container">
              <ul className="new-upload">
                { 
                  this.props.latestUpload.map(file => 
                  <NewUpload key={UUID()} file={file}/>
                  )
                }
              </ul>
              <form>
              <Button className="upload-button" primary size='huge'>
                Convert Another File
              </Button>
              </form>
            </div>
          </div>
        )
      }
      else {
      return (
        <div className="backgroundImg">
        <section>
          <div >
            <Animation />
            <h2 className="directions">Click or drag files into the box below to convert your document into an audio file!</h2>
            <h3>(Acceptable extensions: jpeg, png)</h3>
            <Dropzone className="dropzone" accept="image/png, image/jpeg, application/pdf" onDrop={this.handleUpload}>
              <h4>
                Drop Files Here
              </h4>
              <h4>
                or
              </h4>
              <div className="ui button">
              Upload
              </div>
            </Dropzone>
          </div>
          
          
        </section>
        </div>
      );
    }
  }
    else {
      return (
        <div className="backgroundImg">
          <div className="loader">
            <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              Conversion in Progress
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
  latestUpload: state.latestUpload
  }
}

export default withRouter(connect(mapStateToProps, { onDrop, clearData })(Upload));