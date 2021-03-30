
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import Map from '../../components/Map';
import { EnvironmentOutlined, ExclamationCircleOutlined } from "@ant-design/icons"

const { Option } = Select
const { TextArea } = Input;


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
function onChange(value) {
    console.log(`selected ${value}`);

}


function onSearch(val) {
    console.log('search:', val);
}
//使用组件方式创建form
export const TaskForm = ({ visible, onCreate, initialValues, onCancel, staffList }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(initialValues)

    const [mVisible, setVisible] = useState(false)
    const [addressNode, setAddressNode] = useState({})
    const [tmpAddressNode, setTmpAddressNode] = useState({})
    useEffect(() => {
        var i = { id: initialValues.address }
        setTmpAddressNode(i)
        setAddressNode(i)
    }, [initialValues])
    useEffect(() => {
        //formsetfield
        form.setFieldsValue({
            address: addressNode.id,
        });
    }, [addressNode])
    return (
        <Modal

            visible={visible}
            title="编辑任务"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            destroyOnClose
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        const r = {
                            ...values,
                            'startTime': values['startTime'].format('YYYY-MM-DD HH:mm:ss'),
                            'endTime': values['endTime'].format('YYYY-MM-DD HH:mm:ss'),
                        };
                        onCreate(r);
                        setAddressNode({})
                        setTmpAddressNode({})
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                {...layout}
                name="form_in_modal"
                initialValues={initialValues}
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
                    name="masterID"
                    label="负责人"
                    rules={
                        [
                            { required: true, message: "请输入任务负责人" }
                        ]
                    }
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {staffList.map((item, index) => {
                            return <Option key={index} value={item.id}>{item.name}</Option>
                        })}
                    </Select>
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
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" allowClear />
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
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" allowClear />
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
                    <Input placeholder="任务执行地址" value={addressNode.id} readOnly allowClear />
                    <Button style={{ marginTop: 10 }} size="middle" icon={<EnvironmentOutlined />} onClick={() => { setVisible(true) }}>选择</Button>
                </Form.Item>
            </Form>
            <Modal
                visible={mVisible}
                onCancel={() => {
                    var a = addressNode
                    setVisible(false)
                    setTmpAddressNode(a)

                }}
                onOk={() => {
                    var a = tmpAddressNode
                    setVisible(false)
                    setAddressNode(a)


                }}
                title="地址选择"
                width={650}
                okText="确认"
                cancelText="取消"
            >
                <Map width={600} height={600} selectedNode={tmpAddressNode.id} onAddressNodeClick={(addressNode) => {
                    console.log(`clicked${addressNode.id}`);
                    setTmpAddressNode(addressNode)

                }} />
                <div>
                    当前选择节点：
                        {tmpAddressNode.id}
                </div>
            </Modal>
        </Modal>
    );
};
