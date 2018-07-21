import Dropzone from 'react-dropzone'
import React from 'react'
import { connect } from "react-redux"
import { onDrop } from "../actions"

class Upload extends React.Component {
  state = {
    loading: false,
  }
  handleUpload = (files) => {
    this.setState({
      loading: true
    }, () => {
      this.props.onDrop(files)
      setTimeout(() => this.setState({
        loading: false
      }), 10000)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    
  }
  
  render() {
    const {loading} = this.state
    if (!loading){
      return (
        <section>
          <div >
            <img className="imgrep" src="https://www.ukessays.com/images/services/essay/macbook-sample.png" alt=""/>
            <img className="arrowrep" src="http://www.transparentpng.com/thumb/arrow/big-right-arrow-icon-png-10.png" alt=""/>
            <img className="audiorep" src="http://pngimg.com/uploads/headphones/headphones_PNG7623.png" alt=""/>
            <h2 className="directions">Click or drag files into the box below to convert your document into an audio file!</h2>
            <h3>(Acceptable extensions: jpeg, png, pdf)</h3>
            <Dropzone className="dropzone" accept="image/png, image/jpeg, application/pdf" onDrop={this.handleUpload}>
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
        <div className="loader"/>
      )
    }
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