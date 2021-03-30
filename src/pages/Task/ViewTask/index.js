import React from "react";
import { PageHeader, Descriptions, Button, Table, Tabs, Tag, message, Modal, Row, Card, Skeleton, BackTop, Statistic, Progress } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TaskForm } from "../TaskForm";
import moment from 'moment'
import { taskDelete, taskGetOne, taskUpdate } from "../../../utils/apis/api_task";
import { staffGetAll, staffGetByID } from "../../../utils/apis/api_staff";

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
            staff: {}
        }
    }

    componentDidMount() {
        staffGetAll().then(e => {
            this.setState({ staffList: e })
        })
        this.getData(this.props.match.params.id)
    }
    getData(id) {
        taskGetOne(id).then(e => {
            this.setState({ data: e }, () => {
                staffGetByID(this.state.data.masterID).then(e => {
                    this.setState({ staff: e })
                })
            })
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
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={"任务ID：" + this.state.id}
                    tags={<Tag color="blue">作业中</Tag>}
                    extra={[

                        <Button key="2" danger onClick={this.handleDeleteTask}>删除任务</Button>,
                        <Button key="1" type="primary" onClick={this.handleEditTask}>
                            完善/修改信息
                        </Button>,
                    ]}


                >

                </PageHeader>
                <br />
                <Card>

                    <Skeleton loading={!this.state.data.name} >
                        <Descriptions title="任务信息" column={2} bordered>
                            <Descriptions.Item label="任务名称" >{this.state.data.name}</Descriptions.Item>

                            <Descriptions.Item label="任务ID">{this.state.data.id}</Descriptions.Item>


                            <Descriptions.Item label="开始时间">{this.state.data.startTime}</Descriptions.Item>
                            <Descriptions.Item label="负责人">{this.state.staff.name}</Descriptions.Item>
                            <Descriptions.Item label="截止时间">{this.state.data.endTime}</Descriptions.Item>
                            <Descriptions.Item label="任务地址" span={2}>{this.state.data.address}</Descriptions.Item>
                            <Descriptions.Item label="任务描述" span={2}>{this.state.data.description}</Descriptions.Item>
                            <Descriptions.Item label="任务状态" span={2}><Tag color="blue">作业中</Tag></Descriptions.Item>
                            <Descriptions.Item label="任务进度" span={2}><Progress type="circle" percent={75} /></Descriptions.Item>
                        </Descriptions>

                    </Skeleton>
                </Card>

                <TaskForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.formData}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                    staffList={this.state.staffList}
                />
                <BackTop visibilityHeight={100} style={{ right: 50 }} />
            </div>
        )
    }
}

export default ViewTask;