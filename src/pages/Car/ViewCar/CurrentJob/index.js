import React from 'react';
import { Button, Row, Col, Statistic, Descriptions, Card } from 'antd';
import { timeFormat } from '../../../../utils/utils';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

class CurrentJob extends React.Component {
    render() {
        return (
            <div>
                {this.props.currentJob.id === -1 ? <div>
                </div> :
                    <Row>
                        <Col span={20}>
                            <Descriptions title="任务信息">
                                <Descriptions.Item label="任务名称">{this.props.taskList.map(i => {
                                    if (i.id === this.props.currentJob.id) {
                                        return i.name
                                    }
                                })}</Descriptions.Item>
                                <Descriptions.Item label="任务ID">{this.props.currentJob.id}</Descriptions.Item>
                                <Descriptions.Item label="发布时间">  {timeFormat(this.props.currentJob.step1Time)}</Descriptions.Item>
                                <Descriptions.Item label="截止时间">  {this.props.taskList.map(i => {
                                    if (i.id === this.props.currentJob.id) {
                                        return timeFormat(i.endTime)
                                    }
                                })}</Descriptions.Item>
                                <Descriptions.Item label="任务描述">
                                    {this.props.taskList.map(i => {
                                        if (i.id === this.props.currentJob.id) {
                                            return i.description
                                        }
                                    })}
                                </Descriptions.Item>
                            </Descriptions>

                        </Col>
                        <Col span={4}>
                            <div style={{ color: 'gray' }}>
                                作业已持续:
                            </div>
                            <div style={{fontSize:18}}>
                                {this.props.durationTime}
                            </div>

                        </Col>
                    </Row>
                }
            </div>


        )
    }
}
export default CurrentJob