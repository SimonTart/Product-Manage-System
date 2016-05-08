import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

import ContentPaste from 'material-ui/lib/svg-icons/content/content-paste';
import Add from 'material-ui/lib/svg-icons/content/add';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import {arrayHas} from '../utils.jsx';


export default React.createClass({
	render: function () {
		let authority = this.props.user.authority || [];
        let isFind = authority.indexOf(10);
        let isAdd = authority.indexOf(11);
        let isOrder = arrayHas(authority, [10, 11, 12, 13]);
		const secondListItems = [
			<ListItem
				primaryText="查找"
				key={1}
				leftIcon={<Search/>}
				containerElement={<Link to="/order/list"/>}
				style={{
					display: isFind ? 'block' : 'none'
				}}
				/>,
			<ListItem
				primaryText="添加"
				key={2}
				leftIcon={<Add/>}
				containerElement={<Link to="/order/add"/>}
				style={{
					display: isAdd ? 'block' : 'none'
				}}
				/>
		];
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftIcon={<ContentPaste />}
				primaryText = "订单"
				nestedItems = {secondListItems}
				style={{
					display: isOrder ? 'block' : 'none'
				}}
				>
			</ListItem>
		);
	}

});