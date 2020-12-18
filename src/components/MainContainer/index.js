import { Layout, Menu } from 'antd';
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { clearToken } from '../../utils/auth';

import HeaderBar from '../HeaderBar';
import SiderBar from '../SiderBar';
import './mainContainer.css'
const { Header, Content, Sider } = Layout;


class MainContainer extends React.Component {

    componentDidMount(){
    
    }

    render() {
        return (
            <Layout>
                <Header className="header"
                    style={{
                        backgroundColor: "#4f9ec7",
                        fontSize: 20,
                        color: "#fff",
                    }}>
                    <HeaderBar />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <SiderBar />
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