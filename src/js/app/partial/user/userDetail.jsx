import React from 'react';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import reqwest from 'reqwest';
import Toggle from 'material-ui/lib/toggle';
import {Link} from 'react-router';



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

const UserDetail = React.createClass({
    getInitialState: function () {
        return {
            user: {
                addByUser: {},
                modifyByUser: {},
                authority: []
            }
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.loadUser(nextProps.params.id);
    },
    componentDidMount: function () {
        var userId = this.props.params.id;
        this.loadUser(userId);
    },
    loadUser: function (userId) {
        reqwest({
            url: '/api/user/detail/' + userId,
            method: 'GET',
            type: 'json'
        }).then(function (res) {
            if (res.statusCode === -9) {
                window.location.href = '/';
            } else if (res.statusCode === 0) {
                this.setState({
                    user: res.user
                });
            }
        }.bind(this)).fail(function (err) {
            console.error(err);
        });
    },
    formatDate: function (date) {
        var addDate = new Date(date);
        var formatedDate = '';
        formatedDate = formatedDate + addDate.getFullYear() + '/' + (addDate.getMonth() + 1) + '/' + addDate.getDate() + ' ';
        var hour = addDate.getHours();
        if (hour < 10) {
            formatedDate += '0';
        }
        formatedDate = formatedDate + hour + ':';
        var minute = addDate.getMinutes();
        if (minute < 10) {
            formatedDate += ' 0';
        }
        formatedDate = formatedDate + minute + ':';
        var second = addDate.getSeconds();
        if (second < 10) {
            formatedDate += ' 0';
        }
        formatedDate = formatedDate + second;
        return formatedDate;
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
            marginTop: 45,
            width: '35%'
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
        const infoLine = {
            marginBottom: 25
        }
        return (
            <div>
                <Paper style={paperStyle}>
                    <div style={{ overflow: 'hidden' }}>
                        <p style={titleStyle}>用户详细信息</p>
                        <div style={leftAreaStyle}>
                            <p style={infoLine}>用户资料</p>
                            <p 
                                color="red" 
                                style={{
                                    display:this.state.user.isLogoff!==1?'none':'block',
                                    color: 'red',
                                    marginBottom:25
                                }}>
                               该用户已被删除
                            </p>
                            <p style={infoLine}>账号： {this.state.user.account}</p>
                            <p style={infoLine}>名字： {this.state.user.name}</p>
                            <p style={infoLine}>性别： {this.state.user.sex === 0 ? '男' : '女'}</p>
                            <p style={infoLine}>职务： {this.state.user.position}</p>
                            <p style={infoLine}>联系方式：{this.state.user.phone}</p>
                            <p style={infoLine}>住址： {this.state.user.address}</p>
                            <p style={infoLine}>添加日期：
                                {this.formatDate(this.state.user.addDate) }
                            </p>
                            <p style={infoLine}>
                                添加者：
                                <Link to={'/user/detail/' + this.state.user.addByUser._id}>
                                    {this.state.user.addByUser.name}
                                </Link>
                            </p>
                            <p style={infoLine}>上次修改日期：
                                {this.formatDate(this.state.user.modifyDate) }
                            </p>
                            <p style={infoLine}>
                                修改者：
                                <Link to={'/user/detail/' + this.state.user.modifyByUser._id}>
                                    {this.state.user.modifyByUser.name}
                                </Link>
                            </p>
                            <br/>
                        </div>
                        <div style={rightAreaStyle}>
                            <p style={authTitleStyle}>用户权限</p>
                            <div>
                                <p style={authTypeTitleStyle}>商品管理权限(查看商品权限是其他权限的基础) </p>
                                <Toggle
                                    label="查看商品信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('1') !== -1}
                                    />
                                <Toggle
                                    label="添加商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('2') !== -1}
                                    />
                                <Toggle
                                    label="编辑商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('3') !== -1}
                                    />
                                <Toggle
                                    label="删除商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('4') !== -1}
                                    />
                                <Toggle
                                    label="出售商品"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('5') !== -1}
                                    />
                            </div>
                            <div>
                                <p style={authTypeTitleStyle}>用户管理权限</p>
                                <Toggle
                                    label="查看用户信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('6') !== -1}
                                    />
                                <Toggle
                                    label="添加用户"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('7') !== -1}
                                    />
                                <Toggle
                                    label="修改用户信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('8') !== -1}
                                    />
                                <Toggle
                                    label="删除用户"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('9') !== -1}
                                    />
                            </div>
                            <div>
                                <p style={authTypeTitleStyle}>订单管理权限</p>
                                <Toggle
                                    label="查看订单信息"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('10') !== -1}
                                    />
                                <Toggle
                                    label="新建订单"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('11') !== -1}
                                    />
                                <Toggle
                                    label="编辑订单"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('12') !== -1}
                                    />
                                <Toggle
                                    label="删除订单"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('13') !== -1}
                                    />
                            </div>
                            <div>
                                <p style={authTypeTitleStyle}>报表管理权限</p>
                                <Toggle
                                    label="查看报表"
                                    labelPosition="right"
                                    style={authToggleStyle}
                                    toggled={this.state.user.authority.indexOf('14') !== -1}
                                    />
                            </div>
                        </div>
                        <br clear="both"/>
                    </div>
                </Paper>
            </div>
        );
    }
});

export {UserDetail};