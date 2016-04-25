import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import reqwest from 'reqwest';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


var UserItem = React.createClass({
    handleClickDelete: function () {
        this.props.clickDelete(this.props.user);
    },
    render: function () {
        return (
            <TableRow>
                <TableRowColumn>{this.props.user.account}</TableRowColumn>
                <TableRowColumn>{this.props.user.name}</TableRowColumn>
                <TableRowColumn>{this.props.user.position}</TableRowColumn>
                <TableRowColumn>{this.props.user.sex === 0 ? '男' : '女'}</TableRowColumn>
                <TableRowColumn>{this.props.user.phone}</TableRowColumn>
                <TableRowColumn>{this.props.user.address}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="查看详情"
                        secondary={true}
                        />
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton label="编辑" secondary={true}/>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="删除"
                        primary={true}
                        onClick={this.handleClickDelete}
                        />
                </TableRowColumn>
            </TableRow>
        );
    }
});

export default React.createClass({
    loadUser: function (key, page) {
        var timeStamp = new Date().getTime();
        this.timeStamp = timeStamp;
        var data = {
            _: timeStamp
        };
        if (!!key) {
            data.key = key;
        }
        if (page !== undefined) {
            data.page = page;
        }
        reqwest({
            url: '/api/user',
            method: 'GET',
            type: 'json',
            data: data
        }).then(function (res) {
            console.log(timeStamp + 'key');
            if (res.statusCode === 0) {
                this.setState({
                    users: res.users,
                    pageNum: res.pageNum,
                    page: 1
                });
            }
        }.bind(this)).fail(function (err) {
            console.error(err);
        })
    },
    getInitialState: function () {
        return {
            users: [],
            deleteUser: {},
            confirmOpen: false,
            page: 1,
            pageNum: 1
        }
    },
    componentDidMount: function () {
        this.loadUser();
    },
    handleSearchKeyChange: function (e) {
        this.searchKey = e.target.value;
        this.loadUser(this.searchKey);
    },
    handleClickDelete: function (user) {
        this.setState({
            confirmOpen: true,
            deleteUser: user
        });
    },
    handleCancelDelete: function () {
        this.setState({
            confirmOpen: false
        });
    },
    handleDeleteUser: function () {
        var deleteUser = this.state.deleteUser;
        reqwest({
            url: '/api/user/delete',
            method: 'POST',
            type: 'json',
            data: {
                id: deleteUser._id
            }
        }).then(function (res) {
            if (res.statusCode === 0 && res.resultCode === 0) {
                var users = this.state.users.filter(function (user) {
                    return user._id !== deleteUser._id;
                });
                this.setState({
                    users: users
                });
            }
            alert(res.message);
            this.setState({
                confirmOpen: false
            });
        }.bind(this)).fail(function (err) {
            console.error(err);
            alert('删除失败，请重试');
        }.bind(this));
    },
    handleNextPage: function () {
        this.loadUser(this.searchKey, this.state.page + 1)
    },
    render: function () {
        const actions = [
            <FlatButton
                label="取消"
                secondary={true}
                onClick={this.handleCancelDelete}
                />,
            <FlatButton
                label="确定"
                primary={true}
                onClick={this.handleDeleteUser}
                />,
        ];
        return (
            <div>
                <span>搜索：</span>
                <TextField
                    onChange= {this.handleSearchKeyChange}
                    />
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>账号</TableHeaderColumn>
                            <TableHeaderColumn>名字</TableHeaderColumn>
                            <TableHeaderColumn>职务</TableHeaderColumn>
                            <TableHeaderColumn>性别</TableHeaderColumn>
                            <TableHeaderColumn>联系方式</TableHeaderColumn>
                            <TableHeaderColumn>住址</TableHeaderColumn>
                            <TableHeaderColumn>查看详情</TableHeaderColumn>
                            <TableHeaderColumn>编辑</TableHeaderColumn>
                            <TableHeaderColumn>删除</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.state.users.map(function (user) {
                            return (
                                <UserItem
                                    user={user}
                                    key={user._id}
                                    clickDelete={this.handleClickDelete}
                                    />
                            );
                        }.bind(this)) }
                    </TableBody>
                </Table>
                <FlatButton
                    label="上一页"
                    secondary={true}
                    onClick={this.handleCancelDelete}
                    style={{ display: this.state.page === 1 ? 'none' : 'inline-block' }}
                    onClick={this.handlePrePage}
                    />
                <FlatButton
                    label="下一页"
                    secondary={true}
                    onClick={this.handleCancelDelete}
                    style={{ display: this.state.page === this.state.pageNum ? 'none' : 'inline-block' }}
                    onClick={this.handleNextPage}
                    />
                <Dialog
                    modal={false}
                    open={this.state.confirmOpen}
                    repositionOnUpdate={false}
                    modal={true}
                    actions={actions}
                    >
                    确认删除账号为{this.state.deleteUser.account}, 姓名为{this.state.deleteUser.name}的用户吗?
                </Dialog>
            </div>
        );
    }
});