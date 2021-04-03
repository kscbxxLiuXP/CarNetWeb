import React from 'react';
import { Button, Table, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { permissionDelete, permissionGetByVehicle, permissionGiveInGroup } from '../../../../utils/apis/api_permission';
const { confirm } = Modal
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
    },

    {
        title: '工号',
        dataIndex: 'id',
    }, {
        title: '年龄',
        dataIndex: 'age',
    },
];
const key = "1"
class CarPermission extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "员工工号",
                dataIndex: "id",
                render: (t, r) => r.staffID
            },
            {
                title: "员工姓名",
                dataIndex: "name",
                render: (t, r) => <div>{
                    this.props.staffList.map(i => {
                        if (i.id === r.staffID) {

                            return i.name
                        }
                    })
                }</div>

            },
            {
                title: "操作",
                dataIndex: "操作",
                render: (text, record) => <Button onClick={() => { this.handlePermissionDelete(record) }}>删除</Button>
            }
        ],
            this.state = {
                visible: false,
                selectedRows: [],
                selectedRowKeys: [],
                permissionList: []
            }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        var id = this.props.id
        permissionGetByVehicle(id).then(e => {
            this.setState({ permissionList: e })
        })
    }
    handlePermissionDelete = (record) => {
        let _this = this;
        confirm({
            title: '你确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '删除不可逆',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                var _this = this
                message.loading({ content: "正在删除中...", key: key, duration: 1 })
                permissionDelete(record.id).then(e => {
                    message.success({ content: "授删除成功！", key: key, duration: 1 })
                    _this.getData()
                })

            },
        });
    }
    handlePermissionAdd = () => {
        message.loading({ content: "正在授权中...", key: key, duration: 1 })

        const { selectedRows } = this.state;
        var l = []

        selectedRows.forEach(e => {
            var t = {
                staffID: e.id,
                vehicleID: this.props.id
            }
            l.push(t)
        })
        permissionGiveInGroup(l).then(e => {
            message.success({ content: "授权成功！", key: key, duration: 1 })
            this.setState({ visible: false })
            this.getData()

        })
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRows })
        },
        getCheckboxProps: (record) => ({
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Button style={{ marginBottom: 10 }} onClick={() => this.setState({ visible: true })}>添加员工权限</Button>

                <Table columns={this.columns} dataSource={this.state.permissionList} />
                <Modal
                    visible={this.state.visible}
                    okText="确认"
                    title="添加员工权限"
                    cancelText="取消"
                    onOk={this.handlePermissionAdd}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `已选 ${selectedRowKeys.length} 人` : ''}
                    </span>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.props.staffList}
                    />
                </Modal>
            </div>
        )
    }
}
export default CarPermission