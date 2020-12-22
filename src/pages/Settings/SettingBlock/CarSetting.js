import React from 'react';
import { Switch, Space } from 'antd';
import SettingItem from '../../../components/SettingItem';
class CarSetting extends React.Component {
    onChange = (checked) => {
        console.log(`switch to ${checked}`);
    }
    render() {
        return (
            <div>
                <Space size={20} direction="vertical">
                    <SettingItem title="开放注册">
                        <Switch defaultChecked onChange={this.onChange} />
                    </SettingItem>
                </Space>
            </div>
        )
    }
}
export default CarSetting;