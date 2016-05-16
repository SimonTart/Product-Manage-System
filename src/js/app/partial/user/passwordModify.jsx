import React from 'react';
import {PasswordBox} from '../../components/user/addUser.jsx';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import reqwest from 'reqwest'

const hintStyle = {
    color: Colors.grey500
};

const floatingLabelStyle = {
    color: Colors.grey900
};

export default React.createClass({
    getInitialState: function () {
        return {
            originErrorText: '必填',
            message: '',
            open: false
        }
    },
    handleOriginPasswordChange: function (e) {
        var password = e.target.value;
        var pwdLen = password.length;
        if (pwdLen === 0) {
            this.setState({ originErrorText: '必填' });
            return;
        }
        if (pwdLen < 5 || pwdLen > 15) {
            this.setState({ originErrorText: '密码长度应在5-15之间' });
            return;
        }
        this.setState({ originErrorText: '' });
    },
    alertMessage: function (message) {
        this.setState({
            message: message,
            open: true
        })
    },
    handleMessageShow: function () {
        this.setState({
            open: false,
            message: ''
        });
    },
    handleSubmit: function () {
        var data = this.checkInfo();
        if (!data) {
            return;
        }
        reqwest({
            url: '/api/user/password/modify',
            method: 'post',
            data: data,
            type: 'json'
        }).then((res) => {
            this.alertMessage(res.message);
            if (res.statusCode === -9) {
                setTimeout(function () {
                    window.location.href = '/login';
                }, 2000);
                return;
            }
            if (res.statusCode === 0 && res.resultCode === 0) {
                setTimeout(function () {
                    window.location.href = '/login';
                }, 2000);
            }
        }).fail((err) => {
            console.error(err);
        });
    },
    checkInfo: function () {
        let originPassword = document.querySelector('#originPassword').value;
        let password = document.querySelector('#password').value;
        let repassword = document.querySelector('#repassword').value;
        if (originPassword.length < 5 || originPassword.length > 15) {
            this.alertMessage('原密码长度应在5-15之间');
            return false;
        }
        if (password.length < 5 || password.length > 15) {
            this.alertMessage('密码长度应在5-15之间');
            return false;
        }
        if (password !== repassword) {
            this.alertMessage('两次密码输入不一致');
            return false;
        }
        return {
            originPassword: originPassword,
            password: password,
            repassword: repassword
        }

    },
    render: function () {
        let blockStyle = {
            paddingTop: 35
        }
        let btnStyle = {
            marginTop: 18,
            marginLeft: 10
        }
        return (
            <div style={blockStyle}>
                <TextField
                    hintText ="原密码"
                    floatingLabelText="原密码"
                    errorText = {this.state.originErrorText}
                    hintStyle = {hintStyle}
                    floatingLabelStyle={floatingLabelStyle}
                    onChange ={this.handleOriginPasswordChange}
                    type="password"
                    id="originPassword"
                    />
                <PasswordBox
                    id="password"
                    />
                <RaisedButton
                    label="确定"
                    style={btnStyle}
                    secondary={true}
                    onClick={this.handleSubmit}
                    />
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleMessageShow}
                    />
            </div>
        );
    }
})