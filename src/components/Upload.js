import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop } from "../actions"

class Upload extends React.Component {
  render() {
    return (
      <section>
        <div >
          <img className="imgrep" src="https://www.ukessays.com/images/services/essay/macbook-sample.png" alt=""/>
          <img className="arrowrep" src="http://www.transparentpng.com/thumb/arrow/big-right-arrow-icon-png-10.png" alt=""/>
          <img className="audiorep" src="http://pngimg.com/uploads/headphones/headphones_PNG7623.png" alt=""/>
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