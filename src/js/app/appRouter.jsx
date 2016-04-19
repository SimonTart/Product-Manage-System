import { Router, Route, Link } from 'react-router';
import React from 'React';

const Home = React.createClass({
	render: function(){
		return (
			<div>HMOE</div>
		);
	}
})
const Test = React.createClass({
	render: function(){
		return (
			<div>Test</div>
		);
	}
})




export default AppRouter =  React.createClass({
	render: function(){
		return (<Router>
				    <Route path="/" component={App}>
				      <Route path="test" component={Test} />
				    </Route>
				</Router>
				);
	}
});

