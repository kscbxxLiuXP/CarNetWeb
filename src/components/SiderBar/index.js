import React from 'react';
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { homeRoutes } from "../../routes";
const routes = homeRoutes.filter(route => route.show);


class SiderBar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedkeys: [],
        }
    }


    //处理路径，显示在左侧导航栏
    renderKey = (key) => {

        this.setState({
            selectedkeys: key,
        });
    }
    componentDidMount() {
        let a = this.props.location.pathname;
        this.renderKey(a);
    }

    render() {
        return (
            <Menu
                mode="inline"
                onClick={({ key }) => this.renderKey(key)}
                selectedKeys={this.state.selectedkeys}
                style={{ height: '100%', borderRight: 0 }}
            >
                {routes.map(route => {
                    return (
                        <Menu.Item
                            key={route.path}
                            onClick={
                                p => {
                                    //在push页面跳转之前检查一下，如果点击的还是本页面的话将不跳转
                                    if (this.props.location.pathname !== p.key) {
                                        this.props.history.push(p.key);
                                    }
                                }
                            }
                        >
                            {route.title}
                        </Menu.Item>);
                })}
            </Menu>
        );
    }
}

export default withRouter(SiderBar);