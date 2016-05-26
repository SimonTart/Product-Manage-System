import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LoginUser from '../components/left-nav/loginUser.jsx';
import Product from '../components/left-nav/product.jsx';
import User from '../components/left-nav/user.jsx';
import Order from '../components/left-nav/order.jsx';
import Report from '../components/left-nav/report.jsx';
import {Link} from 'react-router';

export default React.createClass({
	render: function () {
		return (<LeftNav style={{width:245}}>
			<LoginUser
				userName={this.props.user.name}
				userId={this.props.user._id}
				/>
			<Product
				user={this.props.user}
				/>
			<User
				user={this.props.user}
				/>
			<Order
				user={this.props.user}/>
			<Report
				user={this.props.user}
				/>
		</LeftNav>);
	}
});
