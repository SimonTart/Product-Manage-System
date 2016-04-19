import ReactDom from 'react-dom';
import React from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
import {
	Router, Route, Link,useRouterHistory
}
from 'react-router';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LeftNavBar from './app/left-nav/left-nav-bar.jsx';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

injectTapEventPlugin();

const App = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},
	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme({
				fontFamily: '"Helvetica Neue",Helvetica,Arial,STHeiti,"Microsoft Yahei",sans-serif',
				fontSize: 14,
				lineHeight:14
			})
		};
	},
	render: function() {
		return (
			<div>
				<LeftNavBar />
				{this.props.children}
			</div>
		);
	}
});

//export default App;
//ReactDom.render(<App />, document.getElementById('app'));


const Home = React.createClass({
	render: function(){
		return (
			<div>HMOE</div>
		);
	}
});

const Test = React.createClass({
	render: function(){
		return (
			<div>Test</div>
		);
	}
});


const AppRouter =  React.createClass({
	render: function(){
		return (
				<Router history={appHistory}>
				    <Route path="/" component={App}>
				      <Route path="test" component={Test} />
				    </Route>
				</Router>

			);
	}
});


ReactDom.render(<AppRouter />, document.getElementById('app'));