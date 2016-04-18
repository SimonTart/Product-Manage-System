import ReactDom from 'react-dom';
import React from 'react';
import {
	Router, Route, Link
}
from 'react-router';
import LeftNavBar from './app/left-nav/left-nav-bar.jsx';

const App = React.createClass({
	render: function() {
		return (
			<div>
				<LeftNavBar />
			</div>
		);
	}
});

ReactDom.render(<App />, document.getElementById('app'));