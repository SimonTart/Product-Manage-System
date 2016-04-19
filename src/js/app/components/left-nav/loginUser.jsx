import React from 'react';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item';

import Avatar from 'material-ui/lib/avatar';
import PermIdentity from 'material-ui/lib/svg-icons/action/perm-identity';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Exit from 'material-ui/lib/svg-icons/action/exit-to-app';

const listItemStyle = {
	color: Colors.blue500,
	fontWeight: 500
};

const secondListItems = [
	<ListItem
		primaryText="修改资料"
		key={1}
		leftIcon={<ModeEdit/>}
		containerElement={<Link to="/test" />}
	    />,
	<ListItem
		primaryText="退出登录"
		leftIcon={<Exit/>}
		key={2}
	/>
];

export default React.createClass({
	handleToggle: function() {
		console.log('test');
	},
	render: function() {
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftAvatar={<Avatar backgroundColor={Colors.blue500} icon={<PermIdentity />} />}
				primaryText = "SimonTart"
				nestedItems = {secondListItems}
				style = {listItemStyle}
			>
			</ListItem>
	);
}

});