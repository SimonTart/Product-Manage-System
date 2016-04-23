import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';




export default React.createClass({
    getInitialState: function(){
       return {
           users: []
       }  
    },
    render:function(){
        return(
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHeaderColumn>账号</TableHeaderColumn>
                    <TableHeaderColumn>名字</TableHeaderColumn>
                    <TableHeaderColumn>性别</TableHeaderColumn>
                    <TableHeaderColumn>联系方式</TableHeaderColumn>
                    <TableHeaderColumn>职务</TableHeaderColumn>
                    <TableHeaderColumn>住址</TableHeaderColumn>
                    <TableHeaderColumn>编辑</TableHeaderColumn>
                    <TableHeaderColumn>删除</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableRowColumn>Account1</TableRowColumn>
                    <TableRowColumn>Account1</TableRowColumn>
                    <TableRowColumn>男</TableRowColumn>
                    <TableRowColumn>123456789</TableRowColumn>
                    <TableRowColumn>店员</TableRowColumn>
                    <TableRowColumn>住址1</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                  <TableRow>
                    <TableRowColumn>Account2</TableRowColumn>
                    <TableRowColumn>Account2</TableRowColumn>
                    <TableRowColumn>男</TableRowColumn>
                    <TableRowColumn>123456789</TableRowColumn>
                    <TableRowColumn>店员</TableRowColumn>
                    <TableRowColumn>住址2</TableRowColumn>
                     <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                  <TableRow>
                    <TableRowColumn>Account3</TableRowColumn>
                    <TableRowColumn>Account3</TableRowColumn>
                    <TableRowColumn>男</TableRowColumn>
                    <TableRowColumn>123456789</TableRowColumn>
                    <TableRowColumn>店员</TableRowColumn>
                    <TableRowColumn>住址3</TableRowColumn>
                     <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                  <TableRow>
                    <TableRowColumn>Account4</TableRowColumn>
                    <TableRowColumn>Account4</TableRowColumn>
                    <TableRowColumn>男</TableRowColumn>
                    <TableRowColumn>123456789</TableRowColumn>
                    <TableRowColumn>店员</TableRowColumn>
                    <TableRowColumn>住址4</TableRowColumn>
                     <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                </TableBody>
            </Table>
        ); 
    } 
});