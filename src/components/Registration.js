import React, { Component } from 'react';
import { connect } from "react-redux"
import { registerChange, persistUser } from "../actions"
import register from '../registerServiceWorker';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import homelogo from '../assets/homelogo.png'
import Adapter from './Adapter'

class Registration extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            username: this.props.username,
            password: this.props.password,
            first_name: this.props.first_name,
            last_name: this.props.last_name
        }
        fetch(`http://localhost:4000/users/`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            if (json.username){
                localStorage.setItem('token', json.token);
                Adapter.postSession(this.props.username, this.props.password, this.props.persistUser, this.props.history)
            }
            else {
                alert("Something went wrong during your registration. Please try again later.")
            }
        })
    }

    render() {
        return (
            <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          <Image src={homelogo} /><br/> Create Account
        </Header>
        <Form onChange={this.props.handleChange}  size='large'>
          <Segment stacked>
            <Form.Input type="text" id="first_name" fluid icon='user' iconPosition='left' placeholder='First Name' />
            <Form.Input type="text" id="last_name" fluid icon='user' iconPosition='left' placeholder='Last Name' />
            <Form.Input value={this.props.registerUsername} type="text" id="username" fluid icon='user' iconPosition='left' placeholder='Username' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              id="password"
              value={this.props.registerPassword}
              placeholder='Password'
              type='password'
            />

            <Button onClick={this.handleSubmit} color='blue' fluid size='large'>
              Create Account
            </Button>
          </Segment>
        </Form>
        <Message>
          Already Have an Account? <a href='/login'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>












            // <div className="information">
            //     Please Enter Your Information:
            // <form onChange={this.props.handleChange} onSubmit={this.handleSubmit} className="login">
            //     <input type="text" placeholder="Username" id="username" value={this.props.registerUsername}/><br/>  
            //     <input type="password" placeholder="password" id="password" value={this.props.registerPassword}/><br/>
            //     <input type="first_name" placeholder="First Name" id="first_name" value={this.props.first_name}/><br/>
            //     <input type="last_name" placeholder="Last Name" id="last_name" value={this.props.last_name}/><br/>
            //     <input type="submit" value="Create Account"/>
            // </form>
            // </div>
        )
    }
}

function mapStateToProps(state){
    return {
    username: state.registerUsername,
    password: state.registerPassword
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleChange: (event) => dispatch(registerChange(event)),
        persistUser: (userId) => dispatch(persistUser(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);