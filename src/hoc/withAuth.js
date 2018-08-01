import React from 'react';
import Adapter from '../components/Adapter';
import {Redirect} from 'react-router'

function withAuth(Component) {
  return class extends React.Component {
    render() {
      if (Adapter.isLoggedIn()){
        return <Component/>
      }
      else {
        return <Redirect to="/login" />
      }
    }
  }
}
export default withAuth;