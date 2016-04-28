import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default React.createClass({
    getInitialState: function () {
        return {
            nameErrorText: '',
            name: '',
            priceErrorText: '',
            price: '',
        };
    },
    handleNameChange: function (e) {
        this.setState({ name: name });
        if (name === '') {
            this.setState({ nameErrorText: '商品名不能为空，必填' });
            return;
        }
        var name = e.target.value;
         this.setState({ nameErrorText: '' });
    },
    handlePriceChange: function (e) {
        var price = e.target.value;
        if(price === '' ){
            this.setState({priceErrorText:'商品价格不能为空，必填'});
            return;
        }
        if(!/^\d+$/g.test(price)){
            this.setState({priceErrorText:'商品价格只能是数字'});
            return;
        }
        this.setState({priceErrorText:''});
        this.setState({ price: price });
    },
    handleStoreNumberChange: function (e) {
        var storeNumber = e.target.value;
        if(price === '' ){
            this.setState({priceErrorText:'商品价格不能为空，必填'});
            return;
        }
        if(!/^\d+$/g.test(price)){
            this.setState({priceErrorText:'商品价格只能是数字'});
            return;
        }
        this.setState({priceErrorText:''});
        this.setState({ price: price });
    },
    render: function () {
        const titleStyle = {
            marginTop: 10,
            marginBottom: 20
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
                <p style={titleStyle}>添加订单
                </p>
                <br />
                <div style={areaStyle}>
                    <div style={labelStyle}>订单名字：</div>
                    <TextField
                        hintText="订单名字"
                        onChange={this.handleNameChange}
                        errorText={this.state.nameErrorText}
                        style={textStyle}
                        />
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>订单描述：</div>
                    <TextField
                        hintText="订单描述"
                        style={textStyle}
                        errorText={this.state.priceErrorText}
                        onChange={this.handlePriceChange}
                     />
                </div>
                <RaisedButton
                    label="新建"
                    secondary={true}
                    style={addBtnStyle}
                />

            </div>
        );
    }
});