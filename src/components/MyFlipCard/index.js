import React from "react";
import './style.css'
import {Avatar} from "antd";

class MyFilpCard extends React.Component {
    a = () => {
        this.classList.toggle('hover')
    }

    render() {
        return (

            <div className="flip-container" onTouchStart={this.a}>
                <div className="flipper">
                    <div className="front">
                        <div style={{
                            width: 600, height: 300, borderRadius: 10, backgroundColor: "white", alignContent: 'center',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                        }}>
                            <div>
                                <div style={{textAlign:"center"}}>
                                    <Avatar size={120} src={this.props.src} alt=""/>
                                </div>

                                <div style={{marginTop:20,textAlign:"center",fontWeight:"bold",fontSize:18}}>
                                    <span style={{fontSize:30}}>@</span>{this.props.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="back">
                        <div style={{
                            width: 600, height: 300, borderRadius: 10, backgroundColor: "white", alignContent: 'center',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                        }}>
                    <div style={{fontSize:18}}>
                        {this.props.des}
                    </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MyFilpCard