import React from 'react';
import { Statistic, Card, Row, Col, Button, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Stage, Layer, Rect, Circle, Wedge } from 'react-konva';
class DataInspect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            capture: false,
        }
    }
    handleStartCapture = () => {
        this.setState({ capture: true })
    }
    handleStopCapture = () => {
        this.setState({ capture: false })
    }
    render() {
        const { capture } = this.state
        return (
            <div>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card size="small" title="实时数据采集" style={{ height: 500 }}>

                            <Card>
                                <Statistic
                                    title="当前车速"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="%"
                                />
                            </Card>
                            <Card size="small">
                                <Statistic
                                    title="Idle"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card size="small" title="实时监控">
                            <div style={{ background: "#000", width: '100%', height: 400, color: "white" }}>
                                {capture ? "获取画面中" : "停止获取画面"}
                            </div>
                            <Button type="primary" disabled={capture} onClick={this.handleStartCapture}>开始获取摄像头画面</Button>
                            <Button type="primary" disabled={!capture} onClick={this.handleStopCapture}>停止获取摄像头画面</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default DataInspect