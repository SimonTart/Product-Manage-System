import { Router, Route, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import React from 'react';
import App from './main.jsx';
import {AddUser} from './partial/user/addUser.jsx';
import {UserDetail} from './partial/user/userDetail.jsx';
import {EditUser} from './partial/user/editUser.jsx';
import UserList from './partial/user/userList.jsx';
import AddProduct from './partial/product/addProduct.jsx';
import ProductList from './partial/product/productList.jsx';
import ProductDetail from './partial/product/productDetail.jsx';
import ProductEdit from './partial/product/productEdit.jsx';
import AddOrder from './partial/addOrder.jsx';


const AppHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const Transition = React.createClass({
	render: function(){
		return (
			<div>trnsition</div>
		)
	}
});
const AppRouter = React.createClass({
	render: function () {
		return (
			<Router history={AppHistory}>
				<Route path="/" component={App}>
					<Route path="/transition" component={Transition}/>
					<Route path="/user/add" component={AddUser}/>
					<Route path="/user/list" component={UserList}/>
					<Route path="/user/detail/:id" component={UserDetail}/>
					<Route path="/user/edit/:id" component={EditUser}/>
					<Route path="/product/add" component={AddProduct} />
					<Route path="/product/list" component={ProductList}/>
					<Route path="/product/detail/:id" component={ProductDetail}/>
					<Route path="/product/edit/:id" component={ProductEdit}/>
					<Route path="/order/add" component={AddOrder} />
				</Route>
			</Router>

		);
	}
});
export default AppRouter;

