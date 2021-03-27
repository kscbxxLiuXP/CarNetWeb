import React, { Component } from 'react'
import { Rect, Text } from "react-konva"
export default class Tip extends Component {
    render() {
        return (
            <div>
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    stroke={'#555'}
                    strokeWidth={5}
                    fill={'#ddd'}
                    width={300}
                >
                </Rect>
                <Text
                    x={this.props.x + 10}
                    y={this.props.y + 10}
                    text={this.props.text}
                    fontSize={18}
                    fontFamily={'Calibri'}
                    fill={'#555'}


                />
            </div>
        )
    }
}
