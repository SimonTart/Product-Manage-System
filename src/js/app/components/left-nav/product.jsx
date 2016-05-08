import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

import Polymer from 'material-ui/lib/svg-icons/action/polymer';
import Add from 'material-ui/lib/svg-icons/content/add';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import ShoppingCart from 'material-ui/lib/svg-icons/action/shopping-cart';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import {arrayHas} from '../utils.jsx';



export default React.createClass({
	render: function () {
		let authority = this.props.user.authority || [];
		let isProduct = arrayHas(authority, [1, 2, 3, 4, 5]);
		let isAdd = authority.indexOf(2) !== -1;
		let isFind = authority.indexOf(1) !== -1;
		let isSale = authority.indexOf(5) !== -1;
		const secondListItems = [
			<ListItem
				primaryText="出售"
				key={1}
				leftIcon={<ShoppingCart />}
				containerElement={<Link to="/product/sale"/>}
				style={{
					display: isSale ? 'block' : 'none'
				}}
				/>,
			<ListItem
				primaryText="查找"
				key={2}
				leftIcon={<Search />}
				containerElement={<Link to="/product/list"/>}
				style={{
					display: isFind ? 'block' : 'none'
				}}
				/>,
			<ListItem
				primaryText="添加"
				key={3}
				leftIcon={<Add/>}
				containerElement={<Link to="/product/add"/>}
				style={{
					display: isAdd ? 'block' : 'none'
				}}
				/>
			// ,
			// <ListItem
			// 	primaryText="删除"
			// 	key={4}
			// 	leftIcon={<Delete/>}
			// />
		];
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftIcon={<Polymer/>}
				primaryText = "商品管理"
				nestedItems = {secondListItems}
				style={{
					display: isProduct ? 'block' : 'none'
				}}
				>
			</ListItem>
		);
	}

});