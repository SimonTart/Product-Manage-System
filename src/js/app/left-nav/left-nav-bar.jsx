import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LoginUser from './loginUser.jsx';

export default React.createClass({
	render: function() {
		return (<LeftNav>
					<LoginUser/>
					<MenuItem>商品管理</MenuItem>
       			</LeftNav>);
	}
});
      			// <MenuItem>商品管理</MenuItem>
      			// <MenuItem>订单管理</MenuItem>
      			// <MenuItem>报表</MenuItem>