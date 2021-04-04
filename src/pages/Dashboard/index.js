import React from "react";
import { Image, Card, Row, Col, Badge, DatePicker, TimePicker, Spin, Descriptions, Divider, Button, Tooltip, Progress } from 'antd'
import { MyIcon } from '../../components/MyIcon/index'
import './dash.css'
import { Liquid } from '@ant-design/charts';
import { EnvironmentOutlined, ClockCircleOutlined, CarOutlined, ScheduleOutlined, UnorderedListOutlined, WarningOutlined } from '@ant-design/icons';
import { get, post, del, put } from '../../utils/request';
import moment from 'moment'
import DashCardList from "./DashCardList";
import { withRouter } from "react-router";
import { taskGetAll } from "../../utils/apis/api_task";
import { jobGetAll } from "../../utils/apis/api_job";
import { vehicleAll } from "../../utils/apis/api_vehicle";
import { staffGetAll } from "../../utils/apis/api_staff";
import { timeFormat } from "../../utils/utils";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.config = {
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
            taskList: [],
            jobList: [],
            vehicleList: [],
            staffList: [],
            staffs: [
                { name: "员工1", id: 1, num: 18000 },
                { name: "员工2", id: 2, num: 18000 },
                { name: "员工3", id: 3, num: 18000 },
                { name: "员工4", id: 4, num: 18000 },
                { name: "员工5", id: 5, num: 18000 },
                { name: "员工6", id: 6, num: 18000 },
                { name: "员工7", id: 7, num: 18000 },
                { name: "员工8", id: 8, num: 18000 },
            ]
        }
    }

    componentDidMount() {
        taskGetAll().then(e => {
            this.setState({ taskList: e })
        })
        jobGetAll().then(e => {
            this.setState({ jobList: e })
        })
        vehicleAll().then(e => {
            this.setState({ vehicleList: e })
        })
        staffGetAll().then(e => {
            this.setState({ staffList: e })
        })
    }

    renderSign(t) {
        var sign = ""
        sign = t
        return <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: " 0 5px", backgroundColor: "#36bbd8", color: 'white', borderRadius: 5, fontSize: 14 }}>{sign.substring(0, 1)}</div>
            <div style={{ marginLeft: 3, padding: 3, borderRadius: 5, fontSize: 14, }}>{sign.substring(1, 2)}</div>
            <div style={{ padding: 3, marginLeft: -3, borderRadius: 5, fontSize: 14, fontWeight: 'bold' }}>·</div>
            <div style={{ padding: 3, marginLeft: -3, borderRadius: 5, fontSize: 14, }}>{sign.substring(2)}</div>
        </div>
    }
    getTask(id) {
        var task = {}
        this.state.taskList.forEach(i => {
            if (i.id === id) {
                task = i
            }
        })
        return task
    }
    getStaff(id) {
        var staff = {}
        this.state.staffList.forEach(i => {
            if (i.id === id) {
                staff = i
            }
        })
        return staff
    }
    getTop10() {
        var list = this.state.staffList
        list.sort(function (a, b) {
            return a.taskNum > b.taskNum
        })
        return list
    }
    getRate() {
        var d = {
            rate: 0.0,
            work: 0,
            total: 0,
        }

        this.state.vehicleList.forEach(e => {
            d.total++
            if (e.workState === 1) {
                d.work++
            }
        })

        d.rate = d.work / d.total
        return d
    }
    render() {
        return (
            <div >
                <Row gutter={15}>
                    <Col span={18}>
                        <Row gutter={10}>
                            <Col span={8}>
                                <DashCardList title={<div><ScheduleOutlined style={{ marginRight: 10 }} to="/home/task/manage" />等待执行</div>} to="/home/task/manage">
                                    {this.state.jobList.map((i, index) => {
                                        if (i.step < 3) {
                                            var task = this.getTask(i.id)
                                            return <div key={index} className="dashcard-waiting-task">
                                                <div className="dashcard-waiting-task-header">
                                                    <div className="dashcard-waiting-task-title">
                                                        {task.name}
                                                    </div>
                                                    <div className="dashcard-waiting-task-status">
                                                        {i.step === 1 ? "等待接单" : "等待执行"}
                                                    </div>
                                                </div>
                                                <div className="dashcard-waiting-task-description">
                                                    {task.description}
                                                    {/* {这是任务描述，首先前往地点1，然后前往地点2，将那里的货物运往地点3，运输途中主义安全} */}
                                                </div>
                                                <div className="dashcard-waiting-task-address">
                                                    <EnvironmentOutlined />节点{task.address}
                                                </div>
                                                <div className="dashcard-waiting-task-time">
                                                    <Tooltip title="任务发布时间">
                                                        <ClockCircleOutlined />{timeFormat(i.step1Time)}
                                                    </Tooltip>

                                                </div>
                                                <div className="dashcard-waiting-task-button" onClick={() => { this.props.history.push('/home/task/manage/' + i.id) }}>
                                                    查看
                                            </div>

                                            </div>
                                        }
                                    })}
                                </DashCardList>
                            </Col>
                            <Col span={8}>
                                <DashCardList to="/home/task/manage" title={<div><UnorderedListOutlined style={{ marginRight: 10 }} />进行中</div>}>
                                    {this.state.jobList.map((i, index) => {
                                        if (i.step === 3) {
                                            var task = this.getTask(i.id)
                                            return <div className="dashcard-running-task">
                                                <div className="dashcard-running-task-header">
                                                    <div className="dashcard-running-task-title">
                                                        {task.name}
                                                    </div>
                                                    <div className="dashcard-running-task-status">
                                                        进行中
                                                 </div>
                                                </div>
                                                <div className="dashcard-running-task-description">
                                                    {task.description}
                                                </div>
                                                <div>
                                                    <Progress percent={80} />
                                                </div>
                                                <div className="dashcard-running-task-address">
                                                    <EnvironmentOutlined />节点{task.address}
                                                </div>
                                                <div className="dashcard-running-task-time">
                                                    <Tooltip title="任务发布时间">
                                                        <ClockCircleOutlined />{timeFormat(i.step1Time)}
                                                    </Tooltip>
                                                </div>
                                                <div className="dashcard-running-task-button" onClick={() => { this.props.history.push('/home/task/manage/' + i.id) }}>
                                                    查看
                                        </div>

                                            </div>
                                        }
                                    })}

                                </DashCardList>
                            </Col>
                            <Col span={8}>
                                <DashCardList to="/home/car/manage" title={<div><CarOutlined style={{ marginRight: 10 }} />运行中</div>}>
                                    {this.state.vehicleList.map((i, index) => {
                                        if (i.workState === 1) {
                                            return <div className="dashcard-running-vehicle">
                                                <div className="dashcard-running-vehicle-header">
                                                    <div className="dashcard-running-vehicle-title">
                                                        {this.renderSign(i.sign)}
                                                    </div>
                                                    <div className="dashcard-running-vehicle-status">
                                                        运行中
                                                    </div>
                                                </div>
                                                <div>
                                                    驾驶员：{this.getStaff(i.workStaffID).name}
                                                </div>
                                                <div>
                                                    驾驶员身份证：{this.getStaff(i.workStaffID).idNumber}
                                                </div>
                                                <div style={{ fontSize: 16, marginTop: 10, color: "orange" }}>
                                                    <WarningOutlined />请驾驶员注意休息
                                                </div>

                                                <div className="dashcard-running-vehicle-button" onClick={() => {
                                                    this.props.history.push('/home/car/manage/' + i.id)
                                                }}>
                                                    查看
                                        </div>
                                            </div>
                                        }

                                    })}

                                </DashCardList>
                            </Col>

                        </Row>
                    </Col>
                    <Col span={6}>
                        <Card title="排行榜(任务数)">
                            {this.getTop10().map((item, index) => {
                                return <div key={index} style={{ fontSize: 16, marginTop: 10, display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                                    <div>
                                        {index < 4 ? <Badge style={{ backgroundColor: "#314659", color: "ghostwhite" }} count={index + 1} /> : <Badge style={{ backgroundColor: "snow", color: "dimgray" }} count={index + 1} />}
                                        <a href={"#/home/staff/manage/" + item.id} className="a-label" style={{ marginLeft: 20 }}>{item.name}
                                        </a>
                                    </div>

                                    <div style={{}}>
                                        {item.taskNum}
                                    </div>
                                </div>
                            })}



                        </Card>
                        <Card size="small" style={{ marginTop: 10 }} title="车辆利用率">
                            <Liquid percent={this.getRate().rate} {...this.config} style={{ height: 250 }}></Liquid>
                            <div style={{textAlign:"center",fontSize:20}}>
                                {this.getRate().work}/{this.getRate().total}
                            </div>
                        </Card>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

const gridStyle = {
    width: '25%',

};

export default withRouter(Dashboard)