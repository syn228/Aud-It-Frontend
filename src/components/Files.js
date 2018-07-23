import React, { Component } from 'react';
import Adapter from './Adapter'
import { connect } from 'react-redux'
import File from './File'



class Files extends Component {
  state = {
    files: [],
  }

  componentDidMount() {
    Adapter.getFiles()
    .then(json => this.setState(
      {
        files: json.filter(file => file.user_id === this.props.currentUserId)
      }))
  }

  render() {    
    return (
      <div>
        <h1>Your Files</h1>
        {this.state.files.length > 0 
        ?
          this.state.files.map(file => 
            <File files={this.state.files} file={file} togglePlay={this.togglePlay}/>
          )
        : 
          <h3>You don't have any files. Go convert them first!</h3>}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId
  }
}
export default connect(mapStateToProps)(Files);