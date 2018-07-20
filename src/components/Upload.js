import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop } from "../actions"

class Upload extends React.Component {
  render() {
    return (
      <section>
        <div >
          <img src="https://www.ukessays.com/images/services/essay/macbook-sample.png" style={{width: "20%"}}alt=""/>
          <img src="http://www.transparentpng.com/thumb/arrow/big-right-arrow-icon-png-10.png" style={{width: "20%"}}alt=""/>
          <img src="https://www.freeiconspng.com/uploads/file-mp3-music-music-file-song-icon-27.png" style={{width:"15%"}}alt=""/>
          <Dropzone className="dropzone" accept="image/png, image/jpeg, application/pdf " onDrop={this.props.onDrop.bind(this)}>
            <p>Click the box or drag files to convert!</p>
            <p>(Accepted Filetypes: jpeg, png, pdf)</p>
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
}
function mapStateToProps(state){
  return {
  currentUserId: state.currentUserId,
  }
}

function mapDispatchToProps(dispatch){
  return {
      onDrop: (files) => dispatch(onDrop(files))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Upload);