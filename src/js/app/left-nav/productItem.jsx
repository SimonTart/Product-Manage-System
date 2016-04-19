import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';
import Polymer from 'material-ui/lib/svg-icons/action/polymer';
import Add from 'material-ui/lib/svg-icons/content/add';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';


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
				leftIcon={<Polymer/>}
				primaryText = "商品管理"
				nestedItems = {
					[
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
					    />,
						<ListItem
				        	primaryText="删除"
				        	key={4}
				        	leftIcon={<Delete/>}
					    />
					]
				}
				onNestedListToggle = {this.handleToggle}
			>
			</ListItem>
	);
}

});