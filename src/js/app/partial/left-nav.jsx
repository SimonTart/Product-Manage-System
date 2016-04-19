import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LoginUser from '../components/left-nav/loginUser.jsx';
import Product from '../components/left-nav/product.jsx';
import User from '../components/left-nav/user.jsx';
import {Link} from 'react-router';

export default React.createClass({

	render: function() {
		return (<LeftNav>
					<LoginUser/>
					<Product/>
					<User/>
       			</LeftNav>);
	}
});
