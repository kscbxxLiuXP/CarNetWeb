import React from 'react'
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { DownloadOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class NewStaffForm extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let nid = this.getNextID()
        this.formRef.current.setFieldsValue({
            id: nid,
        })
    }
    getNextID() {
        return 1001;
    }
    //提交
    onFinish = (values) => {
        this.props.onFormFinish(values);
        let nid = this.getNextID();
        this.formRef.current.resetFields();
        this.formRef.current.setFieldsValue({
            id: nid,
        });
    };

    //重置表单
    onReset = () => {
        let nid = this.getNextID();
        this.formRef.current.resetFields();
        this.formRef.current.setFieldsValue({
            id: nid,
        });
    };
    //填充表单
    onFill = () => {

    };


    render() {
        return (
            <div>
                <Form {...layout} ref={this.formRef} name="newStaffForm" onFinish={this.onFinish}>
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
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" icon={<PlusCircleOutlined />}>添加员工</Button>
                        <Button htmlType="button" onClick={this.onReset} style={{ marginLeft: 20 }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default NewStaffForm;