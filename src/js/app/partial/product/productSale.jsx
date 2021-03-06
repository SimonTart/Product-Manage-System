import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import reqwest from 'reqwest';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import IconButton from 'material-ui/lib/icon-button';
import Snackbar from 'material-ui/lib/snackbar';



let SaleProductItem = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    handleDelete: function () {
        this.props.deleteProduct(this.props.index);
    },
    desProduct: function () {
        this.props.desProduct(this.props.index);
    },
    render: function () {
        return (
            <TableRow>
                <TableRowColumn style={{ width: 100, padding: '0 7px' }}>{this.props.product.name}</TableRowColumn>
                <TableRowColumn style={{ width: 30, padding: '0 7px' }}>{this.props.product.price}</TableRowColumn>
                <TableRowColumn style={{ width: 25, padding: '0 7px' }}>{this.props.product.discount || '无'}</TableRowColumn>
                <TableRowColumn style={{ width: 25, padding: '0 7px' }}>{this.props.product.num || 1}</TableRowColumn>
                <TableRowColumn style={{ width: 50, padding: '0 7px' }}>{this.props.product.subtotal}</TableRowColumn>
                <TableRowColumn style={{ padding: '0 0' }}>
                    <IconButton
                        onClick={this.desProduct}
                        >
                        <ContentRemove
                            color="#00bcd4"
                            />
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn style={{ padding: '0 0' }}>
                    <IconButton
                        onClick={this.handleDelete}
                        >
                        <ActionDelete
                            color="#fd4c5d"
                            />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        );
    }
});

let SaleList = React.createClass({
    getTotalMoney: function (products) {
        var totalMoney = products.reduce((total, product) => {
            return total + parseFloat(product.subtotal);
        }, 0);
        return totalMoney.toFixed(2);
    },
    handleDeleteProduct: function (index) {
        this.props.deleteProduct(index);
    },
    handelDesProduct(index) {
        this.props.desProduct(index);
    },
    saveSale: function () {
        reqwest({
            url: '/api/sale',
            method: 'POST',
            type: 'json',
            data: {
                products: JSON.stringify(this.props.products),
                totalPrice: this.getTotalMoney(this.props.products)
            }
        }).then((res) => {
            this.props.alertMessage(res.message);
            if (res.statusCode === - 9) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500)
                return;
            }
            if (res.resultCode === 0 && res.statusCode === 0) {
                this.props.saveSaleSuccess();
                return;
            }
        }).fail(function (err) {
            console.error(err);
        });
    },
    render: function () {
        let width = '55%';
        if (window.innerWidth < 1024) {
            width = '100%'
        }
        let blockStyle = {
            width: width,
            display: 'inline-block',
            float: 'left',
            paddingTop: '30px'
        };
        let innerStyle = {
            overflow: 'auto',
            maxHeight: window.innerHeight - 120,
            width: '100%'
        }
        return (
            <div style={blockStyle}>
                <div style={innerStyle}>
                    <p style={{ marginLeft: 15 }}>已购商品</p>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{ width: 100, padding: '0 7px' }}>商品名</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 30, padding: '0 7px' }}>单价</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 25, padding: '0 7px' }}>折扣</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 25, padding: '0 7px' }}>数量</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 50, padding: '0 7px' }}>小计</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: '0 0' }}>减少</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: '0 0' }}>删除</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.products.map((product, index) => {
                                return <SaleProductItem
                                    product={product}
                                    key={index}
                                    index={index}
                                    deleteProduct={this.handleDeleteProduct}
                                    desProduct={this.handelDesProduct}
                                    />
                            }) }
                        </TableBody>
                    </Table>
                </div>
                <div style={{ paddingTop: 30 }}>
                    <span>总计：{ this.getTotalMoney(this.props.products) }</span>
                    <FlatButton
                        label="完成"
                        secondary={true}
                        style={{ display: 'inline-block' }}
                        onClick={this.saveSale}
                        />
                </div>
            </div>
        );
    }
});

let ProductItem = React.createClass({
    handleClickDelete: function () {
        this.props.clickDelete(this.props.product);
    },
    handleAddProduct: function () {
        this.props.addProduct(this.props.product);
    },
    render: function () {
        return (
            <TableRow>
                <TableRowColumn style={{ padding: '0 7px' }}>{this.props.product.name}</TableRowColumn>
                <TableRowColumn style={{ padding: '0 7px' }}>{this.props.product.price}</TableRowColumn>
                <TableRowColumn style={{ padding: '0 7px' }}>{this.props.product.discount}</TableRowColumn>
                <TableRowColumn style={{ padding: '0 7px' }}>
                    <IconButton
                        mini={true}
                        secondary={true}
                        onClick={this.handleAddProduct}
                        >
                        <ContentAdd
                            color="#00bcd4"
                            />
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        );
    }
});

