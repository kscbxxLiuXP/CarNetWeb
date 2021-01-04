import React from "react";
import { PageHeader, Descriptions, Button, Table, Tabs, Tag, message, Modal, Row, Card, Skeleton, BackTop, Statistic, Progress, Tooltip } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import moment from 'moment'
import { StaffForm } from "../StaffForm";
import { AuthModal } from "../AuthModal";

const key = "message key"
const { confirm } = Modal;

class ViewStaff extends React.Component {
    constructor(props) {
        super(props);
        this.authColums = [
            {
                title: "授权号",
                dataIndex: "authIndex"
            },
            {
                title: "授权车辆ID",
                dataIndex: "id"
            },
            {
                title: "授权车辆名称",
                dataIndex: "name"
            },
            {
                title: "授权车辆地址",
                dataIndex: "address"
            },
            {
                title: "操作",
                dataIndex: "操作",
                render: (text, record) => <>
                    <Button danger onClick={() => { this.handleResolveAuth(record) }}>解除</Button>
                </>
            }
        ]
        this.taskLogColumns = [
            {
                title: "作业ID",
                dataIndex: "id",
                render: text => <a href={"#/home/task/manage/" + text}>#{text}</a>
            },
            {
                title: "作业名称：",
                dataIndex: "name",
                render: (text, record) => <Tooltip title={record.description}>{text}</Tooltip>
            },
            {
                title: "作业状态",
                dataIndex: "state",
                render: (text, record) => <>{this.renderTaskState(text)}</>
            },
        ]
        this.state = {
            id: this.props.match.params.id,
            data: {},
            visible: false,
            authDataSource: [],
            taskLogDataSource: [],
            newAuthData: { ids: [], names: [] },//提交给新增权限表单的数据
            authVisible: false//新增权限Modal的可视
        }
    }
    componentDidMount() {

        let data = this.getData(this.props.match.params.id)
        this.setState({ data })
        this.setState({
            authDataSource: [{
                key: 1,
                authIndex: 1,
                name: "车辆1",
                id: 101,
                address: "辽宁浑南",
            }],
            taskLogDataSource: [{
                key: 10001,
                id: 10001,
                name: "任务1",
                description: "这是任务1的描述",
                state: 1,
            }]
        })


    }
    getData(id) {

        return {
            id: id,
            name: "员工1",
            idNumber: "321283200005126478",
            gender: "男",
            age: "18",
        }

    }
    handleResolveAuth = (record) => {
        var _this = this;
        confirm(
            {
                title: '你确定要解除该权限吗?',
                icon: <ExclamationCircleOutlined />,
                okText: '注销',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    const data = [..._this.state.authDataSource];
                    _this.setState({ authDataSource: data.filter((i) => i.id != record.id) })
                    message.success("解除成功！")
                }
            }
        )

    }
    renderTaskState = (state) => {
        switch (state) {
            case 1:
                return <Tag color="green">成功</Tag>
            default:
                return <Tag >未知</Tag>;
        }
    }
    handleDeleteStaff = () => {
        confirm({
            title: '你确定要删除这个员工吗?',
            icon: <ExclamationCircleOutlined />,

            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {

                message.success("删除成功！")
            },
        });
    }

    handleEditStaff = () => {
        this.setState({ visible: true })
    }
    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);
        this.setState({ data: values })
        message.loading({ content: '修改中...', key, duration: 2 })
        setTimeout(() => {
            this.setState({ visible: false })
            message.success({ content: '修改成功!', key, duration: 2 })
        }, 500)

    };

    handleNewAuth = () => {
        const { data } = this.state
        const d = { ids: [data.id], names: [data.name] }
        this.setState({ newAuthData: d, authVisible: true })

    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={"员工ID：" + this.state.id}
                    tags={<Tag color="blue">作业中</Tag>}
                    extra={[
                        <Button key="2" danger onClick={this.handleDeleteStaff}>删除任务</Button>,
                        <Button key="1" type="primary" onClick={this.handleEditStaff}>
                            完善/修改信息
                        </Button>,
                    ]}


                >
                    <Descriptions column={2}>
                        <Descriptions.Item label="姓名"> {data.name}</Descriptions.Item>
                        <Descriptions.Item label="员工号"> {data.id}</Descriptions.Item>
                        <Descriptions.Item label="身份证号"> {data.idNumber}</Descriptions.Item>
                        <Descriptions.Item label="性别"> {data.gender}</Descriptions.Item>
                        <Descriptions.Item label="年龄"> {data.age}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                <br />

                <Card title="授权管理" extra={<Button type="primary" onClick={this.handleNewAuth}>新增授权</Button>}>
                    <Table columns={this.authColums} dataSource={this.state.authDataSource} />
                </Card>
                <br />

                <Card title="作业记录">
                    <Table columns={this.taskLogColumns} dataSource={this.state.taskLogDataSource} />
                </Card>

                <StaffForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.data}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                />
                <AuthModal
                    visible={this.state.authVisible}
                    onCreate={(values) => {
                        message.success("授权成功！")
                        const authDataSource = [...this.state.authDataSource];

                        this.setState({ authVisible: false, authDataSource: [...values, ...authDataSource], newAuthData: { ids: [], names: [] } })

                    }}
                    data={this.state.newAuthData}
                    onCancel={() => {
                        this.setState({ authVisible: false })
                    }}
                />

            </div>
        )
    }
}

export default ViewStaff;