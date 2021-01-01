import React from "react";
import { Button, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

class ExcelImport extends React.Component {
    constructor(props) {
        super(props);

    }

    //批量导入功能
    uploadProps = {
        accept: ".xls,.xlsx,application/vnd.ms-excel",
        showUploadList: false,
        beforeUpload: (file) => {
            const f = file;
            const reader = new FileReader();
            reader.onload = () => {
                const datas = reader.result;
                const workbook = XLSX.read(datas, {
                    type: 'binary'
                });
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                this.handleImpotedJson(jsonArr, file);
            };
            reader.readAsBinaryString(file);
            return false;
        },
        onRemove: () => {
            this.setState({ xlsxData: [] });
        }
    };

    handleImpotedJson = (jsonArr, file) => {
        jsonArr.splice(0, 1); // 去掉表头
        this.props.callback(jsonArr)
    }

    render() {
        return (

            <Upload  {...this.uploadProps}>
                <Button type="primary" icon={<DownloadOutlined />} >批量导入</Button>
            </Upload>

        )
    }
}
export default ExcelImport;