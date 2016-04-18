import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon';
import PermIdentity from 'material-ui/lib/svg-icons/action/perm-identity';
import Colors from 'material-ui/lib/styles/colors';

const listItemStyle = {
	color: Colors.blue500,
	fontWeight:600
};
const ChangeUserInfo = React.createClass({
	render:function(){
		return (
			<ListItem

            primaryText="Starred"
          />
		);
	}
})
export default React.createClass({
	render: function() {
		return (
			<ListItem
				leftAvatar={<Avatar backgroundColor={Colors.blue500} icon={<PermIdentity />} />}
				primaryText="SimonTart"
				primaryTogglesNestedList={true}
				nestedItems={[
					<ListItem
			        	primaryText="修改个人信息"
			        	key={1}
			        />,
			        <ListItem
			        	primaryText="修改个人信息"
			        	key={2}
			        />
				]}
				style = {listItemStyle}

			>

			</ListItem>
		);
	}

});