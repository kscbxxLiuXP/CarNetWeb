import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { SettingOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons"
import './headerBar.css';
import { withRouter } from "react-router-dom";
import { clearToken, getUsername } from "../../utils/auth"
class HeaderBar extends React.Component {
    hanldeMenuClick = (e) => {
        console.log("click key:" + e.key)
        let key = e.key
        if (key === "logOut") {
            clearToken();
            console.log("退出登录");
            this.props.history.push('/login');
        } else if (key === "setting") {
            this.props.history.push('/home/settings')
        } else if (key === 'index') {
            this.props.history.push('/home/dashboard')
        }
    }
    popMenu = (
        <Menu onClick={this.hanldeMenuClick} style={{ width: 120 }}>
            <Menu.Item key="index" icon={<HomeOutlined />}>首页</Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>设置</Menu.Item>
            <Menu.Item key="logOut" icon={<LogoutOutlined />}>退出</Menu.Item>
        </Menu>
    );

    render() {
        return (
            <div className="headerbar">
                <div className="logo">
                    基于Golang的工业车联网系统
                </div>

                <div>
                    <Dropdown overlay={this.popMenu}>
                        <Button type="text" style={{ height: '100%', color: "white", fontSize: 18 }}>{getUsername()}</Button>
                    </Dropdown>
                </div>
            </div>
        )
    }
}
export default withRouter(HeaderBar);