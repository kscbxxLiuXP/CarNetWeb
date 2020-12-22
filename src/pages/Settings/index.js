import { Layout, Menu, PageHeader } from 'antd';
import React from 'react';
import { MyIcon } from '../../components/MyIcon';
import AccountSetting from './SettingBlock/AccountSetting';
import CarSetting from './SettingBlock/CarSetting';
import StaffSetting from './SettingBlock/StaffSetting';
import TaskSetting from './SettingBlock/TaskSetting';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



class Settings extends React.Component {
    state = {
        key: '1',
    }
    renderSetting = (key) => {
        switch (key) {
            case '1':
                return <CarSetting />
            case '2':
                return <StaffSetting />
            case '3':
                return <TaskSetting />
            case '4':
                return <AccountSetting />
        }
    }
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="设置"

                >

                </PageHeader>
                <div style={{ marginTop: 10 }}>
                    <Layout className="site-layout-background" style={{ background: "white", minHeight: `${window.innerHeight - 0.4 * window.innerHeight}px` }}>
                        <Sider className="site-layout-background" style={{ background: "white" }} width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                onClick={({ key }) => this.setState({ key: key })}
                            >

                                <Menu.Item key="1" icon={<MyIcon type="icon-car" />}>车辆设置</Menu.Item>
                                <Menu.Item key="2" icon={<MyIcon type="icon-staff" />}>员工设置</Menu.Item>
                                <Menu.Item key="3" icon={<MyIcon type="icon-task" />}>任务设置</Menu.Item>
                                <Menu.Item key="4" icon={<MyIcon type="icon-account" />}>账号设置</Menu.Item>

                            </Menu>
                        </Sider>
                        <Content style={{ marginTop: 20, marginLeft: 30, minHeight: 280 }}>
                            {this.renderSetting(this.state.key)}

                        </Content>
                    </Layout>
                </div>

            </div>
        )
    }
}
export default Settings;