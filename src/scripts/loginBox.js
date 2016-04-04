import React from "react";
import TextField from "material-ui/lib/text-field";
import RaisedButton from "material-ui/lib/raised-button";
import IconButton from "material-ui/lib/icon-button";


const LoginBtnStyle = {
	width: "240px",

};

const LoginBox  = React.createClass({
	render: function(){
		return (
			<div>
			    <TextField hintText="用户名" /><br/>
			    <TextField hintText="密码" /><br/>
			    <RaisedButton label="登录" secondary={true} style={LoginBtnStyle}/>
			</div>
		);
	}
});

export default LoginBox;