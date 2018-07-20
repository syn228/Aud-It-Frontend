import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from "redux"
import reducer from "./reducer"
import { Provider } from "react-redux"
import VoicePlayer from './VoicePlayer'


const store = createStore(reducer)


ReactDOM.render(<Provider store={store}><Router><App > <VoicePlayer
  play
  text="React voice player demonstration"
/>,</App></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
