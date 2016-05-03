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