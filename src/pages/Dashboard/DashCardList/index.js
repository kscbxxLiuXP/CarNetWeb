import { Button } from 'antd'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './style.css'
class DashCardList extends Component {
    render() {
        return (
            <div className="dashcard-list-wrapper">
                <div className="dashcard-list-header">
                    <div className="dashcard-list-name">
                        {this.props.title}
                    </div>
                    <div className="dashcard-list-action">
                        <div className="dashcard-list-action-button" onClick={() => { this.props.history.push(this.props.to) }}>
                            更多
                        </div>
                    </div>
                </div>
                <div className="dashcard-list-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default withRouter(DashCardList)