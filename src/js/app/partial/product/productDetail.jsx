import reqwest from 'reqwest';
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';

export default React.createClass({
    getInitialState: function () {
        this.loadProduct(this.props.params.id);
        return {
            product: []
        }
    },
    loadProduct: function (id) {
        reqwest({
            url: '/api/product/' + id,
            method: 'get',
            type: 'json'
        }).then((res) => {
            if (res.statusCode === 0 && res.resultCode === 0) {
                this.setState({
                    product: res.product
                });
            } else {
                alert(res.message);
            }
        }).catch((err) => {
            console.error(err);
        });
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
            marginBottom: 30
        };
        return (
            <div>
                <p style={titleStyle}>商品详情</p>
                <br />
                <div style={areaStyle}>
                    <div style={labelStyle}>商品名字：</div>
                    <span>{this.state.product.name}</span>
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品价格：</div>
                    <span>{this.state.product.price}</span>
                    <div style={{ display: 'inline-block' }}>RMB</div>
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品总数量：</div>
                    <span>{this.state.product.totalNumber}</span>
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>商品库存数量：</div>
                    <span>{this.state.product.storeNumber}</span>
                </div>
                <br/>
                <RaisedButton
                    label="编辑商品信息"
                    containerElement={
                        <Link to={"/product/edit/" + this.props.params.id}/>
                    }
                    secondary={true}
                    />
            </div>
        );

    }
})