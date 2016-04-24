import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import reqwest from 'reqwest'

import areIntlLocalesSupported from 'intl-locales-supported';

const hintStyle ={
	color: Colors.grey500
};

const floatingLabelStyle={
	color: Colors.grey900
};


const AccountTextField = React.createClass({
	getInitialState:function(){
		return {
			errorText: '必填'
		};
	},
	handleChange: function(e){
		var account = e.target.value;
		if(account.length === 0){
			this.setState({errorText:'账号必填'});
			return;
		}
		if(account.length < 5 || account.length >15){
			this.setState({errorText:'账号由5-15个大小写字母和数字组成'});
			return;
		}
		if(/[^a-zA-Z0-9]/g.test(account)){
			this.setState({errorText:'账号只能由大小写字母和数字组成'});
			return;
		}
		this.setState({errorText:''});
	},
	handleAccountBlur: function (e) {
		var account = e.target.value;
		var accountLen = account.length;
		if(accountLen <5 || accountLen>15 || /[^0-9a-zA-Z]/g.test(account)){
			return;
		}
		var _this = this;
		reqwest({
			url: '/api/user/isAccountRepeat',
			method: 'POST',
			type:'json',
			data: {
				account: account
			}
		}).then(function (res) {
			if(res.statusCode === -9){
				window.location.href = '/login';
				return;
			}
			if(res.statusCode === 0 && res.resultCode ===0){
				_this.setState({
					errorText: res.message
				});
				_this.props.onQueryAccount(true);
			}else{
				_this.props.onQueryAccount(false);
			}
		}).fail(function(err){
			console.log(err);
		});
	},
	render: function(){
		return (
			<TextField
			  hintText="账号"
		      floatingLabelText="账号"
		      errorText={this.state.errorText}
		      hintStyle={hintStyle}
		      floatingLabelStyle={floatingLabelStyle}
		      onBlur={this.handleChange}
		      onChange={this.handleChange}
			  id={this.props.id}
			  onBlur = {this.handleAccountBlur}
		    />
		);
	}
});

const PasswordTextField = React.createClass({
	getInitialState:function(){
		return {
			errorText: '必填'
		};
	},
	handleChange: function(e){
		var password = e.target.value;
		var pwdLen = password.length;
		this.props.onPasswordChange(password);
		if(pwdLen===0){
			this.setState({errorText:'必填'});
			return;
		}
		if(pwdLen < 5 || pwdLen > 15){
			this.setState({errorText:'密码长度应在5-15之间'});
			return;
		}
		this.setState({errorText:''});
	},
	render: function(){
		return(
			<TextField
				hintText="密码"
			    floatingLabelText="密码"
			    errorText={this.state.errorText}
			    hintStyle={hintStyle}
			    floatingLabelStyle={floatingLabelStyle}
			    onBlur={this.handleChange}
			    onChange={this.handleChange}
			    type="password"
				id={this.props.id}
			/>
		);
	}
});

const RePasswordTextField = React.createClass({
	getInitialState:function(){
		return {
			errorText: '必填',
			rePassword: ''
		};
	},
	componentWillReceiveProps: function(nextProps){
		var password = nextProps.password;
		var rePassword = this.state.rePassword;
		if(password !== rePassword && rePassword !== ''){
			this.setState({errorText:'两次输入的密码不一致'});
			return;
		}
	},
	handleChange: function(e){
		var rePassword = e.target.value;
		var rePwdLen = rePassword.length;
		var password = this.props.password;
		this.setState({rePassword: rePassword});
		if(rePwdLen===0){
			this.setState({errorText:'必填'});
			return;
		}
		if(password !== rePassword){
			this.setState({errorText:'两次输入的密码不一致'});
			return;
		}
		this.setState({errorText:''});
	},
	render: function(){
		return(
			<TextField
				hintText="重复密码"
			    floatingLabelText="重复密码"
			    errorText={this.state.errorText}
			    hintStyle={hintStyle}
			    floatingLabelStyle={floatingLabelStyle}
			    onBlur={this.handleChange}
			    onChange={this.handleChange}
			    type="password"
				id={this.props.id}
			/>
		);
	}
});

