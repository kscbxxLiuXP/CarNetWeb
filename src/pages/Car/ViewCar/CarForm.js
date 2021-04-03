
import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select
//表单布局
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};




//使用组件方式创建form
export const CarForm = ({ visible, onCreate, initialValues, onCancel, addressList }) => {
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
                        var v = values
                        v.identification = initialValues.identification
                        v.registerTime = initialValues.registerTime
                        v.activationTime = initialValues.activationTime
                        v.state = initialValues.state
                        v.taskExecuteNum = initialValues.taskExecuteNum
                        v.workState = initialValues.workState
                        onCreate(v)
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
                    name="addressID"
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
                        {addressList.map((adr, index) => {
                            return <Option key={index} value={index}>{adr.label}</Option>
                        })}
                    </Select>

                </Form.Item>
            </Form>
        </Modal>
    );
};
