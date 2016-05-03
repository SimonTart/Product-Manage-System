import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import reqwest from 'reqwest';
import {Link} from 'react-router';

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    loadOrderSync: function () {
        let xhr = new XMLHttpRequest();
        let url = '/api/order/detail/' + this.props.params.id;
        xhr.open('get', url, false);
        xhr.send(null);
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            let res = JSON.parse(xhr.responseText);
            if (res.statusCode === 0 && res.resultCode === 0) {
                return res.order;
            }
        } else {
            console.error('请求错误');
            return [];
        }
    },
    getInitialState: function () {
        let order = this.loadOrderSync();
        return {
            nameErrorText: '',
            name: order.name,
            descriptionErrorText: '',
            description: order.description,
            message: '',
            messageOpen: false
        };
    },
    handleNameChange: function (e) {
        let name = e.target.value;
        this.setState({ name: name });
        if (name === '') {
            this.setState({ nameErrorText: '商品名不能为空，必填' });
            return;
        }
        this.setState({ nameErrorText: '' });
    },
    handleDescriptionChange: function (e) {
        let description = e.target.value;
        this.setState({
            description: description
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
        })
    },
    handleSubmit: function () {
        if (this.state.nameErrorText) {
            this.alertMessage(this.state.nameErrorText);
            return;
        }
        reqwest({
            url: '/api/order/modify',
            method: 'post',
            type: 'json',
            data: {
                id: this.props.params.id,
                name: this.state.name,
                description: this.state.description
            }
        }).then((res) => {
            this.alertMessage(res.message);
            if (res.statusCode === -9) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            }
            if (res.statusCode === 0 && res.resultCode === 0) {
                setTimeout(() => {
                    this.context.router.push('/order/detail/' + this.props.params.id);
                }, 1500);
            }
        }).catch((err) => {
            console.error(err);
        })
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
            marginTop: 5,
            marginBottom: 25
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
                <p style={titleStyle}>修改订单信息
                </p>
                <br />
                <div style={areaStyle}>
                    <div style={labelStyle}>订单名字：</div>
                    <TextField
                        hintText="订单名字"
                        onChange={this.handleNameChange}
                        errorText={this.state.nameErrorText}
                        style={textStyle}
                        defaultValue={this.state.name}
                        />
                </div>
                <div style={areaStyle}>
                    <div style={labelStyle}>订单描述：</div>
                    <TextField
                        hintText="订单描述"
                        style={textStyle}
                        errorText={this.state.descriptionErrorText}
                        onChange={this.handleDescriptionChange}
                        defaultValue={this.state.description}
                        />
                </div>
                <RaisedButton
                    label="保存修改"
                    secondary={true}
                    style={addBtnStyle}
                    onClick ={this.handleSubmit}
                    />
                <br/>
                <RaisedButton
                    label="修改订单商品清单"
                    secondary={true}
                    style={addBtnStyle}
                    containerElement={
                        <Link to={'/orderproduct/edit/' + this.props.params.id}/>
                    }
                    />
                <Snackbar
                    message={this.state.message}
                    open={this.state.messageOpen}
                    autoHideDuration={1500}
                    onRequestClose={this.handleRequestClose}
                    />
            </div>
        );
    }
});