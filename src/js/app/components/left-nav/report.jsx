import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

import Description from 'material-ui/lib/svg-icons/action/description';
// import Add from 'material-ui/lib/svg-icons/content/add';
// import Delete from 'material-ui/lib/svg-icons/action/delete';
// import Search from 'material-ui/lib/svg-icons/action/search';
// import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';

export default React.createClass({
	render: function() {
		return (
			<ListItem
				leftIcon={<Description />}
				primaryText = "报表"
			>
			</ListItem>
	);
}

});