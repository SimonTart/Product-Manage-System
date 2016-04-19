import { Router, Route,useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import React from 'react';
import App from './main.jsx';

const AppHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const Test = React.createClass({
	render:function(){
		return (
			<div>tes</div>
		);
	}
});

const AppRouter =  React.createClass({
	render: function(){
		return (
				<Router history={AppHistory}>
				    <Route path="/" component={App}>
				      <Route path="test" component={Test} />
				    </Route>
				</Router>

			);
	}
});
export default AppRouter;

