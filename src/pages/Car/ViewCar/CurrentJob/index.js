import React from 'react';
import { Button, Row, Col, Statistic, Descriptions,Card } from 'antd';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

class CurrentJob extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={20}>
                        <Descriptions title="任务信息">
                            <Descriptions.Item label="任务名称">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="任务ID">1810000000</Descriptions.Item>
                            <Descriptions.Item label="发布时间">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="截止时间">empty</Descriptions.Item>
                            <Descriptions.Item label="任务描述">
                                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                            </Descriptions.Item>
                        </Descriptions>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="作业人员信息"
                            extra={<a href="#">More</a>}
                        >
                               <Descriptions title="员工信息">
                            <Descriptions.Item label="姓名">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="工号">1810000000</Descriptions.Item>
                            <Descriptions.Item label="注册时间">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="身份证号码">empty</Descriptions.Item>
                        
                        </Descriptions>
                         </Card>
                    </Col>
                    <Col span={4}>
                        <Countdown title="作业已持续" value={deadline} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CurrentJob