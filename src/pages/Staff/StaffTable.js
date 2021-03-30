import React from 'react'
import { Table, Button, message, Modal, Spin } from 'antd';
import { StaffForm } from './StaffForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AuthModal } from './AuthModal';
import { staffDelete, staffDeleteMany, staffUpdate } from '../../utils/apis/api_staff';
import { LoadingOutlined } from '@ant-design/icons';
import { vehicleAll } from '../../utils/apis/api_vehicle';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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
                                title: '你确定要删除这个员工吗?',
                                icon: <ExclamationCircleOutlined />,

                                okText: '删除',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    _this.setState({ loading: true })
                                    staffDelete(record.id).then(e => {
                                        message.success("删除成功！")
                                        _this.props.getData()
                                        _this.setState({ loading: false })
                                    })

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
            authVisible: false,
            selectedData: { ids: ['1'], names: ['1'] },
            selectedRows: [],
            vehicleList: [],
            addresses: [],
        };

    }



    componentDidMount() {


        vehicleAll().then(e => {

            e.forEach(element => {
                element.key = element.id

            });
            this.setState({ vehicleList: e })

        })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {

        this.setState({ selectedRowKeys, selectedRows });
    };
    //表单提交后的回调函数
    onCreate = (values) => {
        console.log('Received values of form: ', values);
        message.loading({ content: '修改中...', key, duration: 2 })
        //update
        staffUpdate(values).then(e => {
            this.setState({ visible: false })
            message.success({ content: '修改成功!', key, duration: 2 })
            this.props.getData()
        })

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
                _this.setState({ loading: true })

                var ids = []

                _this.state.selectedRows.forEach(it => {
                    ids.push(it.id)
                })
                //TODO 批量注销
                staffDeleteMany(ids).then(e => {

                    _this.setState({ selectedRowKeys: [], selectedRows: [], loading: false })
                    _this.props.getData()
                    message.warning("注销成功！")
                })

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
                <Spin indicator={antIcon} spinning={this.props.loading || this.state.loading}>
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
                    <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.props.dataSource} />
                    <StaffForm
                        visible={this.state.visible}
                        onCreate={this.onCreate}
                        initialValues={this.state.data}
                        onCancel={() => {
                            this.setState({ visible: false })
                        }}
                    />
                </Spin>
                <AuthModal
                    visible={this.state.authVisible}
                    onCreate={() => {
                        this.setState({ authVisible: false, selectedRowKeys: [], selectedRows: [], selectedData: { ids: [], names: [] } })
                        message.success("授权成功！")
                    }}
                    data={this.state.selectedData}

                    vehicleList={this.state.vehicleList}
                    onCancel={() => {
                        this.setState({ authVisible: false })
                    }}
                />



            </div>
        )
    }
}
export default StaffTable