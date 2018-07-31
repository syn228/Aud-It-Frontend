import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop, clearData } from "../actions"
import NewUpload from './NewUpload';
import UUID from 'uuid'
import Animation from './Animation'
import { Message, Icon } from 'semantic-ui-react'

class Upload extends React.Component {
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
      3000)
    })
    this.props.onDrop(files, this.props.currentUserId)
  }
  
  render() {
    const { loading } = this.state
    if (!loading){
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
          Conversion in Progress
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
  latestUpload: state.latestUpload
  }
}

export default connect(mapStateToProps, { onDrop, clearData })(Upload);