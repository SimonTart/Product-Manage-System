import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';

import {
	AccountTextField,
	PasswordBox,
	NameTextField,
	SexSelectField,
	PostionTextField,
	PhoneTextField
} from '../components/user/addUser.jsx';


const hintStyle ={
	color: Colors.grey500
};

const floatingLabelStyle={
	color: Colors.grey900
};

const paperBoxStyle = {
	padding:'25px 30px'
};

const centerBoxStyle = {
	display: 'inline-block',
	position: 'relative',
	left: '50%',
	transform:'translateX(-50%)'
};
const AddUser = React.createClass({
	render: function(){
		return(
			<Paper>
				<div style={paperBoxStyle}>
				<div style={centerBoxStyle}>
					<p>添加用户</p>
					<AccountTextField tip="必填，账号由5-15个大小写字母和数字组成"/>
					<br/>
				 	<PasswordBox />
				    <NameTextField/>
				    <br/>
				    <SexSelectField/>
				    <PostionTextField/>
				    <br/>
				    <PhoneTextField />
				</div>
				</div>
			</Paper>
		);
	}
});
export {AddUser};