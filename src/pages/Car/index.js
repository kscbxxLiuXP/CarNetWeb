import React from "react";
import { List, Card, PageHeader, Spin, Divider, Select, Input, BackTop } from 'antd'
import TagFilter from "../../components/Filter/TagFilter";
import { MyIcon } from '../../components/MyIcon/index'
import VehicleCard from "../../components/VehicleCard";


const {Option} =Select
class Car extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spinning: false
        }
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

    }

    data = [
        {
            id: '123001',
            name: '车辆1',
            sign: '苏A 54KLS',
            address: "辽宁沈阳浑南",
            state: 1,
        },
        {
            id: '123002',
            name: '车辆2',
            sign: '苏A 65ECC',
            address: "辽宁沈阳浑南",
            state: 1,
        },
        {
            id: '123003',
            name: '车辆3',
            sign: '辽A 3DMAX',
            address: "辽宁沈阳浑南",
            state: 2,
        },
        {
            id: '123004',
            name: '车辆4',
            sign: '辽A IDEA1',
            address: "辽宁沈阳浑南",
            state: 1,
        },
        {
            id: '123005',
            name: '车辆5',
            sign: '辽A IDEA1',
            address: "辽宁沈阳浑南",
            state: 2,
        },
        {
            id: '123006',
            name: '车辆6',
            sign: '辽A IDEA1',
            address: "辽宁沈阳浑南",
            state: 1,
        },
    ];

    onTagFilterChange = tags => {
        this.setState({ spinning: true })
        setTimeout(() => { this.setState({ spinning: false }) }, 300)
    }
    handleAddressFilterChange = value => {
        this.setState({ spinning: true })
        setTimeout(() => { this.setState({ spinning: false }) }, 300)
        // console.log(value)
    }
    handleVechileSearch = value => {
        this.setState({ spinning: true })
        setTimeout(() => { this.setState({ spinning: false }) }, 300)
        if (value === "")
            console.log("empty input")
        else
            console.log(value)
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
                                {this.addresses.map((adr, index) => {
                                    return <Option key={adr.id} value={adr.id}>{adr.label}</Option>
                                })}
                            </Select>
                        </div>

                    </Card>

                </div>
                <Divider dashed orientation="left"> 共 {2} 辆</Divider>
                <div>
                    <Spin spinning={this.state.spinning}>
                        <List
                            grid={{ gutter: 16, column: 5 }}
                            dataSource={this.data}
                            renderItem={item => (
                                <List.Item onClick={() => {this.props.history.push("/home/car/manage/"+item.id)}}>
                                    <VehicleCard item={item}></VehicleCard>
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