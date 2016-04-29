import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import reqwest from 'reqwest';

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        let product = this.loadProductSync();
        return {
            nameErrorText: '',
            priceErrorText: '',
            totalNumberErrorText: '',
            storeNumberErrorText: '',
            discountErrorText: '',
            name: product.name,
            price: product.price,
            discount: product.discount || '',
            totalNumber: product.totalNumber,
            storeNumber: product.storeNumber,
            messageOpen: false,
            message: '',
            product: product
        };
    },
    loadProductSync: function () {
        let xhr = new XMLHttpRequest();
        let url = '/api/product/' + this.props.params.id;
        xhr.open('get', url, false);
        xhr.send(null);
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            let res = JSON.parse(xhr.responseText);
            if (res.statusCode === 0 && res.resultCode === 0) {
                return res.product;
            }
        } else {
            console.error('请求错误');
            return [];
        }
    },
    handleNameChange: function (e) {
        var name = e.target.value;
        this.setState({ name: name });
        if (!name) {
            this.setState({ nameErrorText: '商品名不能为空，必填' });
            return;
        }
        this.setState({ nameErrorText: '' });
    },
    handlePriceChange: function (e) {
        var price = e.target.value;
        this.setState({ price: price });
        if (
            !price ||
            !/^\d+(.\d){0,1}$/g.test(price) ||
            price < 0

        ) {
            this.setState({ priceErrorText: '商品价格必须是最多一位小数的正数，必填' });
            return false;
        }
        this.setState({ priceErrorText: '' });
    },
    handleDiscountChange: function (e) {
        var discount = e.target.value;
        if (discount === '') {
            this.setState({
                discountErrorText: '',
                discount: ''
            });
            return;
        }
        if (!/^[0-9](.\d){0,1}$/g.test(discount)) {
            this.setState({
                discountErrorText: '折扣只能在0-9之间，最多一位小数'
            });
            return;
        }
        this.setState({
            discountErrorText: '',
            discount: discount
        })
    },
    handleTotalNumberChange: function (e) {
        var totalNumber = e.target.value;
        this.setState({ totalNumber: totalNumber });
        if (
            !totalNumber ||
            !/^\d+$/g.test(totalNumber) ||
            totalNumber < 0
        ) {
            this.setState({ totalNumberErrorText: '商品数量必须是正整数，必填' });
            return false;
        }

        if (parseInt(totalNumber) < parseInt(this.state.storeNumber)) {
            this.setState({ totalNumberErrorText: '商品数量必须大于等于商品库存数量' });
            return false;
        }
        this.setState({ totalNumberErrorText: '' });
    },
    handleStoreNumberChange: function (e) {
        let storeNumber = e.target.value;
        this.setState({
            storeNumber: storeNumber
        });
        if (
            !storeNumber ||
            !/^\d+$/g.test(storeNumber) ||
            storeNumber < 0
        ) {
            this.setState({ storeNumberErrorText: '商品库存数量必须是正整数，必填' });
            return false;
        }
        if (parseInt(storeNumber) > parseInt(this.state.totalNumber)) {
            this.setState({ storeNumberErrorText: '商品库存数量必须小于等于商品总数量' });
            return false;
        }
        this.setState({ storeNumberErrorText: '' });
    },
    handleSubmit: function () {
        var result = this.state.nameErrorText || this.state.priceErrorText || this.state.numberErrorText;
        if (result) {
            this.alertMessage(result);
            return;
        }
        reqwest({
            url: '/api/product/modify',
            method: 'post',
            type: 'json',
            data: {
                name: this.state.name,
                totalNumber: this.state.totalNumber,
                price: this.state.price,
                storeNumber: this.state.storeNumber,
                id: this.state.product._id,
                discount: this.state.discount
            }
        }).then((res) => {
            if (res.statusCode === 0 && res.resultCode === 0) {
                this.alertMessage('修改成功');
                setTimeout(() => {
                    this.context.router.push('/product/detail/' + this.state.product._id);
                }, 1500);
            } else {
                this.alertMessage(res.message);
                if (res.statusCode === -9) {
                    window.location.href = '/';
                }
            }

        }).fail((err) => {
            console.log(err);
        })
    },
    alertMessage: function (message) {
        this.setState({
            message: message,
            messageOpen: true
        });
    },
    handleMessageRequest: function () {
        this.setState({ messageOpen: false });
    },
    render: function () {
        const titleStyle = {
            marginTop: 40,
            marginBottom: 25,
            color: "#00BCD4",
            fontSize: 22,
            fontWeight: 600
        };
        const labelStyle = {
            display: 'inline-block',
            marginRight: 20,
            verticalAlign: 'middle'
        };
        const areaStyle = {
            marginTop: 5
        };
        const addBtnStyle = {
            marginTop: 25,
            marginLeft: 100
        };
        const textStyle = {
            verticalAlign: 'middle'
        }
        return (
            <div>
                <p style={titleStyle}>编辑商品</p>
                <br />
                <div style={areaStyle}>
                    <div style={labelStyle}>商品名字：</div>
                    <TextField
                        hintText="商品名字"
                        errorText={this.state.nameErrorText}
                        onChange={this.handleNameChange}
                        style={textStyle}
                        defaultValue={this.state.product.name}
                        />
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品价格：</div>
                    <TextField
                        hintText="商品价格"
                        style={textStyle}
                        onChange={this.handlePriceChange}
                        errorText={this.state.priceErrorText}
                        defaultValue={this.state.product.price}
                        />
                    <div style={{ display: 'inline-block' }}>RMB</div>
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品折扣：</div>
                    <TextField
                        hintText="商品折扣"
                        style={textStyle}
                        onChange={this.handleDiscountChange}
                        errorText={this.state.discountErrorText}
                        defaultValue={this.state.product.discount}
                        />
                    <div style={{ display: 'inline-block' }}>折</div>
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品库存数量：</div>
                    <TextField
                        hintText="商品库存数量"
                        style={textStyle}
                        errorText={this.state.storeNumberErrorText}
                        onChange={this.handleStoreNumberChange}
                        defaultValue={this.state.product.storeNumber}
                        />
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品总数量：</div>
                    <TextField
                        hintText="商品总数量"
                        style={textStyle}
                        errorText={this.state.totalNumberErrorText}
                        onChange={this.handleTotalNumberChange}
                        defaultValue={this.state.product.totalNumber}
                        />
                </div>
                <br/>
                <RaisedButton
                    label="修改"
                    secondary={true}
                    style={addBtnStyle}
                    onClick={this.handleSubmit}
                    />
                <Snackbar
                    open={this.state.messageOpen}
                    message={this.state.message}
                    autoHideDuration={1500}
                    onRequestClose={this.handleMessageRequest}
                    />
            </div>
        );
    }
});