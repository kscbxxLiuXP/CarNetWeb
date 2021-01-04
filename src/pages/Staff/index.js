import React from 'react';
import { List, Card, PageHeader, Spin, Divider, Select, Input, BackTop, Button } from 'antd'
import TagFilter from "../../components/Filter/TagFilter";
import { MyIcon } from '../../components/MyIcon/index'
import VehicleCard from "../../components/VehicleCard";
import StaffTable from './StaffTable';
const { Option } = Select
class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idFilter: "",
            idNumberFilter: "",
            nameFilter: "",
        }
    }
    handleFilterReset = () => {
        this.setState({
            idFilter: "",
            idNumberFilter: "",
            nameFilter: "",

        })
    }
    handleFilterSearch = () => {
        const { idNumberFilter, idFilter, nameFilter } = this.state;
        const filters = {
            id: idFilter,
            idNumber: idNumberFilter,
            name: nameFilter,
        }
        console.log(filters);
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
                    <Card>
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
                    <Card title="员工列表">
                        <StaffTable />
                    </Card>
                </div>
            </div>
        )
    }
}

export default Staff;