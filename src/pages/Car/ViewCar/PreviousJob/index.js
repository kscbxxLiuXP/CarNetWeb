import React from 'react';
import { Badge, Button, Table } from 'antd';
import { timeFormat } from '../../../../utils/utils';
import { withRouter } from 'react-router';

class PreviousJob extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "任务名称",
                dataIndex: "id",
                render: r => <div>{
                    this.props.taskList.map(i => {
                        if (i.id === parseInt(r)) {
                            return i.name
                        }
                    })
                }</div>
            },
            {
                title: "任务编号",
                dataIndex: "id",
                render: text => <a href={"#/home/task/manage/" + text}>#{text}</a>
            },
            {
                title: "作业人员",
                dataIndex: "staffID",
                render: r => <div>{this.props.staffList.map(i => {
                    if (i.id === r) {
                        return i.name
                    }
                })}</div>
            },
            {
                title: "执行结果",
                dataIndex: "step",
                render: text => <>{this.renderState(text)}</>
            },
            {
                title: "执行时间",
                dataIndex: "step2Time",
                render: r => <div>{timeFormat(r)}</div>
            },
            {
                title: "备注",
                dataIndex: "comment",
                render: r => <div>-</div>
            },
            {
                title: "操作",
                dataIndex: "操作",
                render: (text, reocrd) => <Button type="primary" onClick={() => {
                    this.props.history.push('/home/task/manage/'+reocrd.id)
                }}>查看</Button>
            }
        ]

    }
    renderState(state) {
        switch (state) {
            case 1:
                return <Badge color="orange" text="等待接单"></Badge>
                break;
            case 2:
                return <Badge color="orange" text="等待执行"></Badge>
                break;
            case 3:
                return <Badge color="#2db7f5" text="执行中"></Badge>
                break;
            case 4:
                return <Badge color="#87d068" text="任务完成"></Badge>
                break;

            default:
                break;
        }
    }
    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.props.jobList}>

                </Table>
            </div>
        )
    }
}
export default withRouter(PreviousJob) 