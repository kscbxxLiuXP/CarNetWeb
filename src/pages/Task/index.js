import React from "react";
import { Card, PageHeader, Row, Col, Statistic, Divider, List, Skeleton, Button, Input, Dropdown, Menu, Progress, BackTop,message,Modal } from 'antd';
import { PlusOutlined, DownOutlined,ExclamationCircleOutlined  } from '@ant-design/icons'
import { MyIcon } from '../../components/MyIcon/index'
import { TaskForm } from "./TaskForm";
import moment from 'moment';
const {confirm} = Modal

const count = 3;
const key ="message key"
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
            initLoading: true,
            loading: false,
            list: [],
            visible: false,
            data: {},
        }

    }


    componentDidMount() {
        this.getData(res => {
            this.setState({
                initLoading: false,
                list: res,
            });
        });
    }

    getData = callback => {
        var res = [
            {
                id: 1001,
                name: "任务1",
                description: "这是任务1的描述",
                master: "负责人1",
                startTime: "2020-12-31 17:00:05",
                endTime: "2021-01-10 18:30:00",
                process: 85,

            },
            {
                id: 1002,
                name: "任务2",
                description: "这是任务2的描述",
                master: "负责人2",
                startTime: "2020-12-31 17:00:05",
                endTime: "2021-01-10 18:30:00",
                process: 78,

            }
        ]
        callback(res)
    };
    handleSearch = value => {
        console.log(value)
    }

    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);

        //fixme 为什么这里一定要写成[...this.state.dataSource]
        let newData = [...this.state.list];
        let index = newData.findIndex((item) => values.id === item.id);
        let item = newData[index];
        newData.splice(index, 1, { ...item, ...values });
        this.setState({
            list: newData,
        });


        message.loading({ content: '修改中...', key, duration: 2 })
        setTimeout(() => {
            this.setState({ visible: false })
            message.success({ content: '修改成功!', key, duration: 2 })
        }, 500)

    };
    render() {
        const { initLoading, list } = this.state;
        const menu = (item) => {
            return (
                <Menu onClick={
                    ({ key }) => {
                        if (key === '1') {
                            
                            const data={
                                ...item,
                                startTime: moment(item['startTime'], 'YYYY-MM-DD HH:mm:ss'),
                                endTime: moment(item['endTime'], 'YYYY-MM-DD HH:mm:ss')
                            }
                            this.setState({ data: data,  visible:true}, () => { console.log(this.state.data); })
                        } else if (key === '2') {
                            let _this = this
                            confirm({
                                title: '你确定要删除这个任务吗?',
                                icon: <ExclamationCircleOutlined />,
                      
                                okText: '删除',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    const list = [..._this.state.list];
                                    _this.setState({
                                        list: list.filter((i) => i.id !== item.id),
                                    });
                                    message.success("删除成功！")
                                },
                              });
                        }
                    }
                }
                >
                    <Menu.Item key='1'>
                        编辑
                    </Menu.Item>
                    <Menu.Item danger key='2'>删除</Menu.Item>
                </Menu>
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
                        loading={initLoading}
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
                                <Skeleton avatar title={false} loading={initLoading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <MyIcon style={{ fontSize: 46 }} type="icon-renwu" />
                                        }
                                        title={<a href={"#/home/task/manage/" + item.id}>{item.name}</a>}
                                        description={item.description}
                                    />
                                    <ListItem title={"负责人"} context={item.master} />
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
                />
                <BackTop visibilityHeight={100} style={{ right: 50 }} />
            </div>
        );
    }
}

export default Task