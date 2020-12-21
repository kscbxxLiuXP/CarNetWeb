import { CheckOutlined, DownloadOutlined, RestOutlined, SmileOutlined, SyncOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, ConfigProvider, Descriptions, Form, Input, message, PageHeader, Popconfirm, Affix,Popover, Row, Select, Table, Tag, Upload } from 'antd';
import React, { useContext, useEffect, useRef, useState } from "react";
import { MyIcon } from "../../../components/MyIcon";
import * as XLSX from 'xlsx';
const { Option } = Select;

//定制下拉列表空状态
const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
        <SmileOutlined style={{ fontSize: 20 }} />
        <p>还未添加地址库</p>
    </div>
);

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
                    // ({ getFieldValue }) => ({
                    //     //验证不能重复
                    //     validator(rule, value) {
                    //         let records = getAllRecords(dataIndex);
                    //         let t = true;
                    //         let count = 0;
                    //         records.forEach(v => {
                    //             console.log(v, value)
                    //             if (v === value) {
                    //                 count++;
                    //             }
                    //         })
                    //         if (count > 1)
                    //             t = false;
                    //         if (t) {
                    //             return Promise.resolve();
                    //         } else {
                    //             return Promise.reject(`${title}不能与待注册中的一致!`);
                    //         }
                    //     },
                    // }),
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