let ProductList = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            page: 1,
            pageNum: 1,
        }
    },
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
        }).then((res) => {
            if (res.statusCode === -9) {
                this.props.alertMessage(res.message);
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
        }).fail(function (err) {
            console.error(err);
        })
    },
    componentDidMount: function () {
        this.loadProduct();
    },
    handleSearchKeyChange: function (e) {
        this.searchKey = e.target.value;
        this.loadProduct(this.searchKey);
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
    handleAddProduct: function (product) {
        this.props.addProduct(product);
    },
    render: function () {
        let width = 'calc(45% - 1px)';
        if (window.innerWidth < 1024) {
            width = '100%'
        }
        let blockStyle = {
            width: width,
            display: 'inline-block',
            borderRight: '1px solid #00bcd4',
            float: 'left'
        }
        const thStyle = {
            paddingLeft: 10,
            paddingRight: 10
        }
        return (
            <div style={blockStyle}>
                <span style={{ paddingLeft: 15, paddingRight: 15 }}>商品列表</span>
                <span>搜索：</span>
                <TextField
                    onChange= {this.handleSearchKeyChange}
                    />
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{ padding: '0 7px' }}>商品名</TableHeaderColumn>
                            <TableHeaderColumn style={{ padding: '0 7px' }}>单价</TableHeaderColumn>
                            <TableHeaderColumn style={{ padding: '0 7px' }}>折扣</TableHeaderColumn>
                            <TableHeaderColumn style={{ padding: '0 7px' }}>添加</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.state.products.map((product, index) => {
                            return (
                                <ProductItem
                                    product={product}
                                    key={index}
                                    addProduct={this.handleAddProduct}
                                    />
                            );
                        }) }
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
            </div>
        );
    }
});

export default React.createClass({
    getInitialState: function () {
        return {
            selectProducts: [],
            selectProductIds: [],
            message: '',
            messageOpen: false
        }
    },
    handleAddProduct: function (product) {
        let id = product._id;
        let selectProducts = this.state.selectProducts.slice();
        let selectProductIds = this.state.selectProductIds.slice();
        let index = selectProductIds.indexOf(id);
        let discount = product.discount || 10;
        if (index === -1) {
            product.num = 1;
            product.subtotal = (product.price * discount / 10).toFixed(2);
            selectProducts.unshift(product);
            selectProductIds.unshift(product._id);
            index = 0;
        } else {
            selectProducts[index].num++;
            product.subtotal = (product.price * discount * selectProducts[index].num / 10).toFixed(2);
        }

        this.setState({
            selectProducts: selectProducts,
            selectProductIds: selectProductIds
        });
    },
    handleDeleteProduct: function (index) {
        let selectProducts = this.state.selectProducts.slice();
        let selectProductIds = this.state.selectProductIds.slice();
        console.log(index);
        selectProducts.splice(index, 1);
        selectProductIds.splice(index, 1);
        this.setState({
            selectProducts: selectProducts,
            selectProductIds: selectProductIds
        });
    },
    handelDesProduct: function (index) {
        let selectProducts = this.state.selectProducts.slice();
        let selectProductIds = this.state.selectProductIds.slice();
        let product = selectProducts[index];
        let num = --product.num;
        let discount = product.discount || 10;

        if (num <= 0) {
            selectProducts.splice(index, 1);
            selectProductIds.splice(index, 1);
        } else {
            product.subtotal = (product.price * discount * selectProducts[index].num / 10).toFixed(2);
            selectProducts[index] = product;
        }

        this.setState({
            selectProducts: selectProducts,
            selectProductIds: selectProductIds
        });
    },
    handleRequestClose: function () {
        this.setState({
            messageOpen: false
        })
    },
    alertMessage: function (message) {
        this.setState({
            message: message,
            messageOpen: true
        });
    },
    handleSaveSaleSuccess: function () {
        this.setState({
            selectProducts: [],
            selectProductIds: []
        })
    },
    render: function () {
        const blockStyle = {
            marginTop: 8,
            overflow: 'hidden'
        }
        return (
            <div style={blockStyle}>
                <ProductList
                    addProduct={this.handleAddProduct}
                    alertMessage={this.alertMessage}
                    />
                <SaleList
                    products={this.state.selectProducts}
                    deleteProduct={this.handleDeleteProduct}
                    desProduct={this.handelDesProduct}
                    alertMessage={this.alertMessage}
                    saveSaleSuccess={this.handleSaveSaleSuccess}
                    />
                <Snackbar
                    open={this.state.messageOpen}
                    message={this.state.message}
                    onRequestClose={this.handleRequestClose}
                    autoHideDuration={1500}
                    />
            </div>
        );
    }
});