import React from "react";

import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import "./login.css";
import md5 from 'js-md5';
import "../../utils/auth"
import { setToken } from "../../utils/auth";
import moment from 'moment'
class Login extends React.Component {

    state = {
        passwordClicked: false,
    }

    handlePasswordInputClick = () => {
        if (!this.state.passwordClicked) {
            this.setState({
                passwordClicked: true,
            })
        }
    }


    //表单验证通过
    onFinish = values => {
        //登录接口
        //与服务器进行通信验证账号密码

        //以post方式 传输账号密码
        let username = values.username;
        // //对密码进行md5加密
        // let password = md5(values.password);
        let password = values.password;

        //服务器验证密码正确性
        let correct = password === 'admin' && username === 'admin';
        //返回token值
        let token = username + moment().format("YYYYMMDDHHmmss"); //当前时间
        //模拟得到服务器验证结果
        if (correct) {
            setToken(token);
            this.props.history.push('/home')
        } else {
            message.error("密码错误！",2);
        }


    };

    render() {
        return (
            <Card title="登录" className="login-form">
                <Form
                    name="basic"
                    autoComplete='off'
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input placeholder="用户名" autoComplete="off" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        autoComplete='off'
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password placeholder="密码" />

                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}
export default Login