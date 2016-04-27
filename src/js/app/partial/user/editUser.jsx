import React from 'react';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
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
} from '../../components/user/addUser.jsx';


const hintStyle = {
    color: Colors.grey500
};

const floatingLabelStyle = {
    color: Colors.grey900
};

const paperBoxStyle = {
    padding: '25px 30px 150px 25px'
};


const confirmBtnStyle = {
    marginTop: 40,
    width: 256
}

const EditUser = React.createClass({
    getInitialState: function () {
        var editUser = this.syncGetUser(this.props.params.id);
        //var editUser = JSON.parse(window.location.href.match(/\?user=({[\d\D]*})$/)[1]);
        if (editUser.authority) {
            this.auth = editUser.authority.filter(function (auth) {
                return auth !== 1 && auth !== 6 && auth !== 10
            });
        } else {
            this.auth = [];
        }
        this.auth = editUser.authority || [];
        this.isAccountRepeat = false;
        return {
            message: '',
            open: false,
            productAuth: editUser.authority.indexOf(1) !== -1,
            userAuth: editUser.authority.indexOf(6) !== -1,
            orderAuth: editUser.authority.indexOf(10) !== -1,
            editUser: editUser,
            sex: editUser.sex,
            birthday: editUser.birthday
        }
    },
    onSubmit: function () {
        if (this.state.state === 'pending') {
            return;
        }
        this.setState({ state: 'pending' });
        var result = this.checkInfo();
        if (!result) {
            this.setState({ state: 'end' });
            return;
        }
        reqwest({
            url: '/api/user/modify',
            method: 'POST',
            data: result,
            type: 'json'
        }).then(function (res) {
            console.log(res);
            if (res.statuCode === -9) {
                window.location.href = '/login';
            } else if (res.statusCode === 0) {
                setTimeout(function () {
                    window.location.redirect = "/#/user/detail/" + this.props.params.id
                }, 1000);
            }
            this.alertMessage(res.message);
            this.setState({ state: 'end' });
        }.bind(this)).fail(function (err, message) {
            this.setState({ state: 'end' });
            this.alertMessage('网络错误，请重试');
        }.bind(this));
    },
    checkInfo: function () {
        var account = document.querySelector('#account').value;
        var name = document.querySelector('#name').value;
        var sex = this.state.sex;

        var optionalValueCollection = {
            position: document.querySelector('#position').value,
            phone: document.querySelector('#phone').value,
            birthday: this.state.birthday,
            address: document.querySelector('#address').value
        };
        var optionalValue = ['position', 'phone', 'birthday', 'address'];

        if (this.isAccountRepeat) {
            this.alertMessage('该账号名已被占用');
            return false;
        }
        if (account.length < 5 || account.length > 15) {
            this.alertMessage('账号必须由5-15位大小写字母和数字组成');
            return false;
        }
        // if (password.length < 5 || password.length > 15) {
        //     this.alertMessage('密码长度必须在5-15之间');
        //     return false;
        // }
        // if (password !== repassword) {
        //     this.alertMessage('两次输入的密码不一致');
        //     return false;
        // }
        if (name === '') {
            this.alertMessage('姓名不能为空');
            return false;
        }
        var authority = this.auth;
        const specialAuthKeyValue = {
            productAuth: 1,
            userAuth: 6,
            orderAuth: 10
        };
        ['productAuth', 'userAuth', 'orderAuth'].forEach(function (key) {
            if (this.state[key]) {
                authority.push(specialAuthKeyValue[key]);
            }
        }.bind(this));
        var userInfo = {
            id: this.state.editUser._id,
            account: account,
            name: name,
            sex: sex,
            authority: JSON.stringify(authority)
        };

        optionalValue.forEach(function (value) {
            if (optionalValueCollection[value]) {
                userInfo[value] = optionalValueCollection[value];
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
    getHandleAuthoToggle: function (index) {
        return function (event, value) {
            var auth = this.auth;
            console.log(index);
            console.log(auth);
            if (value) {
                this.auth.push(index);
            } else {
                this.auth.splice(auth.indexOf(index), 1)
            }
            this.syncToggle(index);
        }.bind(this)
    },
    syncToggle: function (index) {
        const authRange = {
            product: [2, 3, 4, 5],
            user: [7, 8, 9],
            order: [11, 12, 13]
        };
        for (var i in authRange) {
            if (authRange[i].indexOf(index) !== -1) {
                var newObj = {};
                newObj[i + 'Auth'] = true;
                this.setState(newObj);
                return;
            }
        }
    },
    handleProAuthBase: function () {
        if (this.state.productAuth === false) {
            this.setState({
                productAuth: true
            });
            return;
        }
        let productAuths = [2, 3, 4, 5];
        let selectAuths = this.auth;
        let checkResult = productAuths.some(function (authIndex) {
            return selectAuths.indexOf(authIndex) !== -1
        });
        if (!checkResult) {
            this.setState({
                productAuth: false
            });
        }
    },
    handleUserAuthBase: function () {
        if (this.state.userAuth === false) {
            this.setState({
                userAuth: true
            });
            return;
        }
        let userAuths = [7, 8, 9];
        let selectAuths = this.auth;
        let checkResult = userAuths.some(function (authIndex) {
            return selectAuths.indexOf(authIndex) !== -1
        });
        if (!checkResult) {
            this.setState({
                userAuth: false
            });
        }
    },
    handleOrderAuthBase: function () {
        if (this.state.orderAuth === false) {
            this.setState({
                orderAuth: true
            });
            return;
        }
        let orderAuths = [11, 12, 13];
        let selectAuths = this.auth;
        let checkResult = orderAuths.some(function (authIndex) {
            return selectAuths.indexOf(authIndex) !== -1
        });
        if (!checkResult) {
            this.setState({
                orderAuth: false
            });
        }
    },
    handleQueryAccount: function (isRepeat) {
        this.isAccountRepeat = isRepeat;
    },
    syncGetUser: function (id) {
        var xhr = new XMLHttpRequest();
        var url = '/api/user/detail/' + id;
        xhr.open('GET', url, false);
        xhr.send(null);
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            return JSON.parse(xhr.responseText).user;
        } else {
            return 'error';
        }
    },
    render: function () {
        const paperStyle = {
            overflow: 'hidden'
        };
        const leftAreaStyle = {
            paddingRight: 60,
            paddingLeft: 60,
            boxSizing: 'border-box',
            display: 'inline-block',
            float: 'left',
            borderRight: '1px solid #efefef',
            marginTop: 45
        };
        const titleStyle = {
            paddingTop: 25,
            textAlign: 'left',
            fontWeight: 600,
            fontSize: '24px',
            color: Colors.blue500
        };
        const infoTitleStyle = {
            fontSize: '20px'
        };
        const rightAreaStyle = {
            paddingLeft: 60,
            boxSizing: 'border-box',
            display: 'inline-block',
            float: 'left',
            marginTop: 45,
            maxWidth: '60%'
        };
        const authTitleStyle = {
            fontSize: '20px',
            marginBottom: 25
        };
        const authToggleStyle = {
            width: 'auto',
            display: 'inline-block',
            marginRight: 15,
            marginBottom: 25
        };
        const authTypeTitleStyle = {
            marginBottom: 15
        };
        const getDate = function (date) {
            var times = date.split('/');
            return new Date(times[0], times[1] - 1, times[2]);
        }
        return (
            <div>
                <Paper style={paperStyle}>
                    <div style={{ overflow: 'hidden' }}>
                        <p style={titleStyle}>添加用户</p>
                        <div style={leftAreaStyle}>
                            <p style={infoTitleStyle}>用户信息填写</p>
                            <AccountTextField
                                id="account"
                                onQueryAccount = {this.handleQueryAccount}
                                defaultValue={this.state.editUser.account}
                                editId={this.state.editUser._id}
                                />
                            <br/>
                            <NameTextField
                                id="name"
                                defaultValue ={this.state.editUser.name}
                                />
                            <br/>
                            <SexSelectField
                                onChange={this.onSexChange}
                                defaultValue ={this.state.editUser.sex}
                                />
                            <BirthdayPicker
                                onChange={this.handleBirthdayChange}
                                defaultValue ={
                                    this.state.editUser.birthday ?
                                        getDate(this.state.editUser.birthday) : null
                                }
                                />
                            <PhoneTextField
                                id="phone"
                                defaultValue={this.state.editUser.phone}
                                />
                            <br/>
                            <PostionTextField
                                id="position"
                                defaultValue={this.state.editUser.position}
                                />
                            <br/>
                            <AddressTextField
                                id="address"
                                defaultValue={this.state.editUser.address}
                                />
                            <br/>
                        </div>
                        <div style={rightAreaStyle} onToggle={this.getHandleAuthoToggle(9) }>
                            <p style={authTitleStyle}>用户权限</p>
                            <div>
                                <p style={authTypeTitleStyle}>商品管理权限(查看商品权限是其他权限的基础) </p>
                                <Toggle
                                    label="查看商品信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.handleProAuthBase}
                                    toggled = {this.state.productAuth}
                                    />
                                <Toggle
                                    label="添加商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(2) }
                                    defaultToggled ={this.auth.indexOf(2) !== -1}
                                    />
                                <Toggle
                                    label="编译商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(3) }
                                    defaultToggled ={this.auth.indexOf(3) !== -1}
                                    />
                                <Toggle
                                    label="删除商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(4) }
                                    defaultToggled ={this.auth.indexOf(4) !== -1}
                                    />
                                <Toggle
                                    label="出售商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(5) }
                                    defaultToggled ={this.auth.indexOf(5) !== -1}
                                    />
                            </div>
                            <div>
                                <p style={authTypeTitleStyle}>用户管理权限</p>
                                <Toggle
                                    label="查看用户信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.handleUserAuthBase }
                                    toggled={this.state.userAuth}
                                    />
                                <Toggle
                                    label="添加用户"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(7) }
                                    defaultToggled ={this.auth.indexOf(7) !== -1}
                                    />
                                <Toggle
                                    label="修改用户信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(8) }
                                    defaultToggled ={this.auth.indexOf(8) !== -1}
                                    />
                                <Toggle
                                    label="删除用户"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(9) }
                                    defaultToggled ={this.auth.indexOf(9) !== -1}
                                    />
                            </div>
                            <div>
                                <p style={authTypeTitleStyle}>订单管理权限</p>
                                <Toggle
                                    label="查看订单信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.handleOrderAuthBase }
                                    toggled={this.state.orderAuth}
                                    />
                                <Toggle
                                    label="新建订单"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(11) }
                                    defaultToggled ={this.auth.indexOf(11) !== -1}
                                    />
                                <Toggle
                                    label="编辑订单"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(12) }
                                    defaultToggled ={this.auth.indexOf(12) !== -1}
                                    />
                                <Toggle
                                    label="删除订单"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(13) }
                                    defaultToggled ={this.auth.indexOf(13) !== -1}
                                    />
                            </div>
                            <div>
                                <p style={authTypeTitleStyle}>报表管理权限</p>
                                <Toggle
                                    label="查看报表"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    onToggle={this.getHandleAuthoToggle(14) }
                                    defaultToggled ={this.auth.indexOf(14) !== -1}
                                    />
                            </div>
                        </div>
                        <br clear="both"/>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <RaisedButton
                            label={this.state.state === 'peding' ? '正在修改' : '修改'}
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
                </Paper>
            </div>
        );
    }
});

export {EditUser};