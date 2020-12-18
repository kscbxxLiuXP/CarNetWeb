import React from 'react';
import { Menu, Dropdown } from 'antd';
import './headerBar.css';
import { withRouter } from "react-router-dom";
import { clearToken } from "../../utils/auth"
class HeaderBar extends React.Component {
    hanldeMenuClick = (e) => {
        console.log("click key:" + e.key)
        let key = e.key
        if (key === "logOut") {
            clearToken();
            console.log("退出登录");
            this.props.history.push('/login');
        }
    }
    popMenu = (
        <Menu onClick={this.hanldeMenuClick}>
            <Menu.Item key="notice">通知中心</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="logOut">退出</Menu.Item>
        </Menu>
    );

    render() {
        return (
            <div className="headerbar">
                <div className="logo">
                    基于Golang的工业车联网系统
                    </div>
                <Dropdown overlay={this.popMenu}>
                    <div >
                        <span>超级管理员</span>
                    </div>
                </Dropdown>
            </div>
        )
    }
}
export default withRouter(HeaderBar);