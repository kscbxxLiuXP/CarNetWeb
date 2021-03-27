import React from "react";
import { PageHeader, Descriptions, Button, Table, Tabs, Tag, message, Modal, Row, Card, Skeleton, BackTop, Statistic } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { CarForm } from '../ViewCar/CarForm'
import DataInspect from "./DataInspect";
import CurrentJob from "./CurrentJob";
import PreviousJob from "./PreviousJob";
import CarPermission from "./CarPermission";
import OperationLog from "./OperationLog";

import Map from "../../../components/Map";
const { confirm } = Modal;
const { TabPane } = Tabs;
//用于表示message的key
const key = "哈哈哈"
class ViewCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: {},
            visible: false,
            tabKey: '1',
        }
    }

    componentDidMount() {

        let data = this.getData(this.props.match.params.id)
        this.setState({ data })



    }
    getData(id) {

        return {
            id: '123001',
            name: '车辆1',
            sign: '苏A 54KLS',
            address: "辽宁沈阳浑南",
            state: 1,

        }

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
                message.success("注销成功！")
            },

        });
    }
    handleEditCar = () => {
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
    tabChangeCallback = (key) => {
        this.setState({ tabKey: key })
    }
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={"车辆ID：" + this.state.id}
                    tags={<Tag color="blue">作业中</Tag>}
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
                            <Skeleton loading={!this.state.data.name}>
                                <Descriptions size="small" column={2}>
                                    <Descriptions.Item label="车辆名称" span={2}>{this.state.data.name}</Descriptions.Item>

                                    <Descriptions.Item label="注册日期">2017-01-10</Descriptions.Item>
                                    <Descriptions.Item label="车牌号码">{this.state.data.sign}</Descriptions.Item>

                                    <Descriptions.Item label="首次接入网络日期">2017-10-10</Descriptions.Item>
                                    <Descriptions.Item label="地址标签">{this.state.data.address}</Descriptions.Item>
                                    <Descriptions.Item label="详细地址">
                                        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
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
                                    value="运行中"
                                    style={{
                                        marginRight: 32, marginTop: 20
                                    }}
                                />
                                <Statistic title="执行作业" suffix="次" style={{
                                    marginRight: 32,
                                    marginTop: 20
                                }} value={568} />
                                <img src="assets/img/vehicle.jpg" width="200" alt="car-icon" />
                            </div>
                        </div>
                    </Row>

                </PageHeader>
                <br />

                {this.state.tabKey === '1' ? <>
                    <Map />
                    <br />
                    <Card title="车辆数据监控" >
                        <DataInspect></DataInspect>
                    </Card>
                    <br />
                    <Card title="当前作业信息">
                        <CurrentJob></CurrentJob>
                    </Card>
                    <br />
                    <Card title="历史作业信息">
                        <PreviousJob></PreviousJob>
                    </Card>
                    <br />
                </> :
                    <>
                        <Card title="车辆权限管理">
                            <CarPermission></CarPermission>
                        </Card>
                        <br />
                        <Card title="车辆操作日志">
                            <OperationLog></OperationLog>
                        </Card>
                    </>}


                <CarForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.data}
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