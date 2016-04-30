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
            nameErrorText: '必填',
            name: '',
            descriptionErrorText: '',
            description: '',
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
        reqwest({
            url: '/api/order',
            method: 'post',
            type: 'json',
            data: {
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
                    this.context.router.push('/');
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
                        errorText={this.state.descriptionErrorText}
                        onChange={this.handleDescriptionChange}
                        />
                </div>
                <RaisedButton
                    label="添加"
                    secondary={true}
                    style={addBtnStyle}
                    onClick ={this.handleSubmit}
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