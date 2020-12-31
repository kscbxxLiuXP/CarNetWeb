import React from 'react'
import { PageHeader, Button, Card, Affix, Menu, Row, Col, Descriptions, Badge } from 'antd'
import AvatarUpload from '../../../components/AvatarUpload'
class InfoComplete extends React.Component {

    handleMenuClick = e => {
        console.log(e)
    }

    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="员工注册"
                    subTitle="完善员工信息"
                />

                <Card style={{ marginTop: 20 }}>
                    <Row>
                        <Col flex="130px">
                            <h1>
                                共 {this.props.data.length} 人
                            </h1>

                            <div
                                style={{ overflowY: "scroll", height: 350, }}
                            >
                                <Menu
                                    onClick={this.handleMenuClick}
                                    defaultSelectedKeys={['1']}
                                    mode="inline"
                                    style={{ overflowX: "hidden" }}
                                >
                                    {this.props.data.map((data, index) => {
                                        return <Menu.Item key={index + 1}

                                        >
                                            {data.name}
                                        </Menu.Item>
                                    })}

                                </Menu>
                            </div>

                        </Col>
                        <Col flex="4">
                            <div style={{ margin: 30 }}>
                                <Descriptions title="User Info" bordered column={2} size="small">
                                    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                                    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                                    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                                    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                                    <Descriptions.Item label="Usage Time" span={2}>
                                        2019-04-24 18:00:00
                                </Descriptions.Item>

                                    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>

                                </Descriptions>
                            </div>

                        </Col>
                        <Col flex="auto">
                            <AvatarUpload />
                        </Col>
                    </Row>

                </Card>

                <Affix offsetBottom={20}>
                    <Card size="small" style={{ marginTop: 20 }} className="bottom-submit">
                        <Button style={{ float: "right" }} type="primary" onClick={this.onFormSubmit}>完成</Button>
                        <Button type="dashed" style={{ marginRight: 10, float: 'right' }}>跳过</Button>
                    </Card>
                </Affix>
            </div>
        )
    }
}
export default InfoComplete