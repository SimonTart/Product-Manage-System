import React from 'react';
import TextField from 'material-ui/lib/text-field';




export default React.createClass({
    render: function(){
        const titleStyle = {
            display: 'inline-block' ,
            marginRight: 20   
        };
        
        return (
            <div>
                <div style={titleStyle}>商品名字</div>
                <TextField 
                    hintText="商品名字"
                />
            </div>
        );
    }
});