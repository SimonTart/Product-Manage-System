import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router'

import AccountBox from 'material-ui/lib/svg-icons/action/account-box';
import Add from 'material-ui/lib/svg-icons/content/add';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';

const secondListItems = [
	 <ListItem
    	primaryText="查找"
    	key={1}
    	leftIcon={<Search/>}
    />,
    <ListItem
        primaryText="修改"
        key={2}
        leftIcon={<ModeEdit/>}
    />,
    <ListItem
        primaryText="添加"
        key={3}
        leftIcon={<Add/>}
        containerElement={<Link to="/user/add"/>}
    />,
	<ListItem
    	primaryText="删除"
    	key={4}
    	leftIcon={<Delete/>}
    />
];

export default React.createClass({
	render: function() {
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftIcon={<AccountBox/>}
				primaryText = "用户管理"
				nestedItems = {secondListItems}
			>
			</ListItem>
	);
}

});