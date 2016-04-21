import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

import Polymer from 'material-ui/lib/svg-icons/action/polymer';
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
		containerElement={<Link to="/product/add"/>}
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
				leftIcon={<Polymer/>}
				primaryText = "商品管理"
				nestedItems = {secondListItems}
			>
			</ListItem>
	);
}

});