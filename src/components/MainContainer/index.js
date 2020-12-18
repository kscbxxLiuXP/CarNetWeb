import { Dropdown, Layout, Menu } from 'antd';
import React from "react";
import { withRouter } from "react-router-dom";
import { homeRoutes } from "../../routes";
import './mainContainer.css'
const { Header, Content, Sider } = Layout;
const routes = homeRoutes.filter(route => route.show);

class MainContainer extends React.Component {

    popMenu = (
        <Menu>
            <Menu.Item key="notice">通知中心        </Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="logOut">退出</Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Layout>
                <Header className="header"
                    style={{
                        backgroundColor: "#4f9ec7",
                        fontSize: 20,
                        color: "#fff",
                    }}>
                    <div className="logo">
                        基于Golang的工业车联网系统
                    </div>
                    <Dropdown overlay={this.popMenu}>
                        <div >
                            <span>超级管理员</span>
                       
                        </div>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {routes.map(route => {
                                return (<Menu.Item key={route.path} onClick={p => this.props.history.push(p.key)}>
                                    {route.title}
                                </Menu.Item>);
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: "#fff"
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(MainContainer);