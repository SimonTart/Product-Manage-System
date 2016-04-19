import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item';
import PermIdentity from 'material-ui/lib/svg-icons/action/perm-identity';
import Colors from 'material-ui/lib/styles/colors';
import {Link} from 'react-router';

const listItemStyle = {
	color: Colors.blue500,
	fontWeight: 500
};

const secondListItemStyle = {
	fontSize: 14
};
const ChangeUserInfo = React.createClass({
	render: function() {
		return (
			<ListItem

            primaryText="Starred"
          />
		);
	}
})
export default React.createClass({
	handleToggle: function() {
		console.log('test');
	},
	render: function() {
		return (
			<ListItem primaryTogglesNestedList= {true}
				leftAvatar={<Avatar backgroundColor={Colors.blue500} icon={<PermIdentity />} />}
				primaryText = "SimonTart"
				nestedItems = {
					[
						<ListItem
				        	primaryText="修改个人信息"
				        	key={1}
	    					linkButton={true}
  							containerElement={<Link to="/test" />}
					        />,
						<ListItem
				        	primaryText="退出登录"
				        	key={2}
					    />
					]
				}
				style = {listItemStyle}
			>

			</ListItem>
	);
}

});