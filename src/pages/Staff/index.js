import React from 'react';
import { List, Card, PageHeader, Spin, Divider, Select, Input, BackTop, Button } from 'antd'
import TagFilter from "../../components/Filter/TagFilter";
import { MyIcon } from '../../components/MyIcon/index'
import VehicleCard from "../../components/VehicleCard";
import StaffTable from './StaffTable';
import { staffFilterByCondtion } from '../../utils/apis/api_staff';
const { Option } = Select
class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idFilter: "",
            idNumberFilter: "",
            nameFilter: "",
            dataSource: [],
            loading: false,
        }
    }
    getData() {
        this.setState({
            loading: true
        })
        staffFilterByCondtion(this.state.idFilter, this.state.nameFilter, this.state.idNumberFilter).then(e => {
            e.forEach(element => {
                element.key = element.id
            });
            this.setState({ dataSource: e, loading: false })
        })
    }
    componentDidMount() {
        this.getData()
    }
    handleFilterReset = () => {
        this.setState({
            idFilter: "",
            idNumberFilter: "",
            nameFilter: "",

        }, () => { this.getData() })
    }
    handleFilterSearch = () => {
        this.getData()
    }
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="员工管理"
                >

                </PageHeader>
                <div style={{ marginTop: 20 }}>
                    <Card

                    >
                        <div>
                            员工ID：<Input
                                style={{ width: 250 }}
                                placeholder="不限"
                                value={this.state.idFilter}
                                onChange={(e) => { this.setState({ idFilter: e.target.value }) }}
                                allowClear
                            /> 员工姓名：<Input
                                style={{ width: 250 }}
                                placeholder="不限"
                                value={this.state.nameFilter}
                                onChange={(e) => { this.setState({ nameFilter: e.target.value }) }}
                                allowClear
                            /> 员工身份证号：<Input
                                style={{ width: 250 }}
                                placeholder="不限"
                                value={this.state.idNumberFilter}
                                onChange={(e) => { this.setState({ idNumberFilter: e.target.value }) }}
                                allowClear
                            />
                        </div>
                        <br />
                        <div>
                            <Button onClick={this.handleFilterReset}>重置</Button>
                            <Button style={{ marginLeft: 10 }} type="primary" onClick={this.handleFilterSearch}>查询</Button>
                        </div>



                    </Card>
                    <br />
                    <Card title="员工列表" extra={<Button onClick={() => { this.getData() }}>刷新</Button>}>
                        <StaffTable dataSource={this.state.dataSource} loading={this.state.loading} getData={() => { this.getData() }} />
                    </Card>
                </div>
            </div>
        )
    }
}

export default Staff;