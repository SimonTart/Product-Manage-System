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
import reqwest from 'reqwest';
import {
	AccountTextField,
	PasswordBox,
	NameTextField,
	SexSelectField,
	PostionTextField,
	PhoneTextField,
	BirthdayPicker,
	AddressTextField
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
		var result = this.checkInfo();
		var _this = this;
		if (!result || this.state.state === 'pending') {
			return;
		}
		this.setState({ state: 'pending' });
		reqwest({
			url: '/api/user',
			method: 'POST',
			data: result,
			type: 'json'
		}).then(function (res) {
			if (res.statuCode === 0) {

			} else {

			}
			_this.alertMessage(res.message);
			_this.setState({ state: 'end' });
		}).fail(function (err, message) {
			_this.setState({ state: 'end' });
			_this.alertMessage('网络错误，请重试');
		})
	},
	checkInfo: function () {
		var account = document.querySelector('#account').value;
		var password = document.querySelector('#password').value;
		var repassword = document.querySelector('#repassword').value;
		var name = document.querySelector('#name').value;
		var sex = this.state.sex;

		var optionalValueCollection = {
			position: document.querySelector('#position').value,
			phone: document.querySelector('#phone').value,
			birthday: this.state.birthday,
			address: document.querySelector('#address')
		};
		var optionalValue = ['position', 'phone', 'birthday', 'address'];

		if (account.length < 5 || account.length > 15) {
			this.alertMessage('账号必须由5-15位大小写字母和数字组成');
			return false;
		}
		if (password.length < 5 || password.length > 15) {
			this.alertMessage('密码长度必须在5-15之间');
			return false;
		}
		if (password !== repassword) {
			this.alertMessage('两次输入的密码不一致');
			return false;
		}
		if (name === '') {
			this.alertMessage('姓名不能为空');
			return false;
		}

		var userInfo = {
			account: account,
			password: password,
			name: name,
			sex: sex === 'man' ? 1 : 0
		};

		optionalValue.forEach(function (value) {
			if (optionalValueCollection[value]) {
				userInfo[value] = value;
			}
		});
		return userInfo;
	},
	alertMessage: function (tip) {
		this.setState({ message: tip, open: true });
	},
	onSexChange: function (e, sex) {
		this.setState({ sex: sex });
	},
	handleBirthdayChange: function (e, date) {
		var formatDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
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
							<SexSelectField onChange={this.onSexChange}/>
							<BirthdayPicker onChange={this.handleBirthdayChange}/>
							<PhoneTextField id="phone"/>
							<br/>
							<PostionTextField id="position"/>
							<br/>
							<AddressTextField id="address"/>
							<br/>
							<RaisedButton 
								label={this.state.state === 'peding' ? '正在添加':'添加'} 
								style={confirmBtnStyle} 
								secondary={true} 
								onClick={this.onSubmit}
							/>
						</div>
						<Snackbar
							open={this.state.open}
							message={this.state.message}
							autoHideDuration={2000}
							onRequestClose={this.handleMessageShow}
							disabled={this.state.state === 'pending'}
						/>
					</div>
				</Paper>
			</div>
		);
	}
});

export {AddUser};