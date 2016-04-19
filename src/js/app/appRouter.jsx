import { Router, Route,useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import React from 'react';
import App from './main.jsx';
import {AddUser} from './partial/user.jsx';

const AppHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const Test = React.createClass({
	render:function(){
		return (
			<div>this is test</div>
		);
	}
});

const AppRouter =  React.createClass({
	render: function(){
		return (
				<Router history={AppHistory}>
				    <Route path="/" component={App}>
				      <Route path="test" component={Test} />
				      <Route path="/user/add" component={AddUser}/>
				    </Route>
				</Router>

			);
	}
});
export default AppRouter;

