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
                    <p style={{ marginLeft: 15 }}>订单商品清单</p>
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
                                    />
                            }) }
                        </TableBody>
                    </Table>
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
        let selectOrderProducts = order.orderProducts || [];
        let selectProductIds = selectOrderProducts.map((product) => {
            return product.productId;
        });
        return {
            order: order,
            selectOrderProducts: selectOrderProducts, //订单清单中的商品
            selectProductIds: selectProductIds, //订单清单选中的商品对应的商品的ID
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
        let selectOrderProducts = this.state.selectOrderProducts.slice();
        let selectProductIds = this.state.selectProductIds.slice();

        reqwest({
            url: '/api/order/' + this.props.params.id + '/product/delete',
            method: 'post',
            type: 'json',
            data: {
                orderProductId: selectOrderProducts[index]._id
            }
        }).then((res) => {
            if (res.statusCode === -9) {
                this.alertMessage('请先登录');
                window.lcoation.href = '/login';
                return;
            }
            if (res.statusCode === 0 && res.resultCode === 0) {
                selectOrderProducts.splice(index, 1);
                selectProductIds.splice(index, 1);
                this.setState({
                    selectOrderProducts: selectOrderProducts,
                    selectProductIds: selectProductIds
                });
            }
            this.alertMessage(res.message);
        }).catch((err) => {
            console.error(err);
        })
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
            selectOrderProducts: [],
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

        reqwest({
            url: '/api/order/' + this.props.params.id + '/product/add',
            method: 'post',
            type: 'json',
            data: {
                productId: product._id,
                name: product.name,
                num: product.num
            }
        }).then((res) => {
            if (res.statusCode === -9) {
                this.alertMessage('请先登录');
                window.location.href = '/login';
                return;
            }
            if (res.statusCode === 0 && res.resultCode === 0) {
                let id = product._id;
                let orderProduct = res.orderProduct;
                let selectOrderProducts = this.state.selectOrderProducts.slice();
                let selectProductIds = this.state.selectProductIds.slice();
                selectOrderProducts.unshift(orderProduct);
                selectProductIds.unshift(product._id);
                this.setState({
                    selectOrderProducts: selectOrderProducts,
                    selectProductIds: selectProductIds
                });
            }
            this.alertMessage(res.message);
        }).fail((err) => {
            console.error(err);
        })

    },
    // handleSaveOrder: function () {
    //     let changeProducts = this.getChangeProducts();
    // },
    // getChangeProducts: function () {
    //     let originOrderProducts = this.state.order.orderProducts.slice();
    //     let originProductIds = originProducts.map((product) => {
    //         return product.productId;
    //     });

    //     let selectProductIds = this.state.selectProductIds.slice();
    //     let selectProducts = this.state.selectOrderProducts.slice();

    //     let deleteProductIds = originProductIds.filter((id) => {
    //         return selectProductIds.indexOf(id) === -1;
    //     });

    //     let addProducts = selectOrderProducts.filter((product) => {
    //         return originProductIds.indexOf(product._id) === -1;
    //     });

    //     return {
    //         deleteProductIds,
    //         addProducts
    //     };
    // },
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
                    products={this.state.selectOrderProducts}
                    deleteProduct={this.handleDeleteProduct}
                    alertMessage={this.alertMessage}
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