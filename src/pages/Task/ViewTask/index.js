import React from "react";
import { PageHeader, Descriptions, Button, Tag, message, Modal, Card, Skeleton, BackTop, Progress, Timeline, Row, Col, Affix, Result } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TaskForm } from "../TaskForm";
import moment from 'moment'
import { taskDelete, taskGetOne, taskUpdate } from "../../../utils/apis/api_task";
import { staffGetAll, staffGetByID } from "../../../utils/apis/api_staff";
import Map from "../../../components/Map";
import { jobGetOne } from "../../../utils/apis/api_job";
import { timeFormat } from "../../../utils/utils";
import { vehicleGetOne } from "../../../utils/apis/api_vehicle";

const key = "message key"
const { confirm } = Modal;
class ViewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: {},
            visible: false,
            formData: {},
            staffList: [],
            staff: {},
            job: {},
            vehicle: {},
        }
    }

    componentDidMount() {
        staffGetAll().then(e => {
            this.setState({ staffList: e })
        })
        this.getData(this.props.match.params.id)
    }
    getData(id) {
        //获取task信息
        taskGetOne(id).then(e => {
            this.setState({ data: e })
        })
        //获取与task相对应的job
        jobGetOne(id).then(e => {
            this.setState({
                job: e
            })
            if (e.step >= 2) {
                staffGetByID(e.staffID).then(e => {
                    this.setState({ staff: e })
                })
            }
            if (e.step >= 3) {
                vehicleGetOne(e.vehicleID).then(e => {
                    this.setState({ vehicle: e })
                })
            }

        })

    }
    handleDeleteTask = () => {
        var _this = this
        confirm({
            title: '你确定要删除这个任务吗?',
            icon: <ExclamationCircleOutlined />,

            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                message.loading({ content: '删除中...', key, duration: 1 })
                taskDelete(_this.props.match.params.id).then(e => {
                    message.success({ content: '删除成功!', key, duration: 2 })
                    _this.props.history.push('/home/task/manage')
                })
            },
        });
    }

    handleEditTask = () => {
        const { data } = this.state
        const formData = {
            ...data,
            startTime: moment(data['startTime'], 'YYYY-MM-DD HH:mm:ss'),
            endTime: moment(data['endTime'], 'YYYY-MM-DD HH:mm:ss')
        }
        this.setState({ formData: formData, visible: true })
    }
    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);
        values.state = this.state.data.state
        values.progress = this.state.data.process
        values.executeTime = this.state.data.executeTime
        message.loading({ content: '修改中...', key, duration: 2 })
        //修改
        taskUpdate(values).then(e => {
            console.log(values)

            this.setState({ visible: false })
            message.success({ content: '修改成功!', key, duration: 2 })
            this.getData(this.props.match.params.id)
        })

    };
    renderState() {
        var job = this.state.job
        //状态
        // 1、任务创建
        // 2、任务接单
        // 3、任务开始执行
        // 4、任务执行结束
        if (job) {
            const state = job.step
            if (state === 1) {
                return <Tag color="orange"  >等待接单</Tag>
            } else if (state === 2) {
                return <Tag color="orange"  >等待执行</Tag>
            } else if (state === 3) {
                return <Tag color="#2db7f5"  >执行中</Tag>
            } else if (state === 4) {
                return <Tag color="#87d068"  >任务完成</Tag>
            }
        }
    }
    renderProcess() {
        var job = this.state.job
        if (job) {
            const state = job.step
            if (state === 1) {
                return 0
            } else if (state === 2) {
                return 20
            } else if (state === 3) {
                return 80
            } else if (state === 4) {
                return 100
            }
        }
    }
    renderTimeLine() {
        var job = this.state.job
        if (job) {
            const state = job.step
            job.step1Time = timeFormat(job.step1Time)
            job.step2Time = timeFormat(job.step2Time)
            job.step3Time = timeFormat(job.step3Time)
            job.step4Time = timeFormat(job.step4Time)
            switch (state) {
                case 1:
                    return <Timeline style={{ marginTop: 20 }} mode={"left"}>
                        <Timeline.Item label={job.step1Time} color="green">任务创建</Timeline.Item>
                        <Timeline.Item color="orange">等待接单</Timeline.Item>
                    </Timeline>
                    break;
                case 2:
                    return <Timeline style={{ marginTop: 20 }} mode={"left"}>
                        <Timeline.Item label={job.step1Time} color="green">任务创建</Timeline.Item>
                        <Timeline.Item color="green">等待接单</Timeline.Item>
                        <Timeline.Item label={job.step2Time} color="green"><Tag color="#108ee9">{this.state.staff.name}</Tag>已接单</Timeline.Item>
                        <Timeline.Item color="orange">等待执行</Timeline.Item>

                    </Timeline>
                    break;
                case 3:
                    return <Timeline style={{ marginTop: 20 }} pending={"执行中"} mode={"left"}>
                      <Timeline.Item label={job.step1Time} color="green">任务创建</Timeline.Item>
                        <Timeline.Item color="green">等待接单</Timeline.Item>
                        <Timeline.Item label={job.step2Time} color="green"><Tag color="#108ee9">{this.state.staff.name}</Tag>已接单</Timeline.Item>
                        <Timeline.Item color="green">等待执行</Timeline.Item>
                        <Timeline.Item label={job.step3Time} color="green">开始执行<br/>由<Tag color="#108ee9">{this.state.vehicle.name}</Tag>执行作业</Timeline.Item>
                    </Timeline>
                    break;
                case 4:
                    return <Timeline style={{ marginTop: 20 }}  mode={"left"}>
                        <Timeline.Item label={job.step1Time} color="green">任务创建</Timeline.Item>
                        <Timeline.Item color="green">等待接单</Timeline.Item>
                        <Timeline.Item label={job.step2Time} color="green"><Tag color="#108ee9">{this.state.staff.name}</Tag>已接单</Timeline.Item>
                        <Timeline.Item color="green">等待执行</Timeline.Item>
                        <Timeline.Item label={job.step3Time} color="green">开始执行<br/>由<Tag color="#108ee9">{this.state.vehicle.name}</Tag>执行作业</Timeline.Item>
                        <Timeline.Item label={job.step4Time} color="green">任务完成</Timeline.Item>
                    </Timeline>
                 
                    break;

            }
        }

    }
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={"任务ID：#" + this.state.id}
                    tags={this.renderState()}
                    extra={[
                        <Button key="2" danger onClick={this.handleDeleteTask}>删除任务</Button>,
                        <Button key="1" type="primary" onClick={this.handleEditTask}>
                            完善/修改信息
                        </Button>,
                    ]}


                >

                </PageHeader>
                <br />
                <Row gutter={20}>
                    <Col span={18}>
                        <Card>

                            <Skeleton loading={!this.state.data.name} >
                                <Descriptions title="任务信息" column={2} bordered>
                                    <Descriptions.Item label="任务ID" span={2}>{this.state.data.id}</Descriptions.Item>
                                    <Descriptions.Item label="任务名称" >{this.state.data.name}</Descriptions.Item>
                                    <Descriptions.Item label="任务状态" >{this.renderState()}</Descriptions.Item>
                                    <Descriptions.Item label="开始时间">{timeFormat(this.state.data.startTime)}</Descriptions.Item>
                                    <Descriptions.Item label="截止时间">{timeFormat(this.state.data.endTime)}</Descriptions.Item>
                                    <Descriptions.Item label="任务描述" span={2}>{this.state.data.description}</Descriptions.Item>
                                    <Descriptions.Item label="任务地址" span={2}><Map width={600} height={400} selectedNode={this.state.data.address} /></Descriptions.Item>

                                </Descriptions>
                            </Skeleton>
                        </Card>

                        <Card style={{ marginTop: 20 }}>

                            <Skeleton loading={!this.state.data.name} >
                                {this.state.job.step >= 2 ?
                                    <>
                                        <Descriptions title="执行人员信息" column={2} bordered>
                                            <Descriptions.Item label="员工号" >{this.state.staff.id}</Descriptions.Item>
                                            <Descriptions.Item label="员工照片" >{this.state.staff.id}</Descriptions.Item>
                                            <Descriptions.Item label="员工姓名" >{this.state.staff.name}</Descriptions.Item>
                                            <Descriptions.Item label="身份证号码">{this.state.staff.idNumber}</Descriptions.Item>
                                            <Descriptions.Item label="性别">{this.state.staff.gender}</Descriptions.Item>
                                            <Descriptions.Item label="年龄">{this.state.staff.age}</Descriptions.Item>
                                        </Descriptions>
                                        <Button style={{ marginTop: 10 }} onClick={() => {
                                            this.props.history.push('/home/staff/manage/' + this.state.staff.id)
                                        }}>查看详细</Button>
                                    </>
                                    : <>
                                        <Descriptions title="执行人员信息" column={2} />
                                        <Result
                                            title="任务正在等待接单"
                                        />

                                    </>}
                            </Skeleton>
                        </Card>
                        <Card style={{ marginTop: 20 }}>

                            <Skeleton loading={!this.state.data.name} >
                                {this.state.job.step >= 3 ?
                                    <>
                                        <Descriptions title="执行车辆信息" column={2} bordered>
                                            <Descriptions.Item label="车辆名称" >{this.state.vehicle.name}</Descriptions.Item>
                                            <Descriptions.Item label="车牌号码" >{this.state.vehicle.sign}</Descriptions.Item>
                                            <Descriptions.Item label="注册日期" >{timeFormat(this.state.vehicle.registerTime)}</Descriptions.Item>
                                            <Descriptions.Item label="首次接入网络日期" >{timeFormat(this.state.vehicle.activationTime)}</Descriptions.Item>
                                            <Descriptions.Item label="执行作业次数">{this.state.vehicle.taskExecuteNum}</Descriptions.Item>
                                        </Descriptions>
                                        <Button style={{ marginTop: 10 }} onClick={() => {
                                            this.props.history.push('/home/car/manage/' + this.state.vehicle.id)
                                        }}>查看详细</Button>
                                    </>
                                    : <>
                                        <Descriptions title="执行车辆信息" column={2} />
                                        <Result
                                            title="暂无车辆信息"
                                        />

                                    </>}
                            </Skeleton>
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Affix offsetTop={100}>
                            <Card title="任务进度" extra={<Progress width={50} type="circle" percent={this.renderProcess()} />}>
                                {this.renderTimeLine()}

                            </Card>
                        </Affix>
                    </Col>
                </Row>

                <TaskForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.formData}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                />
                <BackTop visibilityHeight={100} style={{ right: 50 }} />
            </div>
        )
    }
}

export default ViewTask;