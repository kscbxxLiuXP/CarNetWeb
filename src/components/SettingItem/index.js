
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
            <div className="setting-item" style={{ marginLeft: 80 }}>

                <Space direction={nextLine ? "vertical" : "horizontal"} size={space ? space : 15}>
                    <div >
                        {title}
                    </div>
                    <Space direction="vertical">
                    {this.props.children}
                    </Space>
              
                </Space>
            </div>
        )
    }
}
export default SettingItem