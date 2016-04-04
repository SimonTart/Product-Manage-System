import React from "react";
import TextField from "material-ui/lib/text-field";
import RaisedButton from "material-ui/lib/raised-button";
import Paper from 'material-ui/lib/paper';

const LoginBtnStyle = {
	width: "210px",
	marginTop:"20px"
};

const LoginBoxStyle = {
	textAlign: "center"
};

const PaperStyle = {
  height: "auto",
  width: "auto",
  padding:"20px",
  "paddingTop": "0",
  textAlign: 'center',
  display: 'inline-block'
};

const LoginBox  = React.createClass({
	render: function(){
		return (
			<div style={LoginBoxStyle}>
			 <Paper style={PaperStyle} zDepth={1} rounded={false}>
			    <TextField
			    	hintText= "用户名"
			    	floatingLabelText = "用户名"
			    /><br/>
			    <TextField
			    	hintText= "密码"
			    	floatingLabelText = "密码"
			    	type="password"
			    /><br/>
			    <RaisedButton label="登录" secondary={true} style={LoginBtnStyle}/>
			 </Paper>
			  <p>户外用品管理系统</p>
			</div>
		);
	}
});

export default LoginBox;