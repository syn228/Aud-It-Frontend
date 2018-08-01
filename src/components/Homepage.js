import React from 'react';
import Adapter from './Adapter'
import {Button, Grid, Image, Transition, Container, Header, Icon, Segment,} from 'semantic-ui-react'
import logo  from '../assets/logo.png'

const transition = "fly left"

class Homepage extends React.Component {
    handleClick = () => {
        Adapter.isLoggedIn() 
        ?     
        this.props.history.push("/upload")
        :
        this.props.history.push("/register")
    }

    render(){
    return (
        <div style={{height: window.innerHeight}} className="backgroundImg">
        <Segment
            textAlign='center'
            style={{ 
            minHeight: 700, 
            padding: '1em 0em',
            marginTop: '100px',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
         }}
            vertical
        >
            <Container text>
            <img style={{maxWidth: "100%"}}src={logo} alt=""/>
            <Header
            as='h1'
            content='Application for Converting Image of Text into Audio'
            inverted
            style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                marginTop: '1.5em',
                color: "blue",
            }}
            /><br/>
            <Button onClick={() => this.handleClick()} primary size='huge'>
            Get Started
            <Icon name='right arrow' />
            </Button>
        </Container>
    </Segment>
    </div>
    )
    }
}

export default Homepage;