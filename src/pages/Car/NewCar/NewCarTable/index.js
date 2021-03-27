import { Button, Card, Form, Input, Popconfirm, Popover, Select, Table, Tag } from 'antd';
import React, { useContext, useEffect, useRef, useState, Component } from "react";
import { MyIcon } from "../../../../components/MyIcon";

//可编辑表格组件-开始
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    getAllRecords,
    ...restProps
}) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);

        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} 不能为空.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} width="100" onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

//可编辑表格组件-结束
export default class NewCarTable extends Component {
    constructor(props) {
        super(props);

        //设置表格的列的数据
        this.columns = [
            {
                title: ' ',
                dataIndex: 'key',
                width: '2%',
            },
            {
                title: '车辆名称',
                dataIndex: 'vehicleName',
                width: '15%',
                editable: true,
            },
            {
                title: '车辆标识',
                dataIndex: 'vehicleIdentification',
                width: '20%',
                editable: true,
            },
            {
                title: '车牌号码',
                width: "12%",
                editable: true,
                dataIndex: 'licensePlateNumber',
            },
            {
                title: '地址',
                dataIndex: 'vehicleAddress',
                width: "10%",
                render: data => <Popover content={data.address} >
                    <Tag>
                        {data.label}
                    </Tag>

                </Popover>
            },
            {
                title: '操作',
                dataIndex: '操作',
                width: '5%',
                render: (text, record) =>
                (
                    <Popconfirm title="确定要删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                        <Button size="small" type="primary">删除</Button>
                    </Popconfirm>
                ),
            },
        ];
    }
 
    //可编辑表格

    handleDelete = (key) => {
        const dataSource = [...this.props.dataSource];
        const newData = dataSource.filter((item) => item.key !== key);
        this.props.handleUpdate(newData)
    };

    handleSave = (row) => {
        const newData = [...this.props.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.props.handleUpdate(newData)
    };
    getAllRecords = (dataIndex) => {
        let records = []
        this.props.dataSource.forEach(v => {
            records.push(v[dataIndex])
        })
        return records
    }
    //可编辑表格-结束


    render() {
        //可编辑表格设置
        const { dataSource } = this.props;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    getAllRecords: this.getAllRecords,
                }),
            };
        });

        //可编辑表格设置-结束
        return (
            <div>
                <Card title={<div><MyIcon type="icon-chache" style={{ marginRight: 10 }} />待注册车辆信息</div>}>
                    <div style={{ marginBottom: 10, color: "gray" }}>
                        ！提示：点击单元格可以直接编辑，地址修改需要删除后重新添加
                    </div>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                

                </Card>
            </div>
        )
    }
}
