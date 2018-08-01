import React, { Component } from 'react';
import { Divider, Image, Transition } from 'semantic-ui-react'

class Animation extends Component {
  state = {
    visible: true
  }

  transition = () => {
    this.animation = setInterval( () => this.setState({visible: !this.state.visible}), 2500)
  }

  componentWillUnmount() {
    clearInterval(this.animation)
    
  }

  componentDidMount() {
    this.transition()
  }
  render() {
    return (
      <div className="upload-animation">
        <Divider hidden />
        <Transition visible={this.state.visible} animation='scale' duration={700}>
          <Image size='small' src='http://web.ics.purdue.edu/~jun25/files/publication2.png' />
        </Transition>
        <Transition visible={!this.state.visible} animation='scale' duration={1000}>
          <Image className="headset" size='small' src='https://dumielauxepices.net/sites/default/files/music-icons-transparent-background-692190-8080036.png' />
        </Transition>
      </div>
    );
  }
}

export default Animation;