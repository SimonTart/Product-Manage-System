import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

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
				<PasswordTextField onPasswordChange={this.passwordChange}/><br />
				<RePasswordTextField password={this.state.password}/>
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
	render: function(){
		return(
			<div>
				<p style={selectStyles.title}>性别</p>
				<RadioButtonGroup name="sex" defaultSelected="man">
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
		    />
		);
	}
});
export {
	AccountTextField,
	PasswordBox,
	NameTextField,
	SexSelectField,
	PostionTextField,
	PhoneTextField
};