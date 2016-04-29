import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';



let SaleProductItem = React.createClass({
    render: function () {
        return (
            <TableRow>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn></TableRowColumn>
            </TableRow>
        );
    }
});

let SaleList = React.createClass({
    render: function () {
        const blockStyle = {
            borderRight: '1px solid #00bcd4',
            width: '40%'
        };
        return (
            <div style={blockStyle}>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>商品名</TableHeaderColumn>
                            <TableHeaderColumn>单价</TableHeaderColumn>
                            <TableHeaderColumn>数量</TableHeaderColumn>
                            <TableHeaderColumn>折扣</TableHeaderColumn>
                            <TableHeaderColumn>小计</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>商品名</TableHeaderColumn>
                            <TableHeaderColumn>16RMB</TableHeaderColumn>
                            <TableHeaderColumn>10</TableHeaderColumn>
                            <TableHeaderColumn>9折</TableHeaderColumn>
                            <TableHeaderColumn>144</TableHeaderColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
})


export default React.createClass({
    render: function () {
        return (
            <div>
                <SaleList />
            </div>
        );
    }
})