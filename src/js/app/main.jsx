import ReactDom from 'react-dom';
import React from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LeftNavBar from './left-nav/left-nav-bar.jsx';

injectTapEventPlugin();

const appContentStyle = {
	paddingLeft:256
};
const AppContent = React.createClass({
	render: function(){
		return (<div style={appContentStyle}></div>);
	}
});

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
				<AppContent>{this.props.children}</AppContent>
			</div>
		);
	}
});


export default App;