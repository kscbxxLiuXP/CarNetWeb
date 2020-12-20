import * as React from "react";
import { Result, Button } from "antd";
import './error.css'
import { withRouter } from "react-router-dom"

class Error404 extends React.Component {
    render() {
        return (
            <div className='E404-div'>
                <Result
                    status="404"
                    title="404 NOT FOUND"
                    subTitle="对不起，您访问的页面不存在."
                    extra={<Button type="primary" onClick={()=>{
                        this.props.history.push('/')
                    }}>返回首页</Button>}
                />,
            </div>
        );
    }

}

export default Error404