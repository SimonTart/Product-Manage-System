import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';

export default React.createClass({
    render: function () {
        let blockStyle = {
            paddingTop: 30
        };
        return (
            <div style={blockStyle}>
                <RaisedButton
                    label='商品销售排行表'
                    containerElement={<Link to='/report/product/sale/rank' />}
                    />
                <RaisedButton
                    label='营业额走线图'
                    containerElement={<Link to='/report/sale/income/line' />}
                    style={{ marginLeft: 35 }}
                    />
            </div>
        );
    }
});