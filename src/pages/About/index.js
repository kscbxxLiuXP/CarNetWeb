import React from 'react'

import {BackTop} from "antd";
import MyFilpCard from "../../components/MyFlipCard";


export default class About extends React.Component {
    render() {
        return (
            <div style={{
                alignContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
            }}>
                <div>
                    <div style={{width: '100%', textAlign: "center"}}>
                        工业车联网
                    </div>

                    <br/>
                    <div style={{fontSize: 20, marginTop: -20, marginBottom: 30, width: '100%', textAlign: "center"}}>
                        关于我们
                    </div>
                    <div>
                        <span style={{float: "left", marginLeft: -50, fontSize: 30, fontStyle: "oblique"}}>1.</span>
                        <MyFilpCard name={'半透明的墙'} src={'assets/img/a1.jpg'} des={'没有感情的代码机器'}/>
                    </div>
                    <div>
                        <span style={{float: "right", marginRight: -50, fontSize: 30, fontStyle: "oblique"}}>.2</span>
                        <MyFilpCard name={'Arthas Menethil'} src={'assets/img/a2.jpg'} des={'忠实哲学爱好者'}/>
                    </div>
                    <div>
                        <span style={{float: "left", marginLeft: -50, fontSize: 30, fontStyle: "oblique"}}>3.</span>
                        <MyFilpCard name={'金针小肥猪'} src={'assets/img/a3.jpg'} des={'对掰门把手颇有研究'}/>
                    </div>
                    <div>
                        <span style={{float: "right", marginRight: -50, fontSize: 30, fontStyle: "oblique"}}>.4</span>
                        <MyFilpCard name={'北风寒'} src={'assets/img/a4.jpg'} des={'智商达人'}/>
                    </div>
                    <div>
                        <span style={{float: "left", marginLeft: -50, fontSize: 30, fontStyle: "oblique"}}>5.</span>
                        <MyFilpCard name={'雨阳'} src={'assets/img/a5.jpg'} des={'假沈阳本地人，大创组语文课代表'}/>
                    </div>

                </div>
                <BackTop visibilityHeight={200} style={{right: 50}}/>

            </div>
        )
    }
}