import React from "react";
import { List, Card, PageHeader, Spin, Divider, Select, Input } from 'antd'
import TagFilter from "../../components/Filter/TagFilter";




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
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
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
        if(value==="")
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
                <Divider dashed />
                <div>
                    <Spin spinning={this.state.spinning}>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={this.data}
                            renderItem={item => (
                                <List.Item onClick={() => { console.log("Item " + item.title + " Clicked") }}>
                                    <Card hoverable title={item.title}>Card content</Card>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </div>

            </div>
        );
    }
}

export default Car