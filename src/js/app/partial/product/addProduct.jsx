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
        return {
            nameErrorText: '商品名必填',
            priceErrorText: '商品价格必填',
            numberErrorText: '商品数量必填',
            name: '',
            price: '',
            messageOpen: false,
            message: ''
        };
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
    handleNumberChange: function (e) {
        var num = e.target.value;
        this.setState({ number: num });
        if (
            !num ||
            !/^\d+$/g.test(num) ||
            num < 0

        ) {
            this.setState({ numberErrorText: '商品数量必须是正整数，必填' });
            return false;
        }
        this.setState({ numberErrorText: '' });
    },
    handleSubmit: function () {
        var result = this.state.nameErrorText || this.state.priceErrorText || this.state.numberErrorText;
        if (result) {
            this.alertMessage(result);
            return;
        }
        reqwest({
            url: '/api/product',
            method: 'post',
            type: 'json',
            data: {
                name: this.state.name,
                number: this.state.number,
                price: this.state.price
            }
        }).then((res) => {
            if (res.statusCode === 0 && res.resultCode === 0) {
                this.alertMessage('添加成功');
                setTimeout(() => {
                       this.context.router.push('/transition');
                       this.context.router.push('/product/add');
                }, 1500);
            } else {
                this.alertMessage(res.message);
                if(res.statusCode === -9){
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
                <p style={titleStyle}>添加商品</p>
                <br />
                <div style={areaStyle}>
                    <div style={labelStyle}>商品名字：</div>
                    <TextField
                        hintText="商品名字"
                        errorText={this.state.nameErrorText}
                        onChange={this.handleNameChange}
                        style={textStyle}
                        />
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品价格：</div>
                    <TextField
                        hintText="商品价格"
                        style={textStyle}
                        onChange={this.handlePriceChange}
                        errorText={this.state.priceErrorText}
                        />
                    <div style={{ display: 'inline-block' }}>RMB</div>
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品数量：</div>
                    <TextField
                        hintText="商品数量"
                        style={textStyle}
                        defualt='0'
                        errorText={this.state.numberErrorText}
                        onChange={this.handleNumberChange}
                        />
                </div>
                <br/>
                <RaisedButton
                    label="添加"
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