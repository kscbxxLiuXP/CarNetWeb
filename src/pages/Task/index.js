import React from "react";
import { Card, PageHeader, Row, Col, Statistic, Divider, List, Skeleton, Button, Input, Dropdown, Menu, Progress, BackTop, message, Modal, Badge } from 'antd';
import { PlusOutlined, DownOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { MyIcon } from '../../components/MyIcon/index'
import { TaskForm } from "./TaskForm";
import moment from 'moment';
import { staffGetAll } from "../../utils/apis/api_staff";
import { taskDelete, taskGetAll, taskUpdate } from "../../utils/apis/api_task";
const { confirm } = Modal

const count = 3;
const key = "message key"
const ListItem = ({ title, context }) => {
    return (
        <div style={{ color: "gray", marginRight: 50 }}>
            {title}
            <div style={{ marginTop: 5 }}>
                {context}
            </div>
        </div>
    )
}
class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            list: [],
            visible: false,
            data: {},
            staffList: []
        }

    }


    componentDidMount() {
        staffGetAll().then(e => {
            this.setState({ staffList: e }, () => {
                this.getData()
            })
        })

    }

    getData() {
        this.setState({ loading: true })
        taskGetAll().then(e => {
            e.forEach(element => {
                element.startTime = moment(element.startTime).format("YYYY-MM-DD HH:MM:SS")
            });
            this.setState({
                loading: false,
                list: e
            })
        })
    };
    handleSearch = value => {
        console.log(value)
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
            this.getData()
        })
    };
    renderStatus(state) {
        //状态
        // 1-等待执行
        // 2-执行中
        // 3-执行完成
        if (state === 1) {
            return <Badge status="warning" text="等待执行" />
        } else if (state === 2) {
            return <Badge status="processing" text="执行中" />
        } else if (state === 3) {
            return <Badge status="success" text="执行完成" />
        }
    }
    render() {
        const { loading, list } = this.state;
        const menu = (item) => {
            return (
                <Menu onClick={
                    ({ key }) => {
                        if (key === '1') {

                            const data = {
                                ...item,
                                startTime: moment(item['startTime'], 'YYYY-MM-DD HH:mm:ss'),
                                endTime: moment(item['endTime'], 'YYYY-MM-DD HH:mm:ss')
                            }
                            this.setState({ data: data, visible: true })
                        } else if (key === '2') {
                            let _this = this
                            confirm({
                                title: '你确定要删除这个任务吗?',
                                icon: <ExclamationCircleOutlined />,

                                okText: '删除',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    message.loading({ content: '删除中...', key, duration: 2 })
                                    taskDelete(item.id).then(e => {
                                        _this.getData()
                                        message.success({ content: '删除成功!', key, duration: 2 })
                                    })

                                },
                            });
                        }
                    }
                }
                >
                    <Menu.Item key='1'>
                        <EditOutlined />编辑
                    </Menu.Item>
                    <Menu.Item danger key='2'><DeleteOutlined />删除</Menu.Item>
                </Menu >
            )
        };
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="任务管理">

                </PageHeader>
                <br />
                <Card>
                    <Row>
                        <Col span={8}>
                            <Statistic style={{ textAlign: "center" }} title="代办任务" value={112893} />

                        </Col>

                        <Col span={8}>
                            <Statistic style={{ textAlign: "center" }} title="平均任务处理时间" value={112893} />
                        </Col>
                        <Col span={8}>
                            <Statistic style={{ textAlign: "center" }} title="本周完成任务数" value={112893} />
                        </Col>
                    </Row>
                </Card>

                <br />
                <Card
                    title="任务列表"
                    extra={<Input.Search placeholder="请输入" onSearch={this.handleSearch} />}
                >
                    <div>
                        <Button type="dashed" style={{ width: '100%' }} icon={<PlusOutlined />} onClick={() => this.props.history.push('/home/task/new')}>发布任务</Button>
                    </div>
                    <br />
                    <List

                        className="demo-loadmore-list"
                        loading={loading}
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                actions={
                                    [
                                        <a href={"#/home/task/manage/" + item.id} key="list-loadmore-edit">查看</a>,
                                        <Dropdown overlay={menu(item)}>
                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                更多 <DownOutlined />
                                            </a>
                                        </Dropdown>,
                                    ]
                                }
                                style={{ margin: 5 }}
                            >
                                <Skeleton avatar title={false} loading={loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <MyIcon style={{ fontSize: 46 }} type="icon-renwu" />
                                        }
                                        title={<a href={"#/home/task/manage/" + item.id}>{item.name}</a>}
                                        description={item.description}
                                    />
                                    <ListItem title={""} context={this.renderStatus(item.state)} />
                                    <ListItem title={"负责人"} context={
                                        this.state.staffList.map(i => {
                                            if (i.id === item.masterID) {
                                                return i.name
                                            }
                                        })
                                    } />
                                    <ListItem title={"开始时间"} context={item.startTime} />
                                    <div style={{ width: 200 }}>
                                        <Progress percent={item.process} status="active" />
                                    </div>


                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
                <TaskForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.data}

                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                    staffList={this.state.staffList}
                />
                <BackTop visibilityHeight={100} style={{ right: 50 }} />
            </div>
        );
    }
}

export default Task