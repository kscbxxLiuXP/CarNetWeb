import React, { Component } from 'react'
import { Button, Card, ConfigProvider, Form, Input, Select, } from 'antd';
const { Option } = Select;
import { CheckOutlined, RestOutlined, SmileOutlined } from '@ant-design/icons';

//定制下拉列表空状态
const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
        <SmileOutlined style={{ fontSize: 20 }} />
        <p>还未添加地址库</p>
    </div>
);

export default class NewCarFormCard extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
    }
    //新建车辆提交
    onFinish = (values) => {
      this.props.onFinish(values)
      this.onReset();
    };

    //重置表单
    onReset = () => {
        this.formRef.current.resetFields();
    };

    checkVehicleName = (rule, value) => {

        let t = true;
        let name = '';
        this.props.dataSource.forEach(v => {
            if (v.vehicleName === value) {
                t = false;
                name = v.vehicleName;
            }

        })
        if (t) {
            return Promise.resolve();
        } else {
            return Promise.reject(`车辆名称不能与待注册中的一致- 车辆名称${name}-!`);
        }

    }

    checkIdentification = (rule, value) => {

        let t = true;
        let name = '';
        this.props.dataSource.forEach(v => {
            if (v.vehicleIdentification === value) {
                t = false;
                name = v.vehicleName;
            }

        })

        if (t) {
            return Promise.resolve();
        } else {
            return Promise.reject(`车辆标识码不能与待注册中的一致 车辆名称[${name}]!`);
        }
    };
    render() {
        return (
            <Card title="新建车辆" size="small" >
                <ConfigProvider renderEmpty={customizeRenderEmpty}>
                    <Form layout="vertical" size="small" ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item
                            name="vehicleName"
                            label="车辆名称："
                            rules={[
                                {
                                    required: true,
                                    message: "请输入车辆名称！",
                                }, {
                                    validator: this.checkVehicleName,
                                }
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item
                            name="vehicleIdentification"
                            label="车辆标识："
                            rules={[
                                {
                                    required: true,
                                    message: "请输入车辆标识！",
                                },
                                {
                                    validator: this.checkIdentification,
                                }
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item
                            name="licensePlateNumber"
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
                            name="vehicleAddress"
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
                                {this.props.addresses.map((adr, index) => {
                                    return <Option key={index} value={index}>{adr.label}</Option>
                                })}
                            </Select>

                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" icon={<CheckOutlined />} style={{ marginRight: 20 }} htmlType="submit">
                                提交
                                        </Button>
                            <Button htmlType="button" icon={<RestOutlined />} onClick={this.onReset}>
                                重置
                                        </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider >
            </Card>


        )
    }
}
