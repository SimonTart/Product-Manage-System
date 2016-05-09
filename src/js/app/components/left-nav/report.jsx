import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

import Description from 'material-ui/lib/svg-icons/action/description';
// import Add from 'material-ui/lib/svg-icons/content/add';
// import Delete from 'material-ui/lib/svg-icons/action/delete';
// import Search from 'material-ui/lib/svg-icons/action/search';
// import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import {arrayHas} from '../utils.jsx';

export default React.createClass({
	render: function () {
		let authority = this.props.user.authority || [];
		let isReport = authority.indexOf(14) !== -1;
		return (
			<ListItem
				leftIcon={<Description />}
				primaryText = "报表"
				containerElement={<Link to='/report' />}
				style={{
					display: isReport ? 'block' : 'none'
				}}
				>
			</ListItem>
		);
	}

});