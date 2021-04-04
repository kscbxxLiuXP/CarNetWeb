import React from 'react';
import { Badge, Tag, Popover, Button, } from 'antd'
import './style.css'
import { withRouter } from 'react-router';
import { ArrowRightOutlined } from '@ant-design/icons'
import { jobGetCurrentJobByVehicleID, jobGetLastJobByVehicleID } from '../../utils/apis/api_job';
import moment from 'moment';
class VehicleCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        jobGetCurrentJobByVehicleID(this.props.item.id).then(e => {
            var name = ""
            if (e.id !== -1) {
                this.props.staffList.forEach(element => {
                    if (element.id === e.staffID) {
                        name = element.name
                    }
                });
            }
            this.setState({ name, taskID: e.id })
        })
        jobGetLastJobByVehicleID(this.props.item.id).then(e => {
            var time = "暂无记录"
            if (e.id !== -1) {
                time = moment(e.step4Time).format("YYYY年MM月DD日 HH:mm:ss")
            }
            this.setState({ time: time })
        })

    }
    renderState(state) {
        switch (state) {
            case 1:
                return (
                    <Popover
                        placement="topLeft"
                        title={null}
                        content={
                            <>
                                <div style={{ marginTop: 5 }} >
                                    作业员：{this.state.name}
                                </div>
                                <div style={{ marginTop: 5 }}>
                                    作业任务：<a href={"#/home/task/manage/"+this.state.taskID}>#{this.state.taskID}</a>
                                </div>
                            </>
                        }
                    >
                        <Badge status="processing" text="作业中" />
                    </Popover>
                )
                break;
            case 2:
                return (
                    <Popover
                        placement="topLeft"
                        title={null}
                        content={
                            <>
                                <div style={{ marginTop: 5 }} >
                                    上次作业时间：<br />{this.state.time}
                                </div>

                            </>
                        }
                    >
                        <Badge status="default" text="已停止" />
                    </Popover>
                )
                break;
            default:
                return <Badge status="success" text="作业中" />
                break;
        }
    }
    renderSign(t) {
        var sign = ""
        sign = t
        return <div style={{ marginTop: 5, marginLeft: 30, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: " 0 5px", backgroundColor: "#36bbd8", color: 'white', borderRadius: 5, fontSize: 14 }}>{sign.substring(0, 1)}</div>
            <div style={{ marginLeft: 3, padding: 3, borderRadius: 5, fontSize: 14, }}>{sign.substring(1, 2)}</div>
            <div style={{ padding: 3, marginLeft: -3, borderRadius: 5, fontSize: 14, fontWeight: 'bold' }}>·</div>
            <div style={{ padding: 3, marginLeft: -3, borderRadius: 5, fontSize: 14, }}>{sign.substring(2)}</div>
        </div>
    }
    renderVehicleState(state) {
        // 1 - 正常
        // 2 - 未激活(车辆刚刚注册，系统不知道车辆是否能连入车联网)
        // 3 - 异常
        switch (state) {
            case 1:
                return <Tag color="green">正常</Tag>
                break;
            case 2:
                return <Tag color="orange">未激活</Tag>
                break;
            case 3:
                return <Tag color="red">异常</Tag>
                break;

        }
    }
    render() {
        return (

            <div className="vehicle-card-wrapper">

                <div style={{ height: 280, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', alignItems: 'center' }}>
                    <img src="assets/img/vehicle.jpg" height="280" alt="car-icon" />
                </div>

                <div className="vehicle-card-content">

                    <div style={{ marginTop: 10, fontSize: 24, display: 'flex', alignItems: 'flex-end' }}>
                        {this.props.item.name}
                        <div style={{ color: "#A9A9A9", marginLeft: 10, fontSize: 14, marginBottom: 5 }}>
                            <Tag>id:{this.props.item.id}</Tag>
                            {this.renderVehicleState(this.props.item.state)}

                        </div>
                    </div>
                    <div style={{ marginTop: 10 }} >
                        <span style={{ fontSize: 15, color: "#262626", fontWeight: 'bold' }}>
                            车牌号码:
                                </span>
                        {this.renderSign(this.props.item.sign)}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <span style={{ fontSize: 15, color: "#262626", fontWeight: 'bold' }}>
                            工作状态:
                                </span>
                        <div style={{ marginLeft: 30 }}>
                            {this.renderState(this.props.item.workState)}
                        </div>

                    </div >
                    <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 15, color: "#262626", fontWeight: 'bold' }}>
                            所在地区：
                                 </div>
                        <div style={{ marginTop: 5, marginLeft: 30 }}>{this.props.addressList.map(i => {
                            if (i.id === this.props.item.addressID)
                                return i.label
                        })}</div>
                    </div>
                    <Button style={{ borderRadius: 20, marginTop: 10, marginRight: 20, marginBottom: 10, float: "right" }} icon={<ArrowRightOutlined />} onClick={() => { this.props.history.push("/home/car/manage/" + this.props.item.id) }}>查看详细</Button>
                </div>
            </div>
        )
    }
}
export default withRouter(VehicleCard)