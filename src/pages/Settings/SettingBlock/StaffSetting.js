import React from 'react';
import { Switch,Divider } from 'antd';
import SettingItem from '../../../components/SettingItem';
class StaffSetting extends React.Component {

    //注册开放设置
    onAllowAccountLogin = (checked) => {
        console.log(`switch to ${checked}`);
    }
    render() {
        return (
            <div>
                <Divider orientation="left" style={{ fontWeight: 'bold' }}>员工登录设置</Divider>
                <SettingItem title="允许使用账号密码登录">
                    <Switch defaultChecked onChange={this.onAllowAccountLogin} />
                </SettingItem>
            </div>
        )
    }
}
export default StaffSetting;