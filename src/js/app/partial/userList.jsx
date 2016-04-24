import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import reqwest from 'reqwest';
import TextField from 'material-ui/lib/text-field';

var UserItem = React.createClass({
   render: function () {
       return(
           <TableRow>
               <TableRowColumn>{this.props.user.account}</TableRowColumn>
               <TableRowColumn>{this.props.user.name}</TableRowColumn>
               <TableRowColumn>{this.props.user.position}</TableRowColumn>
               <TableRowColumn>{this.props.user.sex === 0 ? '男' : '女'}</TableRowColumn>
               <TableRowColumn>{this.props.user.phone}</TableRowColumn>
               <TableRowColumn>{this.props.user.address}</TableRowColumn>
               <TableRowColumn>
                   <RaisedButton label="查看详情" secondary={true}/>
               </TableRowColumn>
               <TableRowColumn>
                   <RaisedButton label="编辑" secondary={true}/>
               </TableRowColumn>
               <TableRowColumn>
                   <RaisedButton label="删除" primary={true}/>
               </TableRowColumn>
           </TableRow>
       );
   }
});

export default React.createClass({
    loadUser: function (key,page) {
        var data = {
            _: new Date().getTime()
        };
        if(key !== undefined){
            data.key = key;
        }
        if(page !== undefined){
            data.page = page;
        }
        reqwest({
            url: '/api/user',
            method: 'GET',
            type:'json',
            data: data
        }).then(function (res) {
            if(res.statusCode === 0){
                this.setState({
                   users: res.users
                });
            }
        }.bind(this)).fail(function (err) {
            console.error(err);
        })
    },
    getInitialState: function(){
       return {
           users: []
       }  
    },
    componentDidMount: function () {
        this.loadUser();
    },
    render:function(){
        return(
            <div>
            <TextField />
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>账号</TableHeaderColumn>
                    <TableHeaderColumn>名字</TableHeaderColumn>
                    <TableHeaderColumn>职务</TableHeaderColumn>
                    <TableHeaderColumn>性别</TableHeaderColumn>
                    <TableHeaderColumn>联系方式</TableHeaderColumn>
                    <TableHeaderColumn>住址</TableHeaderColumn>
                    <TableHeaderColumn>查看详情</TableHeaderColumn>
                    <TableHeaderColumn>编辑</TableHeaderColumn>
                    <TableHeaderColumn>删除</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.state.users.map(function(user){
                        return(
                            <UserItem user={user} key={user._id}/>
                        );
                    })}
                </TableBody>
            </Table>
            </div>
        ); 
    } 
});