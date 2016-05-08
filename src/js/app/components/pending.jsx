import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';


export default React.createClass({
    render: function () {
        let pendingStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            bacground: 'rgba(0,0,0,0.6)',
            left: 0,
            top: 0
        };
        let circularStyle = {
            position: ''
        };
        return (
            <div style={ pendingStyle }>
                <CircularProgress />
            </div>
        )
    }
})