
import React from 'react';
import { Modal, Form, Input, Select,DatePicker,Button } from 'antd';

const { Option } = Select
const{TextArea}=Input;


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

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}
//使用组件方式创建form
export const TaskForm = ({ visible, onCreate, initialValues, onCancel }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(initialValues)
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
                    name="master"
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
                        onChange={onchange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
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
                            { required: true, message: "请输入任务执行地址" }
                        ]
                    }
                >
                    <Input placeholder="任务执行地址" allowClear />
                </Form.Item>
            </Form>
        </Modal>
    );
};
