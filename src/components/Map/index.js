import { Button, message } from "antd";
import React from "react";
import { Stage, Layer, Rect, Group, Circle, Wedge, Text, Ellipse, Line, Arrow } from 'react-konva';
import { buildingData, getPath, roadData, roadNodedata } from "../../utils/mapData";
import { SearchOutlined, PlusOutlined, MinusOutlined, AimOutlined } from '@ant-design/icons';

class Map extends React.Component {
    state = {
        backFill1: "white",
        hoverBuildingid: -1,
        hoverNode: -1,
        hoverRoad: -1,
        scale: 1.0,
        x: -1,
        y: -1,
        show: false,
        text: "",
        selectedNode: -1,
        width: 1000,
        height: 800
    }

    componentDidMount() {
        if (this.props.selectedNode) {
            this.setState({ selectedNode: this.props.selectedNode })
        }
        if (this.props.width) {
            this.setState({ width: this.props.width })
        }
        if (this.props.height) {
            this.setState({ height: this.props.height })
        }
    }
    componentWillReceiveProps(n) {
        if (n.selectedNode) {
            this.setState({ selectedNode: n.selectedNode })
        }
    }
    render() {
        return (
            <div style={{ width: this.state.width + 2, borderStyle: "solid", borderColor: "black", borderWidth: 1, position: "relative" }}>
                <Stage width={this.state.width} height={this.state.height}>
                    <Layer >
                        {/* 画底图 */}
                        {/* 封闭形状 */}
                        <Line
                            points={[0, 0, 0, 1200, 1000, 1200, 1000, 0]}
                            fill={this.state.backFill1}

                            fill={"#FCF9F2"}
                            lineCap={'round'}
                            lineJoin={'round'}
                            closed={true}
                        />
                        <Group draggable
                            y={-250}
                            x={50}
                            ref={node => { this.mm = node }}
                            onMouseEnter={e => {

                            }}
                        >
                            <Line
                                points={[0, 0, 0, 1200, 1000, 1200, 1000, 0]}
                                fill={this.state.backFill1}

                                fill={"#FCF9F2"}
                                lineCap={'round'}
                                lineJoin={'round'}
                                closed={true}
                            />
                            {/* 画建筑 */}
                            {buildingData.map((item, index) => {
                                return <Group key={index}>
                                    <Line

                                        points={item.path}
                                        fill={this.state.hoverBuildingid == item.id ? "#e6f7ff" : "white"}
                                        stroke={'black'}
                                        strokeWidth={1}
                                        lineCap={'round'}
                                        lineJoin={'round'}
                                        closed={true}
                                        onMouseEnter={
                                            () => {
                                                this.setState({ hoverBuildingid: item.id })
                                            }
                                        }
                                        onMouseLeave={
                                            () => {
                                                this.setState({ hoverBuildingid: -1 })
                                            }
                                        }
                                        onClick={
                                            () => {
                                                var t = item.title

                                                message.info(`这里是${t}`)
                                            }
                                        }
                                    />
                                    <Text text={item.title} x={(item.path[2] + item.path[0]) / 2 - 25} y={(item.path[1] + item.path[5]) / 2 - 5} width={50} align={"center"} fill={"black"} />
                                </Group>

                            })}

                            {/* 画建筑入口 */}


                            {/* 画道路 */}
                            {roadData.map((item, index) => {
                                return <Line
                                    key={index}
                                    points={getPath(item.node1, item.node2)}
                                    stroke={'#b28fba'}
                                    lineCap={'round'}
                                    lineJoin={'round'}
                                    strokeWidth={this.state.hoverRoad === item.id ? 5 : 2}

                                    onMouseMove={
                                        (e) => {
                                            let pos = e.target.getStage().getPointerPosition();
                                            var a = this.mm.x()
                                            var b = this.mm.y()
                                            e.target.getStage().container().style.cursor = "pointer"
                                            this.tip.show()
                                            this.setState({
                                                hoverRoad: item.id,
                                                x: pos.x - a + 20,
                                                y: pos.y - b + 20,
                                                show: true,
                                                text: `这是道路${item.id}`
                                            })

                                        }
                                    }
                                    onMouseLeave={
                                        (e) => {
                                            e.target.getStage().container().style.cursor = "default"
                                            this.tip.hide()
                                            this.setState({
                                                hoverRoad: -1,
                                                x: -1,
                                                y: -1,
                                                show: false,
                                                text: ""

                                            })
                                        }
                                    }
                                />
                            })}
                            {/* 画图节点 */}
                            {roadNodedata.map((item, index) => {
                                return <Circle
                                    x={item.x}
                                    y={item.y}
                                    key={index}
                                    stroke="black"
                                    strokeWidth={1}
                                    fill={this.state.selectedNode === item.id ? "red" : "#f3a6b2"}
                                    radius={5}
                                    scaleX={this.state.hoverNode === item.id || this.state.selectedNode === item.id ? 1.2 : 1}
                                    scaleY={this.state.hoverNode === item.id || this.state.selectedNode === item.id ? 1.2 : 1}
                                    onMouseMove={
                                        (e) => {
                                            let pos = e.target.getStage().getPointerPosition();
                                            var a = this.mm.x()
                                            var b = this.mm.y()
                                            e.target.getStage().container().style.cursor = "pointer"
                                            this.setState({
                                                hoverNode: item.id,
                                                x: pos.x - a + 20,
                                                y: pos.y - b + 20,
                                                show: true,
                                                text: `这是节点${item.id}`
                                            })

                                        }
                                    }
                                    onMouseLeave={
                                        (e) => {
                                            e.target.getStage().container().style.cursor = "default"
                                            this.setState({
                                                hoverNode: -1,
                                                x: -1,
                                                y: -1,
                                                show: false,
                                                text: ""

                                            })
                                        }
                                    }
                                    onClick={
                                        () => {

                                            message.info(`这是节点${item.id}`)
                                            if (this.props.onAddressNodeClick) {
                                                this.props.onAddressNodeClick(item)
                                            }

                                        }
                                    }
                                />
                            })}

                            {/* 当前所在位置 */}
                            <Circle
                                x={100}
                                y={850}
                                stroke="black"
                                strokeWidth={1}
                                fill={"blue"}
                                radius={6}
                            />
                            <Group


                            >
                                <Rect
                                    x={this.state.x}
                                    y={this.state.y}
                                    ref={node => {
                                        this.tip = node
                                    }}
                                    // stroke={'#555'}
                                    // strokeWidth={2}
                                    fill={'white'}
                                    width={200}
                                    height={50}
                                    cornerRadius={5}
                                    shadowColor={'gray'}
                                    shadowBlur={5}
                                    shadowOpacity={0.6}
                                    visible={this.state.show}
                                >
                                </Rect>
                                <Text
                                    x={this.state.x + 20}
                                    y={this.state.y + 20}
                                    text={this.state.text}
                                    fontSize={16}
                                    fontFamily={'Calibri'}
                                    fill={'#555'}


                                />
                            </Group>


                        </Group>
                    </Layer>
                </Stage>

                <div style={{ position: "absolute", bottom: 40, right: 10 }}>
                    <div >
                        <Button shape='circle' icon={<AimOutlined />} style={{ marginBottom: 15 }} onClick={
                            () => {
                                this.setState({
                                    scale: 1.0,
                                })
                                this.mm.to({
                                    x: 50,
                                    y: -250,
                                    scaleX: 1.0,
                                    scaleY: 1.0
                                })
                            }
                        } /><br />
                        <Button shape='circle' icon={<PlusOutlined />} style={{ marginBottom: 5 }} onClick={() => {
                            var t = this.state.scale;
                            t = t + 0.1
                            this.setState({
                                scale: t,
                            })
                            this.mm.to(
                                {
                                    scaleX: t,
                                    scaleY: t,
                                    duration: 0.1
                                }
                            )
                        }}></Button>
                        <br />
                        <Button shape='circle' icon={<MinusOutlined />} onClick={() => {
                            var t = this.state.scale;
                            t = t - 0.1
                            this.setState({
                                scale: t,
                            })
                            this.mm.to(
                                {
                                    scaleX: t,
                                    scaleY: t,
                                    duration: 0.1
                                }
                            )
                        }}></Button>
                    </div>

                </div>
                <div style={{ position: "absolute", bottom: 10, right: 10, backgroundColor: "white" }}>
                    缩放比例：{this.state.scale.toFixed(1)}
                </div>
            </div>
        )
    }
}
export default Map