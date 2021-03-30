import React from 'react';
import { Switch, Divider, message } from 'antd';
import SettingItem from '../../../components/SettingItem';
import { settingAllowPSDLogin, settingGetAllowPSDLogin } from '../../../utils/apis/api_setting';
class StaffSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }


    //注册开放设置
    onAllowAccountLogin = (checked) => {
        var v = checked ? 1 : 0
        settingAllowPSDLogin(v).then(e => {
            message.success("设置修改成功！")
            this.setState({ checked })
        })
    }
    componentDidMount() {
        settingGetAllowPSDLogin().then(e => {
            this.setState({
                checked: e === 1
            })
        })
    }
    render() {
        return (
            <div>
                <Divider orientation="left" style={{ fontWeight: 'bold' }}>员工登录设置</Divider>
                <SettingItem title="允许使用账号密码登录">
                    <Switch checked={this.state.checked} onChange={this.onAllowAccountLogin} />
                </SettingItem>
            </div>
        )
    }
}
export default StaffSetting;