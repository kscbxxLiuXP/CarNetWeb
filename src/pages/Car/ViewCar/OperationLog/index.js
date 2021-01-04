import React from 'react';

import { Badge, Button, Table } from 'antd';
class OperationLog extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "任务名称",
                dataIndex: "taskName",
            },
            {
                title: "任务编号",
                dataIndex: "taskID",
                render: text => <a>{text}</a>
            },
            {
                title: "作业人员",
                dataIndex: "operatorName",
            },
            {
                title: "执行结果",
                dataIndex: "taskResult",
                render: text => <>{text === 1 ? <Badge status="success" text="成功" /> : <Badge status="error" text="失败" />}</>
            },
            {
                title: "执行时间",
                dataIndex: "operateTime",
            },
            {
                title: "备注",
                dataIndex: "comment",
            },
        ]
        this.state = {
            dataSource: [
                {
                    key: 1,
                    taskName: "取货",
                    taskID: "12",
                    operatorName: "张三",
                    taskResult: 1,
                    operateTime: "2020-12-12 19:32:12",
                    comment: "-"
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.state.dataSource}>

                </Table>
            </div>
        )
    }
}
export default OperationLog