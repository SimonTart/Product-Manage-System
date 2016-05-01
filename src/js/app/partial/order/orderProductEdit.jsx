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
import RaisedButton from 'material-ui/lib/raised-button';

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
        let width = '44%';
        if (window.innerWidth < 950) {
            width = '100%'
        }
        let blockStyle = {
            width: width,
            display: 'inline-block',
            borderLeft: '1px solid #00bcd4',
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
                <TableRowColumn style={{ padding: '0 7px' }}>{this.props.product.name}</TableRowColumn>
                <TableRowColumn style={{ padding: '0 7px' }}>{this.props.product.num || 1}</TableRowColumn>
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
                products: JSON.stringify(this.props.products)
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
                                <TableHeaderColumn style={{ padding: '0 7px' }}>商品名</TableHeaderColumn>
                                <TableHeaderColumn style={{ padding: '0 7px' }}>数量</TableHeaderColumn>
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
                    <FlatButton
                        label="保存"
                        secondary={true}
                        style={{ display: 'inline-block' }}
                        onClick={this.saveSale}
                        />
                </div>
            </div>
        );
    }
});


let Title = React.createClass({
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
        const orderInfoStyle = {
            marginTop: 15,
            paddingLeft: 13,
            paddingBottom: 25
        }
        const orderDesStyle = {
            paddingLeft: 25
        }
        const orderDateStyle = {
            paddingLeft: 25
        }
        return (
            <p style={orderInfoStyle}>
                <span>订单名：</span><span>{this.props.order.name}</span>
                <span style={orderDesStyle}>订单描述：</span><span>{this.props.order.description || '无'}</span>
                <span style={orderDateStyle}>添加日期：</span><span>{this.formatDate(this.props.order.addDate) }</span>
                <span style={orderDateStyle}>修改日期：</span><span>{this.formatDate(this.props.order.modifyDate) }</span>
            </p>
        );
    }
});

let NumberInput = React.createClass({
    getInitialState: function () {
        return {
            num: '',
            numErrorText: '必填',
        }
    },
    handleConfirm: function () {
        if (this.state.numErrorText) {
            return;
        }
        this.props.confirm(this.state.num);
        this.resetComponent();
    },
    handleCancel: function () {
        this.props.cancel();
        this.resetComponent();
    },
    resetComponent: function () {
        var input = document.querySelector('#inputNumber');
        input.value = '';
        this.setState(this.getInitialState());
    },
    handleNumChange: function (e) {
        var num = e.target.value;
        if (num === '') {
            this.setState({
                numErrorText: '数量还未填写'
            });
        }
        if (!/^\d+$/g.test(num)) {
            this.setState({
                numErrorText: '数量必须是一个大于零的正整数'
            });
            return;
        }
        if (parseInt(num) < 1) {
            this.setState({
                numErrorText: '数量必须是一个大于零的正整数'
            });
            return;
        }
        this.setState({
            numErrorText: '',
            num: parseInt(num)
        });
    },
    render: function () {
        const blockStyle = {
            position: 'fixed',
            top: 0,
            left: 255,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 7,
            display: this.props.open === true ? 'block' : 'none'
        }
        const inputStyle = {
            background: '#fff'
        }
        const inputBlockStyle = {
            width: 256,
            height: 120,
            background: '#fff',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -100,
            marginTop: -100,
            padding: '15px 20px'
        }
        const cancelBtnStyle = {
            marginLeft: 7,
            marginTop: 10
        }
        const confirmBtnStyle = {
            marginLeft: 40,
            marginTop: 10
        }
        return (
            <div style={blockStyle}>
                <div style={inputBlockStyle}>
                    <p>请输入订购数量</p>
                    <TextField
                        label="数量"
                        errorText={this.state.numErrorText}
                        style={inputStyle}
                        onChange={this.handleNumChange}
                        id="inputNumber"
                        />
                    <br/>
                    <RaisedButton
                        label="取消"
                        primary={true}
                        style={cancelBtnStyle}
                        onClick={this.handleCancel}
                        />
                    <RaisedButton
                        label="确定"
                        secondary={true}
                        style={confirmBtnStyle}
                        onClick={this.handleConfirm}
                        />
                </div>
            </div>
        )
    }
})

export default React.createClass({
    getInitialState: function () {
        let order = this.loadOrderSync(this.props.params.id).order;
        return {
            order: order,
            selectProducts: order.orderProducts || [],
            selectProductIds: [],
            message: '',
            messageOpen: false,
            inputNumberOpen: false
        }
    },
    loadOrderSync: function (id) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', '/api/order/detail/' + id, false);
        xhr.send(null);
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            return JSON.parse(xhr.responseText);
        } else {
            return 'error';
        }
    },
    handleAddProduct: function (product) {
        var id = product._id;
        if (this.state.selectProductIds.indexOf(id) !== -1) {
            this.alertMessage('该商品已经在订购清单中');
            return;
        }
        this.setState({
            inputNumberOpen: true,
            addProduct: product
        });
    },
    handleDeleteProduct: function (index) {
        let selectProducts = this.state.selectProducts.slice();
        let selectProductIds = this.state.selectProductIds.slice();
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
    handleAddCancel: function () {
        this.setState({
            inputNumberOpen: false
        });
    },
    handleAddConfirm: function (num) {
        this.setState({
            inputNumberOpen: false
        });
        let product = this.state.addProduct;
        product.num = num;
        let id = product._id;
        let selectProducts = this.state.selectProducts.slice();
        let selectProductIds = this.state.selectProductIds.slice();
        selectProducts.unshift(product);
        selectProductIds.unshift(product._id);
        this.setState({
            selectProducts: selectProducts,
            selectProductIds: selectProductIds
        });
    },
    render: function () {
        const blockStyle = {
            marginLeft: '-5%',
            marginRight: '-5%',
            marginTop: 8,
            overflow: 'hidden'
        }
        return (
            <div style={blockStyle}>
                <Title
                    order={this.state.order}
                    />
                <SaleList
                    products={this.state.selectProducts}
                    deleteProduct={this.handleDeleteProduct}
                    desProduct={this.handelDesProduct}
                    alertMessage={this.alertMessage}
                    saveSaleSuccess={this.handleSaveSaleSuccess}
                    />
                <ProductList
                    addProduct={this.handleAddProduct}
                    alertMessage={this.alertMessage}
                    />
                <Snackbar
                    open={this.state.messageOpen}
                    message={this.state.message}
                    onRequestClose={this.handleRequestClose}
                    autoHideDuration={1500}
                    />
                <NumberInput
                    open={this.state.inputNumberOpen}
                    cancel={this.handleAddCancel}
                    confirm={this.handleAddConfirm}
                    />
            </div>
        );
    }
});