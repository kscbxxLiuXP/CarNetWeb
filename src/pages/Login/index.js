import React from "react";

import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.css";
import md5 from 'js-md5';
import "../../utils/auth"
import { setToken, isLogin } from "../../utils/auth";
import moment from 'moment'
class Login extends React.Component {

    componentDidMount() {
        let type = this.props.location.search.substring(6)
        if (type === '1') {
            message.error("会话超时，请重新登录！", 2);
            this.props.history.replace('/login');
        } else if (type === '0') {
            message.error('请先登录！', 2);
            this.props.history.replace('/login');
        }
        if (isLogin()) {
            this.props.history.push('/home');
        }

    }


    //表单验证通过，开始登录
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
        let token = username + '%' + 'asasdadads%' + moment().add(30, 'minutes').format("**YYYY-MM-DD-HH-mm-ss"); //当前时间加30分钟是token失效的时间
        //模拟得到服务器验证结果
        if (correct) {
            setToken(token);
            this.props.history.push('/home/dashboard')
            message.success('登录成功！', 1);
        } else {
            message.error("密码错误！", 2);
        }
    };

    render() {
        return (
            <div className='LoginWrapper' style={{ minHeight: `${window.innerHeight - 1}px` }}>
                <Card title="登录" className="login-form">
                    <Form
                        name="normal_login"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button style={{textAlign:"center"}} type="primary" htmlType="submit" className="login-form-button">
                                登录
                             </Button>
                        </Form.Item>
                    </Form>
                    {/* <Form
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

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                登录
                        </Button>
                        </Form.Item>
                    </Form> */}
                </Card>
                <div className='loginFooter'>
                    工业车联网 ©2020 Created by NEU
                </div>
            </div>
        );
    }
}
export default Login