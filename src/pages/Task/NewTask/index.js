import React, { createRef } from "react";
import { PageHeader, Card, Form, Input, Button,Modal,DatePicker, message, Select } from 'antd'
import { taskGetNextID, taskNew } from "../../../utils/apis/api_task";
import { EnvironmentOutlined,  } from "@ant-design/icons"
import Map from "../../../components/Map";
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
    },
};
class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = createRef()
        this.state = {
            addressNode: {

            },
            tmpAddressNode: {},
            visible: false,
        }
    }


    componentDidMount() {
        this.getID()
    }
    getID() {
        taskGetNextID().then(e => {
            this.formRef.current.setFieldsValue({
                id: e,
            });
        })


    }

    handleFormSubmit = fieldsValue => {


        const values = {
            ...fieldsValue,
            'startTime': fieldsValue['startTime'].format('YYYY-MM-DD HH:mm:ss'),
            'endTime': fieldsValue['endTime'].format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log(values);
        taskNew(values).then(e => {
            console.log(values)
            message.success("提交成功！")
            this.formRef.current.resetFields()

            this.getID()
            this.setState({
                addressNode: {

                },
                tmpAddressNode: {},
            })
        })

    }


    onChange(value) {
        console.log(`selected ${value}`);
    }



    onSearch(val) {
        console.log('search:', val);
    }
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="发布任务">

                </PageHeader>

                <br />
                <Card>
                    <Form
                        name="task"
                        ref={this.formRef}
                        onFinish={this.handleFormSubmit}
                        {...layout}
                    >
                        <Form.Item
                            name="id"
                            label="任务ID"
                            rules={
                                [
                                    { required: true, message: "请输入任务ID" }
                                ]
                            }
                            tooltip={"ID由系统自动生成"}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="任务名称"
                            rules={
                                [
                                    { required: true, message: "请输入任务名称" }
                                ]
                            }
                        >
                            <Input placeholder="任务名称" allowClear />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="任务描述"
                            rules={
                                [
                                    { required: true, message: "请输入任务描述" }
                                ]
                            }
                        >
                            <TextArea placeholder="任务描述" showCount maxLength={50} allowClear />
                        </Form.Item>
               
                        <Form.Item
                            name="startTime"
                            label="开始时间"
                            rules={
                                [
                                    { required: true, message: "请输入任务开始时间" }
                                ]
                            }
                        >
                            <DatePicker
                                placeholder="选择任务开始时间"
                                showTime format="YYYY-MM-DD HH:mm:ss" allowClear />
                        </Form.Item>
                        <Form.Item
                            name="endTime"
                            label="结束时间"


                            rules={
                                [
                                    { required: true, message: "请输入任务结束时间" }
                                ]
                            }
                        >
                            <DatePicker placeholder="选择任务结束时间" showTime format="YYYY-MM-DD HH:mm:ss" allowClear />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="任务地址"
                            rules={
                                [
                                    { required: true, message: "请选择任务执行地址" }
                                ]
                            }
                        >
                            <Input placeholder="任务执行地址" value={this.state.addressNode.id} readOnly allowClear />
                            <Button style={{ marginTop: 10 }} size="middle" icon={<EnvironmentOutlined />} onClick={() => { this.setState({ visible: true }) }}>选择</Button>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" >提交</Button>
                        </Form.Item>


                    </Form>
                </Card>
                <Modal
                    visible={this.state.visible}
                    onCancel={() => {
                        var a = this.state.addressNode
                        this.setState({
                            visible: false,
                            tmpAddressNode: a
                        })
                    }}
                    onOk={() => {
                        var a = this.state.tmpAddressNode
                        this.setState({
                            visible: false,
                            addressNode: a
                        }, () => {
                            this.formRef.current.setFieldsValue({
                                address: this.state.addressNode.id,
                            });
                        })

                    }}
                    title="地址选择"
                    width={650}
                    okText="确认"
                    cancelText="取消"
                >
                    <Map width={600} height={600} selectedNode={this.state.tmpAddressNode.id} onAddressNodeClick={(addressNode) => {
                        console.log(`clicked${addressNode.id}`);
                        this.setState({
                            tmpAddressNode: addressNode
                        })
                    }} />
                    <div>
                        当前选择节点：
                        {this.state.tmpAddressNode.id}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NewTask;