const PasswordBox = React.createClass({
	getInitialState: function(){
		return {
			password: ''
		};
	},
	passwordChange: function(password){
		this.setState({password:password});
	},
	render: function(){
		return (
			<div>
				<PasswordTextField 
					onPasswordChange={this.passwordChange}
					id={this.props.id} 
				/><br />
				<RePasswordTextField 
					password={this.state.password}
					id={'re' + this.props.id}
				/>
			</div>
		);
	}
});

const NameTextField = React.createClass({
	getInitialState:function(){
		return {
			errorText: '必填'
		};
	},
	handleChange: function(e){
		var account = e.target.value;
		if(account.length === 0){
			this.setState({errorText:'姓名必填'});
			return;
		}
		this.setState({errorText:''});
	},
	render: function(){
		return (
			<TextField
			  hintText="姓名"
		      floatingLabelText="姓名"
		      errorText={this.state.errorText}
		      hintStyle={hintStyle}
		      floatingLabelStyle={floatingLabelStyle}
		      onBlur={this.handleChange}
		      onChange={this.handleChange}
			  id={this.props.id}
		    />
		);
	}
});

const selectStyles = {
	title: {
		marginBottom: 16,
	},
	radioButton: {
		marginBottom: 8,
	}
};

const SexSelectField = React.createClass({
	onChange: function(e,value) {
		this.props.onChange(e,value);
	},
	render: function(){
		return(
			<div>
				<p style={selectStyles.title}>性别</p>
				<RadioButtonGroup name="sex" defaultSelected="man" onChange={this.onChange}>
			      <RadioButton
			        value="man"
			        label="男"
			        style={selectStyles.radioButton}
			      />
			      <RadioButton
			        value="woman"
			        label="女"
			      />
			    </RadioButtonGroup>
			</div>
		);
	}
});

const PostionTextField = React.createClass({
	render: function(){
		return (
			<TextField
			  hintText="职务"
		      floatingLabelText="职务"
		      hintStyle={hintStyle}
		      floatingLabelStyle={floatingLabelStyle}
			  id={this.props.id}
		    />
		);
	}
});

const PhoneTextField = React.createClass({
	render: function(){
		return (
			<TextField
			  hintText="联系方式"
		      floatingLabelText="联系方式"
		      hintStyle={hintStyle}
		      floatingLabelStyle={floatingLabelStyle}
			  id={this.props.id}
		    />
		);
	}
});

const AddressTextField = React.createClass({
	render: function(){
		return(
			<TextField 
				hintText="住址"
				floatingLabelText="住址"
				hintStyle={hintStyle}
				floatingLabelStyle={floatingLabelStyle}
				id={this.props.id}
			/>	
		);	
	}
});

if (areIntlLocalesSupported('zh')) {
  var DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  require('intl/locale-data/jsonp/zh');
  var DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const birthdayTitle={marginTop:15};

function formatDate(date){
  return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}

const  BirthdayPicker = React.createClass({
	onChange: function (e,date) {
		this.props.onChange(e,date);		
	},
	render: function () {
		return (
			<div>
				<p style={birthdayTitle}>出生日期</p>
				<DatePicker
					hintText="出生日期"
					wordings={{ok: '确定', cancel: '取消'}}
					firstDayOfWeek={1}
					DateTimeFormat={DateTimeFormat}
					locale="zh"
					mode="landscape"
					formatDate={formatDate}
					onChange={this.onChange}
				/>	
			</div>
		);
	}	
});

export {
	AccountTextField,
	PasswordBox,
	NameTextField,
	SexSelectField,
	PostionTextField,
	PhoneTextField,
	AddressTextField,
	BirthdayPicker
};