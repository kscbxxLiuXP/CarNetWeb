import React from 'react';
import { PageHeader, Upload, Button, Descriptions, Card, Collapse, Table, Affix, message, Spin, Modal,BackTop } from 'antd'
import { DownloadOutlined, PlusCircleOutlined, SettingOutlined, LoadingOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import ExcelImport from '../../../components/ExcelImport';
import NewStaffForm from './NewStaffForm';
import './style.css'
import InfoComplete from './InfoComplete';
const { Panel } = Collapse;
class NewStaff extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "工号",
                dataIndex: 'id',

            },
            {
                title: "姓名",
                dataIndex: 'name',

            },
            {
                title: "身份证号",
                dataIndex: 'idNumber',

            },
            {
                title: "性别",
                dataIndex: 'gender',
            },
            {
                title: "年龄",
                dataIndex: "age",
            }, {
                title: "操作",
                dataIndex: "操作",
                render: (text, record) => (<Button type="danger" size="small" onClick={() => { this.onStaffDelete(record) }}>删除</Button>)
            }
        ],
            this.state = {
                loading: false,
                dataSource: [
                    // {
                    //     id: 1001,
                    //     name: "不知道1",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1002,
                    //     name: "不知道2",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1003,
                    //     name: "不知道3",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1004,
                    //     name: "不知道4",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1005,
                    //     name: "不知道5",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1001,
                    //     name: "不知道1",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1002,
                    //     name: "不知道2",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1003,
                    //     name: "不知道3",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1004,
                    //     name: "不知道4",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // },
                    // {
                    //     id: 1005,
                    //     name: "不知道5",
                    //     idNumber: '321283200003127618',
                    //     gender: '男',
                    //     age: 18
                    // }
                ],
                verifyFinish: false,
                step: 1,
            }
    }
    onStaffDelete = (record) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== record.key),
        });
    }
    //新建员工表单提交，员工添加到下方列表
    onFormFinish = (values) => {
        const { dataSource } = this.state;
        const newData = {
            key: values.id,
            id: values.id,
            name: values.name,
            idNumber: values.idNumber,
            gender: values.gender,
            age: values.age,
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
        message.success("添加成功！", 1.5);
    }

    //所有员工列表提交
    onFormSubmit = () => {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false, verifyFinish: false, step: 2 })
        }, 3000);
        setTimeout(() => {
            this.setState({ verifyFinish: true })
        }, 1000);
    }
    handelExcelImport = values => {
        let { dataSource } = this.state;
        values.forEach((item, index) => {
            const newData = {
                key: item[1],
                id: item[1],
                name: item[2],
                idNumber: item[3],
                gender: item[4],
                age: item[5],
            };

            dataSource = [...dataSource, newData];

        });
        this.setState({ dataSource: dataSource });
        message.success("导入成功！");
    }

    render() {
        return (
            <div>
                {
                    this.state.step === 1 ? <div>
                        <PageHeader
                            ghost={false}
                            onBack={() => window.history.back()}
                            title="员工注册"
                            extra={
                                <div >
                                    <div style={{ marginRight: 10, color: "gray", float: 'left' }}>
                                        提示：支持xlsx格式的表格
                        </div>
                                    <ExcelImport callback={this.handelExcelImport} />
                                </div>

                            }
                        >

                        </PageHeader>
                        <div>
                            <Spin tip="提交中..." spinning={this.state.loading}>
                                <Card style={{ marginTop: 10 }} title="新员工">
                                    <NewStaffForm onFormFinish={this.onFormFinish} />
                                </Card>
                                <Card title="待添加列表" style={{ marginTop: 20 }} >
                                    <Table columns={this.columns} dataSource={this.state.dataSource} />
                                </Card>
                            </Spin>
                        </div>
                    
                        <Affix offsetBottom={20}>
                            <Card size="small" style={{ marginTop: 20 }} className="bottom-submit">
                                <Button disabled={this.state.loading} style={{ float: "right" }} type="primary" onClick={this.onFormSubmit}>提交</Button>
                                {this.state.loading ? <div style={{ float: 'right', marginRight: 20, marginTop: 5 }}>
                                    {this.state.verifyFinish ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <LoadingOutlined style={{ fontSize: 20, marginRight: 5 }} />}
                                    {this.state.verifyFinish ? "验证完成" : "验证中"}
                                </div> : null}
                            </Card>
                        </Affix>
                    
                    </div> : <InfoComplete data={this.state.dataSource} onFormSubmit={() => {
                        this.setState({ step: 1, dataSource: [] });
                        Modal.info({
                            title: '信息',
                            content: (
                                <div>
                                    <p>员工添加成功</p>
                                    <p>初始密码为身份证号后6位</p>
                                </div>
                            ),
                            onOk() { },
                        });
                    }} />
                }
                    <BackTop visibilityHeight={50} style={{ right: 100,bottom:10 }} />
            </div>

        )
    }
}

export default NewStaff;