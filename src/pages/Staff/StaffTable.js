import React from 'react'
import { Table, Button, message, Modal } from 'antd';
import { StaffForm } from './StaffForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AuthModal } from './AuthModal';
const { confirm } = Modal
const key = "message key"
class StaffTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                render: (text, record) => <a href={"#/home/staff/manage/" + record.id}>{text}</a>
            },
            {
                title: '工号',
                dataIndex: 'id',
            },
            {
                title: '身份证号',
                dataIndex: 'idNumber',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '年龄',
                dataIndex: 'gender',
            },
            {
                title: "操作",
                dataIndex: "操作",
                render: (text, record) => (
                    <>
                        <Button onClick={() => {
                            this.setState({ data: record, visible: true })
                        }}>编辑</Button>
                        <Button onClick={() => {
                            let _this = this
                            confirm({
                                title: '你确定要删除这个任务吗?',
                                icon: <ExclamationCircleOutlined />,

                                okText: '删除',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    const data = [..._this.state.dataSource];
                                    _this.setState({
                                        dataSource: data.filter((i) => i.id !== record.id),
                                    });
                                    message.success("删除成功！")
                                },
                            });
                        }}>删除</Button>
                    </>
                )
            }
        ];
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            visible: false,
            data: {},
            dataSource: [],
            authVisible: false,
            selectedData: { ids: ['1'], names: ['1'] },
            selectedRows: []
        };

    }


    componentDidMount() {
        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                id: i,
                idNumber: "321283200000000000",
                age: 32,
                gender: "男"
            });
        }
        this.setState({ dataSource: data })
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys, selectedRows });
    };
    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);

        //fixme 为什么这里一定要写成[...this.state.dataSource]
        let newData = [...this.state.dataSource];
        let index = newData.findIndex((item) => values.id === item.id);
        let item = newData[index];
        newData.splice(index, 1, { ...item, ...values });
        this.setState({
            dataSource: newData,
        });

        message.loading({ content: '修改中...', key, duration: 2 })
        setTimeout(() => {
            this.setState({ visible: false })
            message.success({ content: '修改成功!', key, duration: 2 })
        }, 500)

    };

    //处理批量授权
    handleAuth = () => {
        const { selectedRows } = this.state;
        const data = { ids: [], names: [] }
        selectedRows.forEach(i => {
            data.ids.push(i.id);
            data.names.push(i.name);
        })
        this.setState({ selectedData: data, authVisible: true })
    }

    //处理批量注销
    handleDelete = () => {
        var _this = this
        confirm({
            title: '你确定要注销这些用户吗?',
            icon: <ExclamationCircleOutlined />,

            okText: '注销',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                message.warning("注销成功！")

                var data = [..._this.state.dataSource];

                _this.state.selectedRows.forEach(it => {

                    data = data.filter((i) => i.id !== it.id)
                })

                _this.setState({ selectedRowKeys: [], selectedRows: [], dataSource: data })
            },

        });

    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.handleAuth} disabled={!hasSelected} >
                        批量授权
                    </Button>
                    <Button style={{ marginLeft: 10 }} type="danger" onClick={this.handleDelete} disabled={!hasSelected} loading={loading}>
                        批量注销
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} />
                <StaffForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    initialValues={this.state.data}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                />
                <AuthModal
                    visible={this.state.authVisible}
                    onCreate={() => {
                        this.setState({ authVisible: false, selectedRowKeys: [], selectedRows: [], selectedData: { ids: [], names: [] } })
                        message.success("授权成功！")
                    }}
                    data={this.state.selectedData}
                    onCancel={() => {
                        this.setState({ authVisible: false })
                    }}
                />



            </div>
        )
    }
}
export default StaffTable