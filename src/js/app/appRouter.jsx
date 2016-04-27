import { Router, Route, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import React from 'react';
import App from './main.jsx';
import {AddUser} from './partial/user/addUser.jsx';
import {UserDetail} from './partial/user/userDetail.jsx';
import {EditUser} from './partial/user/editUser.jsx';
import AddProduct from './partial/addProduct.jsx';
import UserList from './partial/user/userList.jsx';
import ProductList from './partial/productList.jsx';
import AddOrder from './partial/addOrder.jsx';

const AppHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const AppRouter = React.createClass({
	render: function () {
		return (
			<Router history={AppHistory}>
				<Route path="/" component={App}>
					<Route path="/user/add" component={AddUser}/>
					<Route path="/user/list" component={UserList}/>
					<Route path="/user/detail/:id" component={UserDetail}/>
					<Route path="/user/edit/:id" component={EditUser}/>
					<Route path="/product/add" component={AddProduct} />
					<Route path="/product/list" component={ProductList} />
					<Route path="/order/add" component={AddOrder} />
				</Route>
			</Router>

		);
	}
});
export default AppRouter;

