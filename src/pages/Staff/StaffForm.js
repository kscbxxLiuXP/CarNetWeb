
import React from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

//使用组件方式创建form
export const StaffForm = ({ visible, onCreate, initialValues, onCancel }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(initialValues)
    return (
        <Modal
            width={500}
            visible={visible}
            title="编辑员工"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            destroyOnClose
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();

                        onCreate({ ...initialValues, ...values });
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
                    label="员工ID"
                    tooltip="员工ID由系统自动生成"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="真实姓名"
                    rules={[
                        {
                            required: true, message: "请填写员工真实姓名！"
                        },
                    ]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    name="idNumber"
                    label="身份证号码"
                    rules={[
                        {
                            required: true, message: "请填写员工身份证号码！"
                        },
                    ]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="性别"
                    rules={[
                        {
                            required: true, message: "请填写员工身份证号码！"
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择性别"
                        allowClear
                    >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="age"
                    label="年龄"
                    rules={[
                        {
                            required: true, message: "年龄"
                        },
                    ]}
                >
                    <InputNumber allowClear min={18} max={80} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
