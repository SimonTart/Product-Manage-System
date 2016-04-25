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
                    <TableHeaderColumn>编号</TableHeaderColumn>
                    <TableHeaderColumn>订单名字</TableHeaderColumn>
                    <TableHeaderColumn>订单描述</TableHeaderColumn>
                    <TableHeaderColumn>编辑</TableHeaderColumn>
                    <TableHeaderColumn>删除</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableRowColumn>5711e091bf736c8c4912d2de</TableRowColumn>
                    <TableRowColumn>订单1</TableRowColumn>
                    <TableRowColumn>这是订单1</TableRowColumn>
                     <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                  <TableRow>
                    <TableRowColumn>5711e091bf736c8c4912d2de</TableRowColumn>
                    <TableRowColumn>订单1</TableRowColumn>
                    <TableRowColumn>这是订单1</TableRowColumn>
                     <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>5711e091bf736c8c4912d2de</TableRowColumn>
                    <TableRowColumn>订单1</TableRowColumn>
                    <TableRowColumn>这是订单1</TableRowColumn>
                     <TableRowColumn>
                        <RaisedButton label="编辑" secondary={true}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton label="删除" primary={true}/>
                    </TableRowColumn>
                </TableRow>
                <TableRow>
                    <TableRowColumn>5711e091bf736c8c4912d2de</TableRowColumn>
                    <TableRowColumn>订单1</TableRowColumn>
                    <TableRowColumn>这是订单1</TableRowColumn>
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