import React from "react";
import { PageHeader, Descriptions, Button, Table, Tabs, Tag, message, Modal, Row, Card, Skeleton, BackTop, Statistic, Col, Affix } from 'antd'
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { CarForm } from '../ViewCar/CarForm'
import DataInspect from "./DataInspect";
import CurrentJob from "./CurrentJob";
import PreviousJob from "./PreviousJob";
import CarPermission from "./CarPermission";
import Map from "../../../components/Map";
import { vehicleDelete, vehicleGetOne, vehicleUpdate } from "../../../utils/apis/api_vehicle";
import { addressGetAll } from "../../../utils/apis/api_address";
import { timeFormat, timeMinus } from "../../../utils/utils";
import { jobGetAll, jobGetCurrentJobByVehicleID } from "../../../utils/apis/api_job";
import { taskGetAll } from "../../../utils/apis/api_task";
import { staffGetAll } from "../../../utils/apis/api_staff";
import ContinueTime from "../../../components/ContinueTime";
const { confirm } = Modal;
const { TabPane } = Tabs;
//用于表示message的key
const key = "哈哈哈"
class ViewCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            vehicle: {},
            visible: false,
            tabKey: '1',
            addressList: [],
            jobList: [],
            taskList: [],
            staffList: [],
            currentJob: {}
        }
    }

    componentDidMount() {
       
        this.getData(this.props.match.params.id)
        addressGetAll().then(e => {
            this.setState({ addressList: e })
        })
        jobGetAll().then(e => {
            e = e.filter(i => { return i.vehicleID === parseInt(this.props.match.params.id) })
            this.setState({ jobList: e })
        })
        taskGetAll().then(e => {
            this.setState({ taskList: e })
        })
        staffGetAll().then(e => {
            e.forEach(i => {
                i.key = i.id
            })
            this.setState({ staffList: e })
        })
        jobGetCurrentJobByVehicleID(this.props.match.params.id).then(e => {
            this.setState({ currentJob: e })
        })

    }
    getData(id) {
        vehicleGetOne(id).then(e => {
            this.setState({
                vehicle: e
            })
           
        })
    }

    handleDeleteCar = () => {
        confirm({
            title: '你确定要注销这辆车吗?',
            icon: <ExclamationCircleOutlined />,
            content: '注销操作不可逆',
            okText: '注销',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                message.loading({ content: "正在注销中...", key: key, duration: 1 })
                vehicleDelete(this.props.match.params.id).then(e => {
                    message.success({ content: "注销成功！", key: key, duration: 1 })
                    this.props.history.push('/home/car/manage')
                })
            },
        });
    }
    handleEditCar = () => {
        this.setState({ visible: true })
    }
    //表单提交后的回调函数
    onCreate = (values) => {


        message.loading({ content: '修改中...', key, duration: 2 })
        vehicleUpdate(values).then(e => {
            message.success({ content: '修改成功!', key, duration: 2 })
            this.setState({ visible: false })
            this.getData(this.props.match.params.id)
        })




    };
    tabChangeCallback = (key) => {
        this.setState({ tabKey: key })
    }
    getCurrentStaff() {
        var staff = {}
        this.state.staffList.forEach(i => {
            if (i.id === this.state.currentJob.staffID) {
                staff = i
            }
        })
        return staff
    }
    renderState(st) {
        switch (st) {
            case 1:
                return <Tag color="blue" >作业中</Tag>
            case 2:
                return <Tag color="green" >空闲</Tag>
        }
    }
    renderSign(t) {
        var sign = ""
        sign = t
        return <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: " 0 5px", backgroundColor: "#36bbd8", color: 'white', borderRadius: 5, fontSize: 18 }}>{sign.substring(0, 1)}</div>
            <div style={{ marginLeft: 3, padding: 3, borderRadius: 5, fontSize: 18, }}>{sign.substring(1, 2)}</div>
            <div style={{ padding: 3, marginLeft: -3, borderRadius: 5, fontSize: 18, fontWeight: 'bold' }}>·</div>
            <div style={{ padding: 3, marginLeft: -3, borderRadius: 5, fontSize: 18, }}>{sign.substring(2)}</div>
        </div>
    }
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={"车辆ID：" + this.state.id}
                    tags={this.renderState(this.state.vehicle.workState)}
                    extra={[

                        <Button key="2" danger onClick={this.handleDeleteCar}>注销车辆</Button>,
                        <Button key="1" type="primary" onClick={this.handleEditCar}>
                            完善/修改信息
                        </Button>,
                    ]}
                    footer={
                        <Tabs defaultActiveKey="1" onChange={this.tabChangeCallback}>
                            <TabPane tab="详情" key="1" />
                            <TabPane tab="权限" key="2" />
                        </Tabs>
                    }

                >
                    <Row>
                        <div style={{ flex: 1 }}>
                            <Skeleton loading={!this.state.vehicle.name}>
                                <Descriptions size="small" column={2}>
                                    <Descriptions.Item label="车辆名称" span={2}>{this.state.vehicle.name}</Descriptions.Item>

                                    <Descriptions.Item label="注册日期">{timeFormat(this.state.vehicle.registerTime)}</Descriptions.Item>
                                    <Descriptions.Item label="车牌号码">{this.state.vehicle.sign}</Descriptions.Item>

                                    <Descriptions.Item label="首次接入网络日期">{this.state.vehicle.activationTime ? timeFormat(this.state.vehicle.activationTime) : "暂未连入车联网 "}</Descriptions.Item>
                                    <Descriptions.Item label="地址标签">{this.state.addressList.map(i => {
                                        if (i.id === this.state.vehicle.addressID) {
                                            return i.label
                                        }
                                    })
                                    }</Descriptions.Item>
                                    <Descriptions.Item label="详细地址">
                                        {this.state.addressList.map(i => {
                                            if (i.id === this.state.vehicle.addressID) {
                                                return i.address
                                            }
                                        })
                                        }
                                    </Descriptions.Item>
                                </Descriptions>

                            </Skeleton>
                        </div>
                        <div className="image">
                            <div
                                style={{
                                    display: 'flex',
                                    width: 'max-content',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Statistic
                                    title="状态"
                                    value={this.state.vehicle.workState === 1 ? "运行中" : "空闲"}
                                    style={{
                                        marginRight: 32, marginTop: 20
                                    }}
                                />
                                <Statistic title="执行作业" suffix="次" style={{
                                    marginRight: 32,
                                    marginTop: 20
                                }} value={this.state.vehicle.taskExecuteNum} />
                                <img src="assets/img/vehicle.jpg" width="200" alt="car-icon" />
                            </div>
                        </div>
                    </Row>

                </PageHeader>
                <br />

                {this.state.tabKey === '1' ? <>
                    <Row gutter={10}>
                        <Col span={19}>
                            <Card size="small" title="实时位置"><Map width={800} height={600} /></Card>

                            <br />

                            <DataInspect></DataInspect>

                            <br />
                            <Card size="small" title="当前作业信息">
                                <CurrentJob durationTime={this.state.durationTime} taskList={this.state.taskList} currentJob={this.state.currentJob}></CurrentJob>
                            </Card>
                            <br />
                            <Card size="small" title="历史作业信息">
                                <PreviousJob taskList={this.state.taskList} staffList={this.state.staffList} jobList={this.state.jobList}></PreviousJob>
                            </Card>
                            <br />
                        </Col>
                        <Col span={5}>
                            <Affix offsetTop={120}>
                                <Card>
                                    {this.state.vehicle.sign ? this.renderSign(this.state.vehicle.sign) : null}
                                    <div style={{ marginTop: 10 }}>
                                        {this.renderState(this.state.vehicle.workState)}
                                    </div>

                                    {this.state.currentJob.id === -1 ? null : <div style={{ marginTop: 10 }}>
                                        <div style={{ fontSize: 16, color: "orange" }}>
                                            <WarningOutlined />请驾驶员注意休息
                                        </div>
                                        <div style={{ color: 'gray', marginTop: 10 }}>
                                            作业已持续:
                                         </div>
                                        <div style={{ fontSize: 18 }}>
                                            <ContinueTime time={this.state.currentJob.step3Time} />

                                        </div>
                                    </div>}
                                </Card>
                                {this.state.currentJob.id === -1 ? null : <Card
                                    size="small"
                                    type="inner"
                                    title="作业人员信息"
                                    extra={<a href={"#/home/staff/manage/" + this.getCurrentStaff().id}>More</a>}
                                    style={{ marginTop: 10 }}
                                >
                                    <div>
                                        <div style={{ fontSize: 16 }}>
                                            司机姓名:{this.getCurrentStaff().name}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <div style={{ fontSize: 16 }}>
                                            身份证号码:
                                        </div>
                                        <div style={{ marginLeft: 30, marginTop: 5 }}>
                                            {this.getCurrentStaff().idNumber}
                                        </div>

                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <div style={{ fontSize: 16 }}>
                                            年龄:{this.getCurrentStaff().age}岁
                                        </div>

                                    </div>
                                </Card>}

                            </Affix>

                        </Col>
                    </Row>

                </> :
                    <>
                        <Card title="车辆权限管理">
                            <CarPermission staffList={this.state.staffList} id={this.state.vehicle.id}></CarPermission>
                        </Card>
                        <br />

                    </>}


                <CarForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.vehicle}
                    addressList={this.state.addressList}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                />
                <BackTop visibilityHeight={100} style={{ right: 50 }} />
            </div>
        )
    }
}

export default ViewCar;