class NewCar extends React.Component {
    formRef = React.createRef();

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
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                        <Button size="small" type="primary">删除</Button>
                    </Popconfirm>
                ),
            },
        ];

        //模拟地址
        this.addresses = [
            {
                id: 1,
                address: "辽宁省沈阳市浑南区东北大学",
                label: "辽宁沈阳浑南",
            },
            {
                id: 2,
                address: "辽宁省沈阳市南湖东北大学",
                label: "辽宁沈阳南湖",
            },
            {
                id: 3,
                address: "河北省秦皇帝市经济开发区东北大学秦皇岛分校",
                label: "河北秦皇岛"
            }
        ]

        this.state = {
            registerOpen: true,
            newCarClicked: false,
            checkLoading: false,//是否在检查
            checked: false,//是否检查通过
            errors: [],//错误信息
            //表格数据源
            dataSource: [
                // {
                //     key: '1',
                //     vehicleName: 'Edward King 0',
                //     vehicleIdentification: '32',
                //     licensePlateNumber: '苏E·01256',
                //     vehicleAddress: {
                //         id: 1,
                //         address: "辽宁省沈阳市浑南区东北大学",
                //         label: "辽宁沈阳浑南",
                //     },
                // },
                // {
                //     key: '2',
                //     vehicleName: 'Edward King 0',
                //     vehicleIdentification: '32',
                //     licensePlateNumber: '苏E·01256',
                //     vehicleAddress: {
                //         id: 1,
                //         address: "辽宁省沈阳市浑南区东北大学",
                //         label: "辽宁沈阳浑南",
                //     },
                // },
            ],
            xlsxData: [],
            count: 0,
        };
    }
    //批量导入功能
    uploadProps = {
        accept: ".xls,.xlsx,application/vnd.ms-excel",
        showUploadList: false,
        beforeUpload: (file) => {
            const f = file;
            const reader = new FileReader();
            reader.onload = () => {
                const datas = reader.result;
                const workbook = XLSX.read(datas, {
                    type: 'binary'
                });
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                this.handleImpotedJson(jsonArr, file);
            };
            reader.readAsBinaryString(file);
            return false;
        },
        onRemove: () => {
            this.setState({ xlsxData: [] });
        }
    };



    handleImpotedJson = (jsonArr, file) => {
        jsonArr.splice(0, 1); // 去掉表头
        let { count, dataSource } = this.state;
        const jsonArrData = jsonArr.forEach((item, index) => {

            const newData = {
                key: count + index + 1,
                vehicleName: item[1],
                vehicleIdentification: item[2],
                licensePlateNumber: item[3],
                vehicleAddress: this.addresses[item[4] - 1],
            };

            dataSource = [...dataSource, newData];
        });
        console.log(dataSource)
        this.setState({ dataSource: dataSource, count: count + jsonArr.length });
        message.success("导入成功！");
    }



    checkDataRepeat = () => {
        this.setState({ checkLoading: true });
        const records = this.state.dataSource;
        var errors = [];
        //检查当前表内是否有重复
        for (var i = 0; i < records.length; i++) {
            var hasError = false;
            var errorTitle = '编号 [' + (i + 1) + ']\n';
            var error = [];
            for (var j = i + 1; j < records.length; j++) {
                if (records[i].vehicleName === records[j].vehicleName) {
                    hasError = true;
                    error.push(`车辆名称与 编号 ${j + 1} 重复`)
                }
                if (records[i].vehicleIdentification === records[j].vehicleIdentification) {
                    hasError = true;
                    error.push(`车辆标识与 编号 ${j + 1} 重复`)
                }
                if (records[i].licensePlateNumber === records[j].licensePlateNumber) {
                    hasError = true;
                    error.push(`车牌号码与 编号 ${j + 1} 重复`)
                }

            }
            if (hasError) {
                errors.push({
                    "errorTitle": errorTitle,
                    error: error,
                })
            }
        }
        //检查数据库中是否有重复
        //@TODO
        //与后端交接

        if (errors.length === 0) {
            this.setState({ checked: true });

        }

        this.setState({
            checkLoading: false,
            errors
        })
    }

    //可编辑表格

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };
    getAllRecords = (dataIndex) => {
        let records = []
        this.state.dataSource.forEach(v => {
            records.push(v[dataIndex])
        })
        return records
    }
    //可编辑表格-结束



    //新建车辆提交
    onFinish = (values) => {


        const { count, dataSource } = this.state;
        const newData = {
            key: count + 1,
            vehicleName: values.vehicleName,
            vehicleIdentification: values.vehicleIdentification,
            licensePlateNumber: values.licensePlateNumber,
            vehicleAddress: this.addresses[values.vehicleAddress],
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
            checked: false,
        });
        this.onReset();
        message.success("添加成功！", 1.5);
    };

    //重置表单
    onReset = () => {
        this.formRef.current.resetFields();
    };

    //批量导入点击
    onMultiImportClicked = e => {
        console.log('批量导入点击');
    }
    checkVehicleName = (rule, value) => {

        let t = true;
        let name = '';
        this.state.dataSource.forEach(v => {
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
        this.state.dataSource.forEach(v => {
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
    onSubmitAll = () => {
        console.log(this.state.dataSource);
    }
    renderError = (e, index) => {
        return (<div key={index}>
            {index + 1}、{e.errorTitle}:
            {e.error.map((er, index) => {
                return <div key={index} style={{ marginLeft: 10 }}>{er}</div>
            })}
            <div></div>
        </div>)
    }
    render() {

        //可编辑表格设置
        const { dataSource } = this.state;
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
                <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="车辆注册"
                        subTitle="车辆首次连入车联网"
                        extra={
                            <div >
                                <div style={{ marginRight: 10, color: "gray",float:'left' }}>
                                    提示：支持xlsx格式的表格
                                    </div>
                                <Upload  {...this.uploadProps}>


                                    <Button key="1" disabled={!this.state.registerOpen} type="primary" icon={<DownloadOutlined />} onClick={this.onMultiImportClicked}>批量导入</Button>,
                                </Upload>
                            </div>

                        }
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item>    <Badge status={this.state.registerOpen ? "success" : "error"} text={this.state.registerOpen ? "当前注册开放" : "当前注册未开放"} /></Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div>

                <div style={{ marginTop: 10, width: '100%' }}>
                    <Row gutter={20}>
                        <Col flex="300px">
                        <Affix offsetTop={100} >
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
                                                {this.addresses.map((adr, index) => {
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
                        </Affix>
                        </Col>
                        <Col flex="auto">
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
                                {this.state.errors.length === 0 ? null : (
                                    <div style={{ color: 'red' }}>
                                        发现错误：
                                        {this.state.errors.map((e, index) => {
                                            return (
                                                this.renderError(e, index)
                                            )
                                        })}
                                    </div>
                                )}
                                {this.state.checked ? <div style={{ color: 'green' }}>检查通过！</div> : null}

                            </Card>

                            <Card size="small">
                                <Button type="primary" disabled={!this.state.checked} onClick={this.onSubmitAll} icon={<CheckOutlined />} style={{ float: "right" }}>提交</Button>
                                <Button type="primary" loading={this.state.checkLoading} onClick={this.checkDataRepeat} icon={<SyncOutlined />} style={{ float: "right", marginRight: 20 }}>{this.state.checkLoading ? "检查中" : "检查"}</Button>
                                <div style={{ marginRight: 20, color: "gray", float: "right" }}>
                                    提示：提交前请先运行检查
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>



            </div>
        )
    }
}

export default NewCar;