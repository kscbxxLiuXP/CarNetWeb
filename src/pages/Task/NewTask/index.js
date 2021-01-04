import React, { createRef } from "react";
import { PageHeader, Card, Form, Input, Button, DatePicker, message,Select } from 'antd'
const { Option } = Select;
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
    }


    componentDidMount() {
        this.getID()
    }
    getID() {
        this.formRef.current.setFieldsValue({
            id: '20210101',
        });

    }

    handleFormSubmit = fieldsValue => {
        this.formRef.current.resetFields()
        this.getID()
        const values = {
            ...fieldsValue,
            'startTime': fieldsValue['startTime'].format('YYYY-MM-DD HH:mm:ss'),
            'endTime': fieldsValue['endTime'].format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log(values)
        message.success("提交成功！")
    }


    onChange(value) {
        console.log(`selected ${value}`);
    }

    onBlur() {
        console.log('blur');
    }

    onFocus() {
        console.log('focus');
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
                                onChange={this.onchange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onSearch={this.onSearch}
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
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" >提交</Button>
                        </Form.Item>


                    </Form>
                </Card>
            </div>
        )
    }
}

export default NewTask;