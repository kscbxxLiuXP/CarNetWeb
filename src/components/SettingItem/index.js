
import React from 'react'
import { Typography, Space } from 'antd';
import './settingitem.css'
const { Title } = Typography;

class SettingItem extends React.Component {

    render() {
        let {
            title,
            space,
            nextLine,
            ...other
        } = this.props;
        return (
            <div className="setting-item">
                <Space direction={nextLine ? "vertical" : "horizontal"} size={space ? space : 15}>
                    <div style={{ fontWeight: 'bold' }}>
                        {title}
                    </div>
                    {this.props.children}
                </Space>
            </div>
        )
    }
}
export default SettingItem