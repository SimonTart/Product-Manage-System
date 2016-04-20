import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';

import {
	AccountTextField,
	PasswordBox,
	NameTextField,
	SexSelectField,
	PostionTextField,
	PhoneTextField,
	BirthdayPicker
} from '../components/user/addUser.jsx';


const hintStyle = {
	color: Colors.grey500
};

const floatingLabelStyle = {
	color: Colors.grey900
};

const paperBoxStyle = {
	padding: '25px 30px 150px 25px'
};

const centerBoxStyle = {
	display: 'inline-block',
	position: 'relative',
	left: '50%',
	transform: 'translateX(-50%)'
};

const confirmBtnStyle = {
	marginTop: 40,
	width: 256
}

const AddUser = React.createClass({
	getInitialState: function () {
		return {
			message: '',
			open: false
		}
	},
	onSubmit: function () {
		var account = document.querySelector('#account').value;
		var password = document.querySelector('#password').value;
		var repassword = document.querySelector('#repassword').value;
		var name = document.querySelector('#name').value;
		var position = document.querySelector('#position').value;
		var sex = this.state.sex;
		var birthday = this.state.birthday;
		if (account.length < 5 || account.length > 15) {
			this.alertMessage('账号必须由5-15位大小写字母和数字组成');
			return;
		}
	},
	alertMessage: function (tip) {
		this.setState({ message: tip, open: true });
	},
	onSexChange: function (e, sex) {
		this.setState({ sex: sex });
	},
	onBirthdayChange: function (e, date) {
		var formatDate = date.getFullYears() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
		this.setState({ birthday: formatDate });
	},
	handleMessageShow: function () {
		this.setState({ open: false });
	},
	render: function () {
		return (
			<div>
				<Paper>
					<div style={paperBoxStyle}>
						<div style={centerBoxStyle}>
							<p>添加用户</p>
							<AccountTextField id="account"/>
							<br/>
							<PasswordBox id="password"/>
							<NameTextField id="name"/>
							<br/>
							<SexSelectField onSexChange={this.onSexChange}/>
							<PostionTextField id="position"/>
							<br/>
							<PhoneTextField id="birthday"/>
							<BirthdayPicker />
							<RaisedButton label="添加" style={confirmBtnStyle} secondary={true} onClick={this.onSubmit}/>
						</div>
					</div>
				</Paper>
				<Snackbar
					open={this.state.open}
					message={this.state.message}
					autoHideDuration={2000}
					onRequestClose={this.handleMessageShow}
				/>
			</div>
		);
	}
});

export {AddUser};