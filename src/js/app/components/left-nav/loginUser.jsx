import React from 'react';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item';

import Avatar from 'material-ui/lib/avatar';
import PermIdentity from 'material-ui/lib/svg-icons/action/perm-identity';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Exit from 'material-ui/lib/svg-icons/action/exit-to-app';
import reqwest from 'reqwest';

const listItemStyle = {
	color: Colors.blue500,
	fontWeight: 500
};


function handleLogOut() {
	reqwest({
		url: '/api/logout',
		method: 'POST',
		type: 'json'
	}).then(function (res) {
		if (res.statusCode === 0) {
			window.location.href = '/login';
		} else {
			console.error(res.message);
		}
	}).fail(function (err) {
		console.error(err);
	});
};

export default React.createClass({
	render: function () {
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftAvatar={<Avatar backgroundColor={Colors.blue500} icon={<PermIdentity />} />}
				primaryText = {this.props.userName}
				nestedItems = {[
					<ListItem
						primaryText="修改密码"
						key={1}
						leftIcon={<ModeEdit/>}
						containerElement={<Link to={'/user/edit/' + this.props.userId} />}
						/>,
					<ListItem
						primaryText="退出登录"
						leftIcon={<Exit/>}
						key={2}
						onClick={handleLogOut}
						/>
				]}
				style = {listItemStyle}
				>
			</ListItem>
		);
	}

});