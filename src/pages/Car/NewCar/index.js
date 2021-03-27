import { CheckOutlined, DownloadOutlined, SyncOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Descriptions, message, PageHeader, Affix, Row, Select, Upload, Result } from 'antd';
import React from "react";
import * as XLSX from 'xlsx';
import NewCarFormCard from './NewCarFormCard';
import NewCarTable from './NewCarTable';
import axios from "axios"
import { api_address_all } from '../../../utils/apis/api';
import { addressGetAll } from '../../../utils/apis/api_address';
import { settingGetRegisterOpen } from '../../../utils/apis/api_setting';
import { vehicleRegisterInGroup } from '../../../utils/apis/api_vehicle';
class NewCar extends React.Component {
    constructor(props) {
        super(props);
        //模拟地址
        this.state = {
            registerOpen: true,
            address: [],

            newCarClicked: false,
            checkLoading: false,//是否在检查
            checked: false,//是否检查通过
            errors: [],//错误信息
            //表格数据源
            dataSource: [

            ],
            xlsxData: [],
            count: 0,
        };
    }
    componentDidMount() {
        //获取地址列表
        addressGetAll().then(
            res => {
                this.setState({ address: res })
            }
        )

        //获取是否开放注册
        settingGetRegisterOpen().then(e => {
            this.setState({
                registerOpen: e === 1 ? true : false
            })
        })
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
                this.handleImportedJson(jsonArr, file);
            };
            reader.readAsBinaryString(file);
            return false;
        },
        onRemove: () => {
            this.setState({ xlsxData: [] });
        }
    };

    handleImportedJson = (jsonArr) => {
        jsonArr.splice(0, 1); // 去掉表头
        let { count, dataSource } = this.state;
        jsonArr.forEach((item, index) => {

            const newData = {
                key: count + index + 1,
                vehicleName: item[1],
                vehicleIdentification: item[2],
                licensePlateNumber: item[3],
                vehicleAddress: this.state.address[item[4] - 1],
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
        if (records.length === 0) {
            errors.push(
                {
                    errorTitle: '错误',
                    error: ["不可以为空"],
                }
            )

        }
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

        console.log(errors)
        this.setState({
            checkLoading: false,
            errors,
            checked: errors.length === 0
        })
    }


    onSubmitAll = () => {
        console.log(this.state.dataSource);
        vehicleRegisterInGroup(this.state.dataSource).then(message.success("注册成功！"))
        this.setState({
            dataSource:[],
            checked:false,
        })
    }
    onNewCarFormFinish(values) {
        const { count, dataSource } = this.state;
        const newData = {
            key: count + 1,
            vehicleName: values.vehicleName,
            vehicleIdentification: values.vehicleIdentification,
            licensePlateNumber: values.licensePlateNumber,
            vehicleAddress: this.state.address[values.vehicleAddress],
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
            checked: false,
        });
        message.success("添加成功！", 1.5);
    }
    handleUpdate(values) {
        this.setState({ dataSource: values })
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
                                <div style={{ marginRight: 10, color: "gray", float: 'left' }}>
                                    提示：支持xlsx格式的表格
                                    </div>
                                <Upload  {...this.uploadProps}>
                                    <Button key="1" disabled={!this.state.registerOpen} type="primary" icon={<DownloadOutlined />}>批量导入</Button>
                                </Upload>
                            </div>
                        }
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item>    <Badge status={this.state.registerOpen ? "success" : "error"} text={this.state.registerOpen ? "当前注册开放" : "当前注册未开放"} /></Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div>
                {this.state.registerOpen ? <div style={{ marginTop: 10, width: '100%' }}>
                    <Row gutter={20}>
                        <Col flex="300px">
                            <Affix offsetTop={100} >
                                <NewCarFormCard addresses={this.state.address} dataSource={this.state.dataSource} onFinish={e => this.onNewCarFormFinish(e)} />
                            </Affix>
                        </Col>
                        <Col flex="auto">
                            <NewCarTable dataSource={this.state.dataSource} handleUpdate={values => this.handleUpdate(values)} />
                            <Card size="small">
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
                                <Button type="primary" disabled={!this.state.checked} onClick={this.onSubmitAll} icon={<CheckOutlined />} style={{ float: "right" }}>提交</Button>
                                <Button type="primary" loading={this.state.checkLoading} onClick={this.checkDataRepeat} icon={<SyncOutlined />} style={{ float: "right", marginRight: 20 }}>{this.state.checkLoading ? "检查中" : "检查"}</Button>
                                <div style={{ marginRight: 20, color: "gray", float: "right" }}>
                                    提示：提交前请先运行检查
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div> : <div style={{ backgroundColor: "white", marginTop: 20 }}>
                    <Result
                        status="warning"
                        title="当前注册尚未开放！"

                    />
                </div>}

            </div>
        )
    }
}

export default NewCar;