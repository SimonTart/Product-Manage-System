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
            </div>
        );
    }
});