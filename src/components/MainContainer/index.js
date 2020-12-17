import React from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {homeRoutes} from "../../routes";


const {Header, Content, Sider} = Layout;
const routes = homeRoutes.filter(route => route.show);

class MainContainer extends React.Component {
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
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            {routes.map(route => {
                                return (<Menu.Item key={route.path}>
                                    {route.title}
                                </Menu.Item>);
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
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

export default MainContainer