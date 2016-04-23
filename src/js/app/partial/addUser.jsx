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
import Toggle from 'material-ui/lib/toggle';

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
		const paperStyle= {
			overflow: 'hidden'
		}
		const leftAreaStyle = {
			paddingRight: 60,
			paddingLeft: 60,
			boxSizing: 'border-box',
			display: 'inline-block',
			float: 'left',
			borderRight: '1px solid #efefef',
			marginTop: 45
		}
		const titleStyle = {
			paddingTop: 25,
			textAlign: 'center',
			fontWeight: 600,
			fontSize: '24px',
			color: Colors.blue500
		}
		const infoTitleStyle = {
			fontSize: '20px',
		}
		const rightAreaStyle = {
			paddingLeft: 60,
			boxSizing: 'border-box',
			display: 'inline-block',
			float: 'left',
			marginTop: 45,
			maxWidth: '50%'
		}
		const authTitleStyle={
			fontSize: '20px',
			marginBottom: 25
		}
		const authToggleStyle={
			width: 'auto',
			display: 'inline-block',
			marginRight: 15,
			marginBottom: 25
		}
		const authTypeTitleStyle= {
			marginBottom:15
		}
		return (
			<div>
				<Paper style={paperStyle}>
					<p style={titleStyle}>添加用户</p>
					<div style={leftAreaStyle}>
						<p style={infoTitleStyle}>用户信息填写</p>
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
							label={this.state.state === 'peding' ? '正在添加' : '添加'}
							style={confirmBtnStyle}
							secondary={true}
							onClick={this.onSubmit}
							/>
					</div>
					<div style={rightAreaStyle}>
						<p style={authTitleStyle}>用户权限</p>
						<div>
							<p style={authTypeTitleStyle}>商品管理权限</p>
							<Toggle
								label="查看商品信息"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="添加商品"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="编译商品"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="删除商品"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="出售商品"
								labelPosition="right"
								style={authToggleStyle}
							/>
						</div>
						<div>
							<p style={authTypeTitleStyle}>用户管理权限</p>
							<Toggle
								label="查看用户信息"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="添加用户"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="修改用户信息"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="删除用户"
								labelPosition="right"
								style={authToggleStyle}
							/>
						</div>
						<div>
							<p style={authTypeTitleStyle}>订单管理权限</p>
							<Toggle
								label="查看订单信息"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="新建订单"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="编辑订单"
								labelPosition="right"
								style={authToggleStyle}
							/>
							<Toggle
								label="删除订单"
								labelPosition="right"
								style={authToggleStyle}
							/>
						</div>
						<div>
							<p style={authTypeTitleStyle}>报表管理权限</p>
							<Toggle
								label="查看报表"
								labelPosition="right"
								style={authToggleStyle}
							/>
						</div>
					</div>
					<Snackbar
						open={this.state.open}
						message={this.state.message}
						autoHideDuration={2000}
						onRequestClose={this.handleMessageShow}
						disabled={this.state.state === 'pending'}
						/>
				</Paper>
			</div>
		);
	}
});

export {AddUser};