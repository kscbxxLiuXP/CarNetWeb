import React from 'react';
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { homeRoutes } from "../../routes";
const routes = homeRoutes.filter(route => route.show);
class SiderBar extends React.Component {

    componentDidMount(){

    }
    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                {routes.map(route => {
                    return (
                        <Menu.Item
                            key={route.path}
                            onClick={
                                p => {
                                    //在push之前检查一下
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