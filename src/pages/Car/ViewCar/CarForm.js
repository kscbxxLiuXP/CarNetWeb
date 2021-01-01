
import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select
//表单布局
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};


const addresses = [
    {
        id: 1,
        key: '1',
        address: "辽宁省沈阳市浑南区东北大学",
        label: "辽宁沈阳浑南",
    },
    {
        id: 2,
        key: '2',
        address: "辽宁省沈阳市南湖东北大学",
        label: "辽宁沈阳南湖",
    },
    {
        id: 3,
        key: '3',
        address: "河北省秦皇帝市经济开发区东北大学秦皇岛分校",
        label: "河北秦皇岛"
    }
];

//使用组件方式创建form
export const CarForm = ({ visible, onCreate, initialValues, onCancel }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(initialValues)
    return (
        <Modal

            visible={visible}
            title="编辑车辆"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            destroyOnClose
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item
                    // name="vehicleName"
                    name="name"
                    label="车辆名称："
                    rules={[
                        {
                            required: true,
                            message: "请输入车辆名称！",
                        }, 
                    ]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    // name="vehicleIdentification"
                    name="id"
                    label="车辆标识："
                    rules={[
                        {
                            required: true,
                            message: "请输入车辆标识！",
                        }
                       
                    ]}
                >
                    <Input disabled allowClear />
                </Form.Item>
                <Form.Item
                    // name="licensePlateNumber"
                    name="sign"
                    label="车牌号码："
                    rules={[
                        {
                            required: true,
                            message: "请输入车牌号码！",
                        },
                    ]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    // name="vehicleAddress"
                    name="address"
                    label="车辆地址："
                    rules={[
                        {
                            required: true,
                            message: "请选择车辆地址！",
                        },
                    ]}
                >

                    <Select
                        placeholder="车辆地址"
                        allowClear
                    >
                        {addresses.map((adr, index) => {
                            return <Option key={index} value={index}>{adr.label}</Option>
                        })}
                    </Select>

                </Form.Item>
            </Form>
        </Modal>
    );
};
