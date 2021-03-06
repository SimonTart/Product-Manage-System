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
        this.props.clickDelete(this.props.product);
    },
    render: function () {
        return (
            <TableRow>
                <TableRowColumn>{this.props.product.name}</TableRowColumn>
                <TableRowColumn>{this.props.product.storeNumber}</TableRowColumn>
                <TableRowColumn>{this.props.product.totalNumber}</TableRowColumn>
                <TableRowColumn>{this.props.product.price}</TableRowColumn>
                <TableRowColumn>{this.props.product.discount || '无'}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="查看详情"
                        secondary={true}
                        linkButton={true}
                        containerElement={
                            <Link
                                to={"/product/detail/" + this.props.product._id}
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
                                to={"/product/edit/" + this.props.product._id}
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
    loadProduct: function (key, page) {
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
            url: '/api/product',
            method: 'GET',
            type: 'json',
            data: data
        }).then(function (res) {
            if (res.statusCode === -9) {
                window.location.href = '/login';
            }
            if (res.statusCode === 0) {
                this.setState({
                    products: res.products,
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
            products: [],
            deleteProduct: {},
            confirmOpen: false,
            page: 1,
            pageNum: 1,
            messageOpen: false,
            message: ''
        }
    },
    componentDidMount: function () {
        this.loadProduct();
    },
    handleSearchKeyChange: function (e) {
        this.searchKey = e.target.value;
        this.loadProduct(this.searchKey);
    },
    handleClickDelete: function (product) {
        this.setState({
            confirmOpen: true,
            deleteProduct: product
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
        this.loadProduct(this.searchKey, page + 1)
    },
    handlePrePage: function () {
        var page = this.state.page;
        this.setState({ page: (page - 1) });
        this.loadProduct(this.searchKey, page - 1)
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
        let authority = this.props.route.authority ||  [];
        let isEdit = authority.indexOf(3) !== -1;
        let isDelete = authority.indexOf(4) !== -1;
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
                            <TableHeaderColumn>商品名</TableHeaderColumn>
                            <TableHeaderColumn>商品库存</TableHeaderColumn>
                            <TableHeaderColumn>商品总量</TableHeaderColumn>
                            <TableHeaderColumn>商品价格</TableHeaderColumn>
                            <TableHeaderColumn>折扣</TableHeaderColumn>
                            <TableHeaderColumn>查看详情</TableHeaderColumn>
                            {isEdit ? (<TableHeaderColumn>编辑</TableHeaderColumn>) : ''}
                            {isDelete ? (<TableHeaderColumn>删除</TableHeaderColumn>) : ''}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.state.products.map(function (product, index) {
                            return (
                                <ProductItem
                                    product={product}
                                    key={product._id}
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
                    确认删除账号为{this.state.deleteProduct.account}, 姓名为{this.state.deleteProduct.name}的用户吗?
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