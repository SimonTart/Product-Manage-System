import React from 'react';
import {Link} from'react-router'
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
import Snackbar from 'material-ui/lib/snackbar';


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
                        linkButton={true}
                        containerElement={
                            <Link to={"/user/detail/" + this.props.user._id}
                                />
                        }
                        />
                </TableRowColumn>
                {this.props.isEdit ? (<TableRowColumn>
                    <RaisedButton
                        label="编辑"
                        secondary={true}
                        linkButton={true}
                        style={{ textAlign: 'center' }}
                        containerElement={
                            <Link
                                to={"/user/edit/" + this.props.user._id}
                                />
                        }
                        />
                </TableRowColumn>) : ''}
                {this.props.isDelete ? (<TableRowColumn>
                    <RaisedButton
                        label="删除"
                        primary={true}
                        onClick={this.handleClickDelete}
                        />
                </TableRowColumn>) : ''}
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
            if (res.statusCode === -9) {
                window.location.href = '/login';
            }
            if (res.statusCode === 0) {
                this.setState({
                    users: res.users,
                    pageNum: res.pageNum
                });
                if (!page) {
                    this.setState({ page: 1 })
                }
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
            pageNum: 1,
            messageOpen: false,
            message: ''
        }
    },
    componentDidMount: function () {
        this.loadUser();
    },
    routerWillLeave: function (next) {
        console.log(next);
        var index = next.search.match(/^\?index=(\d+)$/)[1];
        window.editUser = this.state.users[index];
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
        this.setState({
            confirmOpen: false
        });
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
            this.alertMessage(res.message);
        }.bind(this)).fail(function (err) {
            console.error(err);
            alert('删除失败，请重试');
        }.bind(this));
    },
    handleNextPage: function () {
        var page = this.state.page;
        this.setState({ page: (page + 1) });
        this.loadUser(this.searchKey, page + 1)
    },
    handlePrePage: function () {
        var page = this.state.page;
        this.setState({ page: (page - 1) });
        this.loadUser(this.searchKey, page - 1)
    },
    handleRequestClose: function () {
        this.setState({
            messageOpen: false
        });
    },
    alertMessage: function (message) {
        this.setState({
            messageOpen: true,
            message: message
        });
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
        let authority = this.props.route.authority || [];
        let isEdit = authority.indexOf(8) !== -1;
        let isDelete = authority.indexOf(9) !== -1;
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
                            {isEdit ? (<TableHeaderColumn>编辑</TableHeaderColumn>) : ''}
                            {isDelete ? (<TableHeaderColumn>删除</TableHeaderColumn>) : ''}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.state.users.map(function (user, index) {
                            return (
                                <UserItem
                                    user={user}
                                    key={user._id}
                                    clickDelete={this.handleClickDelete}
                                    index={index}
                                    isDelete={isDelete}
                                    isEdit={isEdit}
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
                    style={{
                        display: (this.state.page === this.state.pageNum || this.state.pageNum === 0) ? 'none' : 'inline-block'
                    }}
                    onClick={this.handleNextPage}
                    />
                <Dialog
                    modal={false}
                    open={this.state.confirmOpen}
                    repositionOnUpdate={false}
                    modal={true}
                    actions={actions}
                    >
                    确认删除商品{this.state.deleteUser.name}吗?
                </Dialog>
                <Snackbar
                    open={this.state.messageOpen}
                    message={this.state.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                    />
            </div>
        );
    }
});