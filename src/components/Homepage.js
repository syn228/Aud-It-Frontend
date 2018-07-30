import React from 'react';
import Adapter from './Adapter'
import {Button, Container, Header, Icon, Segment,} from 'semantic-ui-react'

const Homepage = (props) => {
    
    const handleClick = () => {
        Adapter.isLoggedIn 
        ?     
        props.history.push("/upload")
        :
        props.history.push("/register")
    }

        return (
            <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Container text>
    <Header
      as='h1'
      content='Aud-It'
      inverted
      style={{
        fontSize:   '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop:   '3em',
        color: "red"
      }}
    />
    <Header
      as='h2'
      content='Convert Image of Text into Audio'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />
    <Button onClick={() => handleClick()} primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
  </Segment>
        )
}

export default Homepage;