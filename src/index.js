import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import { Provider } from "react-redux"
import VoicePlayer from './VoicePlayer'
import thunkMiddleware from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css';

const store = createStore(reducer, applyMiddleware(thunkMiddleware))


ReactDOM.render(
<Provider store={store}>
<Router>
  <App>
    <VoicePlayer/>
  </App>
</Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
