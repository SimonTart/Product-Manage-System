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
import ProductSale from './partial/product/productSale.jsx'
import AddOrder from './partial/order/addOrder.jsx';
import OrderProductEdit from './partial/order/orderProductEdit.jsx';
import OrderList from './partial/order/orderList.jsx';
import OrderDetail from './partial/order/orderDetail.jsx';
import OrderEdit from './partial/order/orderEdit.jsx';
import Report from './partial/report.jsx';
import reqwest from 'reqwest';
import ReportProductSaleRank from './partial/report/productSaleRank.jsx';
import SaleIncomLine from './partial/report/saleIncomeLine.jsx';
import passwordModify from './partial/user/passwordModify.jsx';


const AppHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const Transition = React.createClass({
	render: function () {
		return (
			<div></div>
		)
	}
});
const AppRouter = React.createClass({
	getInitialState: function () {
		let res = this.loadCurrentUserSync();
		let user = [];
		if (res.statusCode === 0 && res.resultCode === 0) {
			user = res.user;
		}
		return {
			user: user
		}
	},
	loadCurrentUserSync: function () {
		let xhr = new XMLHttpRequest();
		xhr.open('get', '/api/user/current', false);
		xhr.send(null);
		if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
			return JSON.parse(xhr.responseText);
		} else {
			return 'error';
		}
	},
	render: function () {
		return (
			<Router history={AppHistory}>
				<Route path="/" user={this.state.user} component={App}>
					<Route path="/transition"  component={Transition}/>
					<Route path="/user/add" component={AddUser}/>
					<Route
						path="/user/list"
						authority={this.state.user.authority}
						component={UserList}/>
					<Route path="/user/password/modify" component={passwordModify}/>
					<Route path="/user/detail/:id" component={UserDetail}/>
					<Route path="/user/edit/:id" component={EditUser}/>
					<Route path="/product/sale" component={ProductSale} />
					<Route path="/product/add" component={AddProduct} />
					<Route
						path="/product/list"
						authority={this.state.user.authority}
						component={ProductList}
						/>
					<Route path="/product/detail/:id" component={ProductDetail}/>
					<Route path="/product/edit/:id" component={ProductEdit}/>
					<Route path="/order/add" component={AddOrder} />
					<Route
						path="/order/list"
						authority={this.state.user.authority}
						component={OrderList} />
					<Route path="/order/detail/:id" component={OrderDetail} />
					<Route path="/order/edit/:id" component={OrderEdit} />
					<Route path="/orderproduct/edit/:id" component={OrderProductEdit} />
					<Route path="/report" component={Report}/>
					<Route path="/report/product/sale/rank" component={ReportProductSaleRank} />
					<Route path="/report/sale/income/line" component={SaleIncomLine} />
				</Route>
			</Router>

		);
	}
});
export default AppRouter;

