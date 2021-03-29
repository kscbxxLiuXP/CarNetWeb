import React from 'react'
import { PageHeader, Button, Card, Affix, Menu, Row, Col, Descriptions, Badge, Space } from 'antd'
import AvatarUpload from '../../../components/AvatarUpload'
import './infoComplete.css'
class InfoComplete extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPerson: this.props.data[0],
            selectIndex: 0,
        }
    }


    //左侧菜单栏点击后，显示员工的信息
    handleMenuClick = e => {
        this.setState({ currentPerson: e.item.props.data })
    }

    onFormSubmit = () => {
        this.props.onFormSubmit()
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
                        <Col flex="200px">
                            <h1>
                                共 {this.props.data.length} 人
                            </h1>

                            <div className="infocomplete-list"
                                style={{ overflowY: "auto", height: "550px", }}
                            >
                                {this.props.data.map((data, index) => {
                                    return <div className={this.state.selectIndex === index ? "infocomplete-listitem-selected" : "infocomplete-listitem"} key={index + 1}
                                        onClick={() => { this.setState({ selectIndex: index, currentPerson: data }) }}
                                    >

                                        <div style={{ background: "lightgray", borderWidth: 1, width: 25, height: 20, textAlign: 'center', color: "white", }}>{index + 1}</div>
                                        <div style={{ width: "98%", marginLeft: 10 }}> {data.name}  </div>


                                    </div>
                                })}
                            </div>

                        </Col>
                        <Col flex="auto">
                            <div style={{ margin: 30 }}>
                                <Descriptions title="员工信息" bordered column={2} size="small">
                                    <Descriptions.Item label="工号">{this.state.currentPerson.id}</Descriptions.Item>
                                    <Descriptions.Item label="姓名">{this.state.currentPerson.name}</Descriptions.Item>
                                    <Descriptions.Item label="性别">{this.state.currentPerson.gender}</Descriptions.Item>
                                    <Descriptions.Item label="年龄">{this.state.currentPerson.age}</Descriptions.Item>
                                    <Descriptions.Item label="身份证号" span={2}>{this.state.currentPerson.idNumber}</Descriptions.Item>
                                    <Descriptions.Item label="正面照上传" span={2}>
                                        <AvatarUpload id={this.state.currentPerson.id} />
                                        <div style={{ color: "red" }}>*此图片将作为人脸识别的图片</div>
                                    </Descriptions.Item>

                                </Descriptions>
                            </div>

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