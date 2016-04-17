import React from 'react';
import ReactDom from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import MySampleAppComponent from './test.jsx';

var app = document.getElementById('app');
ReactDom.render(<MySampleAppComponent/>,app);