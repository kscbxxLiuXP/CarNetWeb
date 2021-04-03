import React from "react";
import { List, Card, PageHeader, Spin, Divider, Select, Input, BackTop } from 'antd'
import TagFilter from "../../components/Filter/TagFilter";
import { MyIcon } from '../../components/MyIcon/index'
import VehicleCard from "../../components/VehicleCard";
import { addressGetAll } from "../../utils/apis/api_address";
import { staffGetAll } from "../../utils/apis/api_staff";
import { vehicleFilterByCondtion } from "../../utils/apis/api_vehicle";


const { Option } = Select
class Car extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addressList: [],
            vehicleList: [],
            staffList: [],
            stateFilter: "",
            nameFilter: "",
            addressFilter: "",
        }
    }
    getData() {
        this.setState({ loading: true })
        vehicleFilterByCondtion(this.state.addressFilter, this.state.nameFilter, this.state.stateFilter).then(e => {
            this.setState({ vehicleList: e, loading: false })
        })

    }
    componentDidMount() {
        addressGetAll().then(e => {
            this.setState({ addressList: e })
        })
        staffGetAll().then(e => {
            this.setState({ staffList: e })
        })
        this.getData()
    }
    onTagFilterChange = tags => {
        console.log(tags);
        var filter = ""
        if (tags.length === 2) {
            filter = ""
        } else if (tags.length === 1) {
            switch (tags[0]) {
                case '停止':
                    filter = 2
                    break;
                case '作业中':
                    filter = 1
                    break;
            }
        } else {
            filter = "-1"
        }

        this.setState({ stateFilter: filter }, () => { this.getData() })
    }
    handleAddressFilterChange = value => {

        this.setState({ addressFilter: value === undefined ? "" : value }, () => { this.getData() })
    }
    handleVechileSearch = value => {
        this.setState({ nameFilter: value === undefined ? "" : value }, () => { this.getData() })

    }

    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="车辆管理"
                >

                </PageHeader>
                <div style={{ marginTop: 20 }}>
                    <Card>
                        <div>
                            车辆名称：<Input.Search
                                style={{ width: 500 }} enterButton="搜索"
                                placeholder="请输入"
                                allowClear
                                onSearch={this.handleVechileSearch} />
                        </div>
                        <Divider dashed />
                        <div>
                            车辆状态：<TagFilter tags={['作业中', '停止']} onFilterChange={this.onTagFilterChange} />
                        </div>
                        <Divider dashed />
                        <div>
                            车辆地址： <Select
                                placeholder="不限"
                                allowClear
                                style={{ width: 200 }}
                                onChange={this.handleAddressFilterChange}
                            >
                                {this.state.addressList.map((adr, index) => {
                                    return <Option key={adr.id} value={adr.id}>{adr.label}</Option>
                                })}
                            </Select>
                        </div>

                    </Card>

                </div>
                <Divider dashed orientation="left"> 共 {this.state.vehicleList.length} 辆</Divider>
                <div>
                    <Spin spinning={this.state.loading}>
                        <List
                            grid={{ gutter: 32, column: 4 }}
                            dataSource={this.state.vehicleList}
                            renderItem={item => (
                                <List.Item >
                                    <VehicleCard staffList={this.state.staffList} addressList={this.state.addressList} item={item}></VehicleCard>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>
                <BackTop visibilityHeight={100} style={{ right: 50 }} />
            </div>
        );
    }
}

export default Car