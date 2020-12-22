import React from 'react';
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { siderMenu as routes } from "../../routes/sider";

import { MyIcon } from '../MyIcon';


//显示侧边栏
class SiderBar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedkeys: [],
            openkeys: [],
        }
    }


    //处理路径，显示在左侧导航栏
    renderKey = (key) => {

        this.setState({
            selectedkeys: [key],
        });
    }
    componentDidMount() {
        let a = this.props.location.pathname;
        console.log(a)

        this.renderKey(a);
        //设置打开的菜单栏
        let spli = a.split('/')
        if (spli.length === 4) {
            this.setState({
                openkeys: ['/' + spli[1] + '/' + spli[2]]
            })
        } else {
            this.setState({
                openkeys: [],
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        let a = nextProps.location.pathname;
        if (this.props.location.pathname !== a) {

            this.renderKey(a);
            //设置打开的菜单栏
            let spli = a.split('/')
            if (spli.length === 4) {
                this.setState({
                    openkeys: ['/' + spli[1] + '/' + spli[2]]
                })
            } else {
                this.setState({
                    openkeys: [],
                })
            }
        }

    }
    handleMenuClick = p => {
        //在push页面跳转之前检查一下，如果点击的还是本页面的话将不跳转
        if (this.props.location.pathname !== p.key) {
            this.props.history.push(p.key);
        }
    }
    renderMenuItem(route) {
        return <Menu.Item
            key={route.path}
            icon={<MyIcon type={route.icon} />}
            onClick={this.handleMenuClick}
        >
            {route.title}
        </Menu.Item>
    }
    //渲染二级菜单
    renderSubMenu(route) {
        return (
            <Menu.SubMenu icon={<MyIcon type={route.icon} />} key={route.path} title={route.title}>
                {route.sub.map(r => {
                    return this.renderMenuItem(r);
                })}
            </Menu.SubMenu>
        );
    }

    onOpenChange = (openkeys) => {
        if (openkeys.length === 0 || openkeys.length === 1) {
            this.setState({
                openkeys
            })
            return
        }
        const latestOpenKey = openkeys[openkeys.length - 1]
        this.setState({
            openkeys: [latestOpenKey]
        })

    }

    render() {
        return (
            <Menu
                onOpenChange={this.onOpenChange}
                mode="inline"
                onClick={({ key }) => this.renderKey(key)}
                selectedKeys={this.state.selectedkeys}
                openKeys={this.state.openkeys}
                style={{ height: '100%', borderRight: 0 }}
            >
                {
                    routes.map(route => {
                        return route.sub ? this.renderSubMenu(route) : this.renderMenuItem(route);
                    })
                }
            </Menu>
        );
    }
}

export default withRouter(SiderBar);