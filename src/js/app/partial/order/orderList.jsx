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
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Snackbar from 'material-ui/lib/snackbar';


var ProductItem = React.createClass({
    handleClickDelete: function () {
        this.props.clickDelete(this.props.order);
    },
    formatDate: function (date) {
        var addDate = new Date(date);
        var formatedDate = '';
        formatedDate = formatedDate + addDate.getFullYear() + '/' + (addDate.getMonth() + 1) + '/' + addDate.getDate() + ' ';
        return formatedDate;
    },
    render: function () {
        return (
            <TableRow>
                <TableRowColumn>{this.props.order.name}</TableRowColumn>
                <TableRowColumn>{this.props.order.description}</TableRowColumn>
                <TableRowColumn>{this.formatDate(this.props.order.addDate) }</TableRowColumn>
                <TableRowColumn>{this.props.order.isLogoff === 0 ? '正在进行' : '已完成'}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="查看详情"
                        secondary={true}
                        linkButton={true}
                        containerElement={
                            <Link
                                to={"/order/detail/" + this.props.order._id}
                                />
                        }
                        />
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="编辑"
                        secondary={true}
                        linkButton={true}
                        style={{ textAlign: 'center' }}
                        containerElement={
                            <Link
                                to={"/order/edit/" + this.props.order._id}
                                />
                        }
                        />
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
    loadOrder: function (key, page) {
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
            url: '/api/order',
            method: 'GET',
            type: 'json',
            data: data
        }).then(function (res) {
            if (res.statusCode === -9) {
                window.location.href = '/login';
            }
            if (res.statusCode === 0) {
                this.setState({
                    orders: res.orders,
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
            orders: [],
            deleteOrder: {},
            confirmOpen: false,
            page: 1,
            pageNum: 1,
            messageOpen: false,
            message: ''
        }
    },
    componentDidMount: function () {
        this.loadOrder();
    },
    handleSearchKeyChange: function (e) {
        this.searchKey = e.target.value;
        this.loadOrder(this.searchKey);
    },
    handleClickDelete: function (order) {
        this.setState({
            confirmOpen: true,
            deleteOrder: order
        });
    },
    handleCancelDelete: function () {
        this.setState({
            confirmOpen: false
        });
    },
    handleDeleteProduct: function () {
        this.setState({
            confirmOpen: false
        });
        var deleteProduct = this.state.deleteProduct;
        reqwest({
            url: '/api/product/delete',
            method: 'POST',
            type: 'json',
            data: {
                id: deleteProduct._id
            }
        }).then(function (res) {
            if (res.statusCode === 0 && res.resultCode === 0) {
                var products = this.state.products.filter(function (product) {
                    return product._id !== deleteProduct._id;
                });
                this.setState({
                    products: products
                });
            }
            this.alertMessage(res.message);
        }.bind(this)).fail(function (err) {
            console.error(err);
        }.bind(this));
    },
    handleNextPage: function () {
        var page = this.state.page;
        this.setState({ page: (page + 1) });
        this.loadOrder(this.searchKey, page + 1)
    },
    handlePrePage: function () {
        var page = this.state.page;
        this.setState({ page: (page - 1) });
        this.loadOrder(this.searchKey, page - 1)
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
                onClick={this.handleDeleteProduct}
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
                            <TableHeaderColumn>订单名</TableHeaderColumn>
                            <TableHeaderColumn>订单描述</TableHeaderColumn>
                            <TableHeaderColumn>添加日期</TableHeaderColumn>
                            <TableHeaderColumn>状态</TableHeaderColumn>
                            <TableHeaderColumn>查看详情</TableHeaderColumn>
                            <TableHeaderColumn>编辑订单</TableHeaderColumn>
                            <TableHeaderColumn>删除</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.state.orders.map(function (order, index) {
                            return (
                                <ProductItem
                                    order={order}
                                    key={order._id}
                                    clickDelete={this.handleClickDelete}
                                    index={index}
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
                    确认删除订单{this.state.deleteOrder.name}吗?
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