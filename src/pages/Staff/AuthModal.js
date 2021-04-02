import React, { useState, useEffect } from 'react';
import { Modal, Select, Tag, Table, Button, message } from 'antd';
import { addressGetAll } from '../../utils/apis/api_address';
import { permissionGiveInGroup } from '../../utils/apis/api_permission';

const key = '1'
export const AuthModal = ({ visible, onCreate, data, onCancel, vehicleList }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows)
    };
    useEffect(() => {
        addressGetAll().then(e => {
            setAddresses(e)
        })

    }, []);
    useEffect(() => {
        setSelectedRowKeys([])
        setSelectedRows([])

    }, [visible])
    const columns = [
        {
            title: '车辆名称',
            dataIndex: 'name',
        },
        {
            title: '车辆ID',
            dataIndex: 'id',
        },
        {
            title: '车辆所属地址',
            dataIndex: 'address',
            render: (e, record) => addresses.map(i => {
                if (i.id === record.addressID) {
                    return i.address
                }
            })
        },
    ];


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <Modal
            width={700}
            visible={visible}
            title="员工授权"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            destroyOnClose
            onOk={() => {
                message.loading({ content: "正在授权中...", key: key, duration: 1 })
                var l = []
                data.ids.forEach(i => {
                    selectedRows.forEach(e => {
                        var t = {
                            staffID: i,
                            vehicleID: e.id
                        }
                        l.push(t)
                    })
                })
                permissionGiveInGroup(l).then(e => {
                    message.success({ content: "授权成功！", key: key, duration: 1 })
                    onCreate()
                })



            }}
        >
            将要给以下人员授权：
            <br />
            {data.names.map((item, index) => {
                return <Tag key={index} style={{ marginTop: 5 }}>{item}</Tag>
            })}

            <br />
            <div style={{ marginTop: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''}
                </span>
            </div>
            <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={vehicleList} />

        </Modal >
    )


}