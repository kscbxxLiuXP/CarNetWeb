import React from "react";
import { Image, Card, Row, Col, Badge, DatePicker, TimePicker, Spin, Descriptions, Divider, Button } from 'antd'
import { MyIcon } from '../../components/MyIcon/index'
import './dash.css'
import { Liquid } from '@ant-design/charts';
import { get, post, del, put } from '../../utils/request';
import moment from 'moment'
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.config = {
            percent: 0.25,
            statistic: {
                content: {
                    style: {
                        fontSize: 40,
                        fill: 'black',
                    },
                },
            },
        };
        this.state = {
            loading: true,
            tasks: [
                { title: "任务1", id: 1001, description: "这是描述", time: "6天前" },
                { title: "任务2", id: 1002, description: "这是描述", time: "6天前" },
                { title: "任务3", id: 1003, description: "这是描述", time: "6天前" },
                { title: "任务4", id: 1004, description: "这是描述", time: "6天前" },
                { title: "任务5", id: 1005, description: "这是描述", time: "6天前" },
                { title: "任务6", id: 1006, description: "这是描述", time: "6天前" },
            ],
            staffs: [
                { name: "员工1", id: 1001, num: 18000 },
                { name: "员工2", id: 1002, num: 18000 },
                { name: "员工3", id: 1003, num: 18000 },
                { name: "员工4", id: 1004, num: 18000 },
                { name: "员工5", id: 1005, num: 18000 },
                { name: "员工6", id: 1006, num: 18000 },
                { name: "员工7", id: 1007, num: 18000 },
                { name: "员工8", id: 1008, num: 18000 },
            ]
        }
    }

    componentDidMount() {
        get('/log/all').then(
            res => {
                console.log(res.data.log);
                this.setState({
                    logs: res.data.log,
                    loading: false,
                })
            }
        )
    }
    render() {
        return (
            <div >

                <Row gutter={24}>
                    <Col span={16}>
                        <Card title="进行中的任务" extra={<a href="#/home/task/manage">全部任务</a>} style={{ height: '100%' }}>
                            {this.state.tasks.map((item, index) => {
                                return <Card.Grid key={index} style={gridStyle}>
                                    <div>
                                        <MyIcon style={{ fontSize: 20, marginRight: 10 }} type="icon-renwu" />
                                        <a href={"#/home/task/manage/" + item.id} className="a-label">
                                            {item.title}
                                        </a>
                                    </div>
                                    <div style={{ marginTop: 10, color: "darkgray" }}>
                                        {item.description}
                                    </div>
                                    <div style={{ textAlign: "right", color: "lightgray" }}>
                                        {item.time}
                                    </div>
                                </Card.Grid>
                            })}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="排行榜">

                            {this.state.staffs.map((item, index) => {
                                return <div key={index} style={{ fontSize: 16, marginTop: 10 }}>
                                    {index < 4 ? <Badge style={{ backgroundColor: "#314659", color: "ghostwhite" }} count={index + 1} /> : <Badge style={{ backgroundColor: "snow", color: "dimgray" }} count={index + 1} />}
                                    <a href={"#/home/staff/manage/" + item.id} className="a-label" style={{ marginLeft: 20 }}>{item.name}
                                    </a>
                                    <div style={{ width: '10%', float: "right" }}>
                                        {item.num}
                                    </div>
                                </div>
                            })}



                        </Card>
                    </Col>
                </Row>
                <br />
                <Row gutter={24}>
                    <Col span={16}>
                        <Card title="运行中的车辆" extra={<a href="#/home/task/manage">全部车辆</a>} style={{ height: '100%' }}>
                            {this.state.tasks.map((item, index) => {
                                return <Card.Grid key={index} style={gridStyle}>
                                    <div>
                                        <MyIcon style={{ fontSize: 20, marginRight: 10 }} type="icon-renwu" />
                                        <a href={"#/home/task/manage/" + item.id} className="a-label">
                                            {item.title}
                                        </a>
                                    </div>
                                    <div style={{ marginTop: 10, color: "darkgray" }}>
                                        {item.description}
                                    </div>
                                    <div style={{ textAlign: "right", color: "lightgray" }}>
                                        {item.time}
                                    </div>
                                </Card.Grid>
                            })}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="车辆利用率" >
                            <Liquid {...this.config} style={{ height: 250 }} />
                        </Card>
                    </Col>
                </Row>
                <br />
                <Card>
                    <Spin spinning={this.state.loading}>
                        {this.state.loading ? null : this.state.logs.map((item, index) => {
                            return <div key={index}>
                                <Descriptions bordered column={1}>
                                    <Descriptions.Item label="id">{item.id}</Descriptions.Item>
                                    <Descriptions.Item label="vehicleID">{item.vehicleID}</Descriptions.Item>
                                    <Descriptions.Item label="staffID">{item.staffID}</Descriptions.Item>
                                    <Descriptions.Item label="time">{item.time}</Descriptions.Item>
                                </Descriptions>
                                <DatePicker format="YYYY-MM-DD HH:mm:ss" value={moment(item.time)} showTime />
                                <Button></Button>
                                <Divider></Divider>
                            </div>
                        })}

                    </Spin>

                </Card>
            </div>
        );
    }
}

const gridStyle = {
    width: '25%',

};

export default Dashboard