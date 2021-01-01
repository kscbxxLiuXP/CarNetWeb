import React from 'react';
import { Badge, Card, Divider, Tag, Popover } from 'antd'
class VehicleCard extends React.Component {
    renderState(state) {
        switch (state) {
            case 1:
                return (
                    <Popover
                        placement="topLeft"
                        title={null}
                        content={
                            <>
                                <div style={{ marginTop: 5 }} >
                                    作业员：作业员1
                                </div>
                                <div style={{ marginTop: 5 }}>
                                    作业任务：<a>#12</a>
                                </div>
                            </>
                        }
                    >
                        <Badge status="processing" text="作业中" />
                    </Popover>
                )
                break;
            case 2:
                return (
                    <Popover
                        placement="topLeft"
                        title={null}
                        content={
                            <>
                                <div style={{ marginTop: 5 }} >
                                    上次作业时间：<br />2020年11月15日 21:20:00
                                </div>

                            </>
                        }
                    >
                        <Badge status="default" text="已停止" />
                    </Popover>
                )
                break;
            default:
                return <Badge status="success" text="作业中" />
                break;
        }
    }
    render() {
        return (
            <Card hoverable size="small" style={{paddingLeft:20,paddingRight:20}}>

                <img src="assets/img/vehicle.jpg" width="100%" alt="car-icon" />

                <Divider style={{ fontSize: 20 }} orientation="left" >    {this.props.item.name}</Divider>

                <div>
                    车牌号：{this.props.item.sign}
                </div>
                <div style={{ marginTop: 5 }}>
                    所在地区：<Tag>{this.props.item.address}</Tag>
                </div>


                <Divider />
                <div >
                    {this.renderState(this.props.item.state)}
                </div >


                <div style={{ float: "right", color: "#A9A9A9", marginBottom: -10, marginRight: -10 }}>
                    id:{this.props.item.id}
                </div>
            </Card>
        )
    }
}
export default VehicleCard