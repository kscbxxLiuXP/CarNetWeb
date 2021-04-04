import { Layout, Menu } from 'antd';
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { clearToken } from '../../utils/auth';

import HeaderBar from '../HeaderBar';
import SiderBar from '../SiderBar';
import './mainContainer.css'
const { Header, Content, Sider, Footer } = Layout;


class MainContainer extends React.Component {

    componentDidMount() {
        window.innerHeight
    }

    render() {
        return (
            <Layout style={{ minHeight: `${window.innerHeight - 1}px` }}>
                <Header className="header"
                    style={{
                        backgroundColor: "#4f9ec7",
                        fontSize: 20,
                        color: "#fff",
                        position: 'fixed', zIndex: 1, width: '100%'
                    }}>
                    <HeaderBar />
                </Header>
                <Layout style={{ paddingLeft: 30, paddingRight: 10, marginTop: 64 }}>
                    <Sider style={{
                        overflow: 'auto',
                        height: '200vh',
                        position: 'fixed',
                    }} width={200} className="site-layout-background">
                        <SiderBar />
                    </Sider>
                    <Layout style={{ marginLeft: 200, padding: '16px', backgroundColor: '#f8f8fb' }}>

                        <Content
                            className="site-layout-background"
                            style={{

                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: 'center', backgroundColor: '#f8f8fb' }}>工业车联网 ©2020 Created by NEU</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(MainContainer);