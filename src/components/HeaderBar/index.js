import React from 'react';
import { Menu, Dropdown } from 'antd';
import { SettingOutlined, HomeOutlined,LogoutOutlined } from "@ant-design/icons"
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
        }else if(key==='index'){
            this.props.history.push('/home/dashboard')
        }
    }
    popMenu = (
        <Menu onClick={this.hanldeMenuClick}>
            <Menu.Item key="index" icon={<HomeOutlined />}>首页</Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>设置</Menu.Item>
            <Menu.Item key="logOut" icon = {<LogoutOutlined/>}>退出</Menu.Item>
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
                        <span>{getUsername()}</span>
                    </div>
                </Dropdown>
            </div>
        )
    }
}
export default withRouter(HeaderBar);