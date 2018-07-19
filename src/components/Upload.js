import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop } from "../actions"

class Upload extends React.Component {
  render() {
    return (
      <section>
        <div >
          <Dropzone className="dropzone" accept="image/png, image/jpeg, application/pdf " onDrop={this.props.onDrop.bind(this)}>
            <p>Click the box or drag files to convert!</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.props.text
            }
          </ul>
        </aside>
      </section>
    );
  }
}
function mapStateToProps(state){
  return {
  files: state.files,
  currentUserId: state.currentUserId,
  text: state.text
  }
}

function mapDispatchToProps(dispatch){
  return {
      onDrop: (files) => dispatch(onDrop(files))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Upload);