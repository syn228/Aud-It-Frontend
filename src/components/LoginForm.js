import React, { Component } from 'react';
import { connect } from "react-redux"
import { logInChange, persistUser } from "../actions"
import Adapter from "./Adapter"
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import homelogo from '../assets/homelogo.png'

class LoginForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        Adapter.postSession(this.props.username, this.props.password, this.props.persistUser, this.props.history)
    }

    render() {
        return (
            <div style={{height: window.innerHeight}} className="background-image">
            <div style={{paddingTop: '120px'}}className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }`}
                </style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          <Image src={homelogo} /><br/> Log-in to your account
        </Header>
        <Form onSubmit={this.handleSubmit} onChange={this.props.handleChange}  size='large'>
          <Segment stacked>
            <Form.Input value={this.props.username} type="text" id="username" fluid icon='user' iconPosition='left' placeholder='Username' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              id="password"
              value={this.props.password}
              placeholder='Password'
              type='password'
            />

            <Button color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an account? <a href='/register'>Register</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
  </div>
        )
    }
}

function mapStateToProps(state){
    return {
    username: state.loginUsername,
    password: state.loginPassword,
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleChange: (event) => dispatch(logInChange(event)),
        persistUser: (userId) => dispatch(persistUser(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);