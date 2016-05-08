import ReactDom from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LeftNavBar from './partial/left-nav.jsx';

injectTapEventPlugin();

const appContentStyle = {
	paddingLeft: 256
};

const appContentBoxStyle = {
	paddingLeft: '5%',
	paddingRight: '5%',
	position: 'relative'
};

const App = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},
	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme({
				fontFamily: '"Helvetica Neue",Helvetica,Arial,STHeiti,"Microsoft Yahei",sans-serif',
				fontSize: 14,
				lineHeight: 14
			})
		};
	},
	render: function () {
		return (
			<div>
				<LeftNavBar
					user={this.props.route.user}
					/>
				<div style={appContentStyle}>
					<div style={appContentBoxStyle}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});


export default App;