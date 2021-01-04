import React from 'react';
import { Button, Table, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },

    {
        title: 'id',
        dataIndex: 'id',
    }, {
        title: 'Age',
        dataIndex: 'age',
    },
];
const data = [
    {
        key: 1005,
        name: 'John Brown',
        id: 1005,
        age: 32,

    },
    {
        key: 1006,
        name: 'Jim Green',
        id: 1006,
        age: 42,

    },
    {
        key: 1003,
        name: 'Joe Black',
        id: 1003,
        age: 32,

    },
    {
        key: 1004,
        name: 'Disabled User',
        id: 1004,
        age: 99,
    },
];
class CarPermission extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "员工工号",
                dataIndex: "id",
            },
            {
                title: "员工姓名",
                dataIndex: "name",

            },
            {
                title: "操作",
                dataIndex: "操作",
                render: (text, record) => <Button onClick={() => { this.handlePermissionDelete(record) }}>删除</Button>
            }
        ],
            this.state = {
                dataSource: [
                    {
                        key: 1001,
                        id: 1001,
                        name: "张三"
                    },
                    {
                        key: 1002,
                        id: 1002,
                        name: "张三1"
                    }
                ],
                visible: false,
                selectedRows: [],
                selectedRowKeys: [],
            }
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
                console.log('OK');
                const dataSource = [..._this.state.dataSource];
                _this.setState({
                    dataSource: dataSource.filter((item) => item.key !== record.key),
                });
                message.success("删除成功！")

            },
        });
    }
    handlePermissionAdd = () => {
        this.setState({ visible: false })
        const { dataSource, selectedRows } = this.state;

        this.setState({
            dataSource: [...dataSource, ...selectedRows],
            selectedRows: [],
            selectedRowKeys: [],
        }, () => { console.log(this.state.dataSource) });
        message.success("添加成功！", 1.5);
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

                <Table columns={this.columns} dataSource={this.state.dataSource} />
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
                        dataSource={data}
                    />
                </Modal>
            </div>
        )
    }
}
export default CarPermission