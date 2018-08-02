import React, { Component } from 'react';
import { Accordion, Icon, Card } from 'semantic-ui-react'

class ConvertedText extends Component {
  state = {
    activeIndex: 0 
  }

  handleClick = (event, titleProps) => {
    const { index } = titleProps
    const newIndex = this.state.activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    return (
      <div className="each-text-title">
          <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
          {this.props.file.name}
          <Icon name='dropdown' />
        </Accordion.Title>

        <Accordion.Content active={this.state.activeIndex === 1}>
          <Card style={{width: window.innerWidth/2, left: window.innerWidth/4}} className="each-text">
            <Card.Content description={this.props.file.text} />
            <Card.Content extra>
            </Card.Content>
          </Card>
        </Accordion.Content>
      </div>
    );
  }
}

export default ConvertedText;