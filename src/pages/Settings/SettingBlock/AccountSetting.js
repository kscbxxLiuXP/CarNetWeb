
import React from 'react';
import { Button, Form, Input, message,Divider, } from "antd";
import md5 from 'js-md5'
import { getUsername } from '../../../utils/auth';
const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 28,
            offset: 8,
        },
        sm: {
            span: 28,
            offset: 8,
        },
    },
};

class AccountSetting extends React.Component {
    formRef = React.createRef();
    state = {
        firstpassword: null,
        secondpassword: null,
    }
    changePassword(data) {
        axios({
            url: ApiUtil.API_CHECK_PASSWORD + data.username + '/' + data.oldpassword,
            method: 'get'
        }).then(res => {
            if (res.data.code === 1) {
                axios({
                    url: ApiUtil.URL_IP + '/api/changePassword',
                    method: 'post',
                    data: data
                }).then(res => {
                    if (res.data.code === 0) {
                        message.success('修改成功！')
                    } else {
                        message.error('修改失败，请重新尝试！')
                    }
                })
            } else {
                message.error('原密码错误！')
            }
        })

    }

    handleSubmit = values => {

        console.log(values)
        let data = values
        data.username = getUsername()
        data.password = md5(values.newpassword)
        data.oldpassword = md5(values.oldpassword)
        // this.changePassword(data)


    };
    compareToFirstPassword = (rule, value) => {
        if (value) {
            if (value !== this.state.firstpassword) {
                return Promise.reject("两次输入的密码不一致");
            }
            return Promise.resolve();
        }
        return Promise.reject();

    }
    compareToSecond = (rule, value) => {
        if (value) {
            if (value !== this.state.secondpassword) {
                return Promise.reject("两次输入的密码不一致！");
            }
            return Promise.resolve();
        }
        return Promise.reject();

    }
    render() {
        return (
            <div>
                       <Divider orientation="left" style={{ fontWeight: 'bold' }}>修改密码</Divider>
                <Form {...formItemLayout} className='changepassword' ref={this.formRef} onFinish={this.handleSubmit}>
                    <Form.Item label="原密码" hasFeedback
                        name="oldpassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入您原来的密码!',
                            },
                        ]} >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="新密码"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                            {
                                required: true,
                                message: "请输入新的密码！"
                            },
                            {
                                validator: this.compareToSecond,
                            },

                        ]}
                        name="newpassword"
                        hasFeedback>
                        <Input.Password onChange={(e) => { this.setState({ firstpassword: e.target.value }); this.formRef.current.validateFields(); }} />
                    </Form.Item>
                    <Form.Item label="确认密码"
                        rules={[
                            {
                                required: true,
                                message: "请再输入一次密码！"
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ]}
                        validateTrigger={["onBlur", "onChange"]}
                        name="confirm"
                        hasFeedback
                    >
                        <Input.Password onChange={(e) => {
                            this.setState({ secondpassword: e.target.value });
                            this.formRef.current.validateFields();
                        }} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" >
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default AccountSetting;