import React from 'react';
import { Switch, Space, Divider, Table, Button, Modal, Tag, Popconfirm, Form, Input, message } from 'antd';
import SettingItem from '../../../components/SettingItem';
import { EnvironmentOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { settingGetRegisterOpen, settingUpdateRegisterOpen } from '../../../utils/apis/api_setting';
import { addressDelete, addressGetAll, addressNew, addressUpdate } from '../../../utils/apis/api_address';

//表单布局
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
//用于表示message的key
const key = "哈哈哈"

//使用组件方式创建form
const CollectionCreateForm = ({ visible, onCreate, initialValues, onCancel }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(initialValues)
    return (
        <Modal

            visible={visible}
            title="编辑地址"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            destroyOnClose
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        let rV = values;
                        rV.key = `${initialValues.key}`;
                        form.resetFields();
                        onCreate(rV);
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
                    validateTrigger={["onBlur", "onChange"]}
                    name="id"
                    label="id:"
                    rules={[{
                        required: true, message: "请填写ID！"
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    validateTrigger={["onBlur", "onChange"]}
                    name="label"
                    label="标签:"
                    rules={[{
                        required: true, message: "请填写标签！"
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    validateTrigger={["onBlur", "onChange"]}
                    name="address"
                    label="详细地址:"
                    rules={[{
                        required: true, message: "请填写详细地址！"
                    }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};


class CarSetting extends React.Component {
    //连接表单
    formRef = React.createRef();
    //列表点击删除
    handleDelete = id => {
        message.loading({ content: '删除中...', key, duration: 2 })
        addressDelete(id).then(e => {
            message.success({ content: '删除成功！', key, duration: 2 })
            this.getData()
        })
    }
    //
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '标签',
                dataIndex: 'label',
                render: text => <Tag>{text}</Tag>
            },
            {
                title: '详细地址',
                dataIndex: 'address',
            },
            {
                title: "操作",
                dataIndex: "操作",
                render: (text, record) => (
                    <Space>
                        <Popconfirm title="确定要删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.id)}>
                            <Button size="small" type="danger" icon={<DeleteOutlined />} >删除</Button>
                        </Popconfirm>
                        <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => {
                            this.setState({ visible: true, currentAddress: record, type: 'edit' })

                        }}>编辑</Button>
                    </Space>

                )
            }

        ];
        this.state = {
            dataSource: [],
            visible: false,
            currentAddress: {},
            addressSubmitLoading: false,
            type: 'add',
            count: 0,
        };


    }
    getData() {
        addressGetAll().then(e => {
            this.setState({ dataSource: e, count: e.length })
        })
    }
    componentDidMount() {
        settingGetRegisterOpen().then(e => {
            this.setState({
                checked: e === 1
            })
        })
        this.getData()
    }
    //注册开放设置
    onRegisterOpenChange = (checked) => {
        var v = checked ? 1 : 0
        settingUpdateRegisterOpen(v).then(e => {
            message.success("设置修改成功！")
            this.setState({ checked })
        })
    }

    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);
        switch (this.state.type) {
            case 'edit':
                message.loading({ content: '修改中...', key, duration: 2 })
                addressUpdate(values).then(e => {
                    message.success({ content: '修改成功!', key, duration: 2 })
                    this.getData()
                    this.setState({ visible: false })
                })

                break;

            case 'add':
                console.log(values);
                message.loading({ content: '添加中...', key, duration: 2 })
                addressNew(values).then(e => {
                    message.success({ content: '添加成功!', key, duration: 2 })
                    this.getData()
                    this.setState({ visible: false })
                })
                break;
        }

    };

    render() {

        return (
            <div >
                <Divider orientation="left" style={{ fontWeight: 'bold' }}>注册设置</Divider>
                <SettingItem title="开放注册">
                    <Switch checked={this.state.checked} onChange={this.onRegisterOpenChange} />
                </SettingItem>
                <Divider orientation="left" style={{ fontWeight: 'bold' }} ><EnvironmentOutlined />地址管理</Divider>
                <SettingItem >
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => this.setState({
                        type: 'add',
                        currentAddress: {
                            id: '',
                            address: '',
                            key: `${this.state.count + 1}`,
                            label: '',
                        },
                        visible: true,
                    })}>
                        添加地址
                        </Button>
                    <Table bordered dataSource={this.state.dataSource} columns={this.columns}></Table>
                </SettingItem>

                <CollectionCreateForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.currentAddress}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                />
            </div>
        )
    }
}
export default CarSetting;