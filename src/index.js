import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
import './index.css';
import App from 'pages/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<SocialIcon url="https://twitter.com/" fgColor="#000000" />, document.getElementById("twitter"));
ReactDOM.render(<SocialIcon url="https://www.facebook.com/" fgColor="#000000" />, document.getElementById("facebook"));
ReactDOM.render(<SocialIcon url="https://www.linkedin.com/uas/login" fgColor="#000000" />, document.getElementById("linkedin"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
