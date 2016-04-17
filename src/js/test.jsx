import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import { Router, Route, Link } from 'react-router'
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

//import MyRawTheme from 'path/to/your/raw/theme/file';

const MySampleAppComponent = React.createClass({

  //the key passed through context must be called "muiTheme"
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme({
      	fontFamily: '"Helvetica Neue",Helvetica,Arial,STHeiti,"Microsoft Yahei",sans-serif'
      }),
    };
  },

  //the app bar and button will receive our theme through
  //context and style accordingly
  render () {
    const paperStyle = {
      width: 250
    };
    return (
      <div>
        <Paper style={paperStyle}>
           <FlatButton label="a" />
           <FlatButton label="b" />
            <FlatButton label="c" />
        </Paper>
      </div>
    );
  },
});

export default MySampleAppComponent;