import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LoginUser from './loginUser.jsx';
import ProductItem from './productItem.jsx';
import UserItem from './userItem.jsx';
import {Link} from 'react-router';

export default React.createClass({

	render: function() {
		return (<LeftNav>
					<LoginUser/>
					<ProductItem/>
					<UserItem/>
       			</LeftNav>);
	}
});
