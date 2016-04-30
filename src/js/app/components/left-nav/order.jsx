import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

import ContentPaste from 'material-ui/lib/svg-icons/content/content-paste';
import Add from 'material-ui/lib/svg-icons/content/add';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';

const secondListItems = [
	<ListItem
		primaryText="查找"
		key={1}
		leftIcon={<Search/>}
		containerElement={<Link to="/order/list"/>}
		/>,
	<ListItem
		primaryText="添加"
		key={2}
		leftIcon={<Add/>}
		containerElement={<Link to="/order/add"/>}
		/>
];

export default React.createClass({
	render: function () {
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftIcon={<ContentPaste />}
				primaryText = "订单"
				nestedItems = {secondListItems}
				>
			</ListItem>
		);
	}

});