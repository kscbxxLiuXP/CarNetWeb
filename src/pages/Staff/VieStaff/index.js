import React from "react";
import { PageHeader, Descriptions, Button, Table, Tabs, Tag, message, Modal, Row, Card, Skeleton, BackTop, Statistic, Progress, Image, Tooltip, Col } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import { StaffForm } from "../StaffForm";
import { AuthModal } from "../AuthModal";
import { vehicleAll } from '../../../utils/apis/api_vehicle';
import { staffDelete, staffGetByID, staffUpdate } from "../../../utils/apis/api_staff";
import { taskGetAll } from "../../../utils/apis/api_task";
import { jobGetAll } from "../../../utils/apis/api_job";
import { permissionDelete, permissionGetByStaffID } from "../../../utils/apis/api_permission";
import { addressGetAll } from "../../../utils/apis/api_address";
import AvatarUpload from "../../../components/AvatarUpload"
import { api_staff_avatar } from "../../../utils/apis/api";
const key = "message key"
const { confirm } = Modal;
const empty = 'assets/img/empty.png'
class ViewStaff extends React.Component {
    constructor(props) {
        super(props);
        this.authColums = [
            {
                title: "授权号",
                dataIndex: "id"
            },
            {
                title: "授权车辆ID",
                dataIndex: "vehicleID",
                render: i => <a href={"#/home/car/manage/" + i}>{i}</a>
            },
            {
                title: "授权车辆名称",
                dataIndex: "vehicleName",
                render: (i, r) => this.getVehicle(r.vehicleID).name

            },
            {
                title: "授权车辆地址",
                dataIndex: "vehicleAddress",
                render: (i, r) => this.getAddress(this.getVehicle(r.vehicleID).addressID).address

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
                render: (text, record) => <Tooltip title={this.getTask(record.id).description}>{this.getTask(record.id).name}</Tooltip>
            },
            {
                title: "作业状态",
                dataIndex: "step",
                render: (text, record) => <>{this.renderState(text)}</>
            },
        ]
        this.state = {
            id: this.props.match.params.id,
            data: {},
            visible: false,
            permissionList: [],
            taskLogDataSource: [],
            newAuthData: { ids: [], names: [] },//提交给新增权限表单的数据
            authVisible: false,//新增权限Modal的可视
            vehicleList: [],
            taskList: [],
            jobList: [],
            addressList: [],
            avatarVisible: false,
            avatarUrl: empty
        }
    }
    renderState(state) {

        //状态
        // 1、任务创建
        // 2、任务接单
        // 3、任务开始执行
        // 4、任务执行结束
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
    getVehicle(vehicleID) {
        var vehicle = {}
        this.state.vehicleList.forEach(i => {
            if (i.id === vehicleID) {
                vehicle = i
            }
        })
        return vehicle
    }

    getAddress(addressID) {
        var address = {}
        this.state.addressList.forEach(i => {
            if (i.id === addressID) {
                address = i
            }
        })
        return address
    }
    componentDidMount() {

        this.getData(this.props.match.params.id)
        vehicleAll().then(e => {

            e.forEach(element => {
                element.key = element.id

            });
            this.setState({ vehicleList: e })
        })
        taskGetAll().then(e => {
            this.setState({ taskList: e })
        })

        addressGetAll().then(e => {
            this.setState({ addressList: e })
        })

    }
    getData(id) {
        //获取员工信息
        staffGetByID(id).then(e => {
            this.setState({ data: e }, () => { this.refreshAvatar() })
        })

        //获取授权信息
        permissionGetByStaffID(id).then(e => {
            e.forEach(i => i.key = i.id)
            this.setState({ permissionList: e })
        })
        //获取作业信息
        jobGetAll().then(e => {
            e = e.filter(i => {
                return i.staffID === parseInt(id)
            })
            e.forEach(i => i.key = i.id)
            this.setState({ jobList: e })
        })

    }
    getTask(taskid) {
        var task = {}
        this.state.taskList.forEach(i => {
            if (i.id === taskid) {
                task = i
            }
        })
        return task
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
                    var id = record.id
                    message.loading({ content: "处理中", key: key, duration: 1 })
                    permissionDelete(id).then(e => {
                        message.success({ content: "解除成功", key: key, duration: 1 })
                        _this.getData(_this.props.match.params.id)
                    })

                }
            }
        )

    }

    handleDeleteStaff = () => {
        var _this = this
        confirm({
            title: '你确定要删除这个员工吗?',
            icon: <ExclamationCircleOutlined />,

            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {

                staffDelete(_this.props.match.params.id).then(e => {
                    message.success("删除成功！")
                    _this.props.history.push('/home/staff/manage')
                })
            },
        });
    }

    handleEditStaff = () => {
        this.setState({ visible: true })
    }
    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);

        //update
        staffUpdate(values).then(e => {
            this.setState({ visible: false })
            message.success({ content: '修改成功!', key, duration: 2 })
            this.getData(this.props.match.params.id)
        })

    };

    handleNewAuth = () => {
        const { data } = this.state
        const d = { ids: [data.id], names: [data.name] }
        this.setState({ newAuthData: d, authVisible: true })

    }
    renderStaffState(state) {
        if (state === 1) {
            return <Tag color="blue">作业中</Tag>

        } else if (state === 2) {
            return <Tag color="green">空闲</Tag>
        }
    }
    refreshAvatar() {
        var random = Date.now()
        if (this.state.data.photoed === 1) {
            var u = api_staff_avatar + "?id=" + this.state.data.id + "&random=" + random
            console.log(u);
            this.setState({ avatarUrl: u })
        }



    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={"员工ID：" + this.state.id}
                    tags={this.renderStaffState(data.workState)}
                    extra={[
                        <Button key="2" danger onClick={this.handleDeleteStaff}>删除员工</Button>,
                        <Button key="1" type="primary" onClick={this.handleEditStaff}>
                            完善/修改信息
                        </Button>,
                    ]}


                >
                    <Row>
                        <Col span={20}>
                            <Descriptions style={{ marginTop: 20 }} column={2}>
                                <Descriptions.Item label="姓名"> {data.name}</Descriptions.Item>
                                <Descriptions.Item label="员工号"> {data.id}</Descriptions.Item>
                                <Descriptions.Item label="身份证号"> {data.idNumber}</Descriptions.Item>
                                <Descriptions.Item label="性别"> {data.gender}</Descriptions.Item>
                                <Descriptions.Item label="年龄"> {data.age}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={4}>
                            <div>

                                <Image
                                    width={200}
                                    height={200}
                                    src={this.state.avatarUrl}
                                />
                                <br />
                                <Button size="small" type="primary" style={{ marginTop: 10 }} onClick={() => { this.setState({ avatarVisible: true }) }}>更改</Button>
                                <div style={{ color: "red" }}>
                                    *员工图片将用作人脸识别登录
                                </div>
                            </div>
                        </Col>
                    </Row>


                </PageHeader>
                <br />

                <Card title="授权管理" extra={<Button type="primary" onClick={this.handleNewAuth}>新增授权</Button>}>
                    <Table columns={this.authColums} dataSource={this.state.permissionList} />
                </Card>
                <br />

                <Card title="作业记录">
                    <Table columns={this.taskLogColumns} dataSource={this.state.jobList} />
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
                    onCreate={() => {

                        this.setState({ authVisible: false, newAuthData: { ids: [], names: [] } })
                        this.getData(this.props.match.params.id)

                    }}
                    data={this.state.newAuthData}

                    vehicleList={this.state.vehicleList}
                    onCancel={() => {
                        this.setState({ authVisible: false })
                    }}
                />
                <Modal
                    visible={this.state.avatarVisible}
                    onCancel={() => {
                        this.setState({ avatarVisible: false })
                        this.refreshAvatar()
                    }}
                    onOk={() => {
                        this.setState({ avatarVisible: false })
                        this.refreshAvatar()
                    }}
                    title="更改头像"
                    okText="完成"

                    cancelText="取消"
                    width={300}
                >
                    <AvatarUpload id={this.props.match.params.id} />
                </Modal>

            </div>
        )
    }
}

export default ViewStaff;