import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router'

import AccountBox from 'material-ui/lib/svg-icons/action/account-box';
import Add from 'material-ui/lib/svg-icons/content/add';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import {arrayHas} from '../utils.jsx'



export default React.createClass({
    render: function () {
        let authority = this.props.user.authority || [];
        let isFind = authority.indexOf(6);
        let isAdd = authority.indexOf(7);
        let isUser = arrayHas(authority, [6, 7, 8, 9]);
        const secondListItems = [
            <ListItem
                primaryText="查找"
                key={1}
                leftIcon={<Search/>}
                containerElement={<Link to="/user/list"/>}
                style={{
                    display: isFind ? 'block' : 'none'
                }}
                />,
            <ListItem
                primaryText="添加"
                key={2}
                leftIcon={<Add/>}
                containerElement={<Link to="/user/add"/>}
                style={{
                    display: isAdd ? 'block' : 'none'
                }}
                />
        ];
        return (
            <ListItem primaryTogglesNestedList= {true}
                leftIcon={<AccountBox/>}
                primaryText = "用户管理"
                nestedItems = {secondListItems}
                style={{
                    display: isUser ? 'block' : 'none'
                }}
                >
            </ListItem>
        );
    }

});