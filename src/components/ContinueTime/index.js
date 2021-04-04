import React, { Component } from 'react'
import { timeMinus } from '../../utils/utils';

export default class ContinueTime extends Component {
    constructor(props) {
        super(props);
        this.state={
            durationTime:""
        }
    }
    
    componentDidMount(){
        this.interval = setInterval(() => {
            var a = timeMinus(this.props.time)
          
            this.setState({ durationTime: a })
        }, 1000);
    }
    render() {
        return (
            <div>
                {this.state.durationTime}
            </div>
        )
    }
}
