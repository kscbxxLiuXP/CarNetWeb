
import { Button, Image, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useFileUpload } from 'use-file-upload'
import { api_staff_upload_photo } from '../../utils/apis/api'
import { formatFileSize } from '../../utils/utils'
import { UploadOutlined } from "@ant-design/icons"
import './style.css'
const AvatarUpload = (props) => {
  const [file, selectFile] = useFileUpload()
  const [loading, setLoading] = useState(false);
  return (
    <div className="avatar-upload-wrapper">
      {file ? (
        <div>
          <Image src={file.source} width={200} />

        </div>
      ) : (
        <Image
          width={200}
          height={200}
          src='assets/img/noavatar.png'
        />
      )}
      <br />
      {file ? (<div>
        <span> 文件大小: {formatFileSize(file.size)} </span>
      </div>
      ) : null}
      <Button
        style={{ width: 120 }}
        icon={<UploadOutlined />}
        onClick={() => {
          // Single File Upload
          selectFile({ accept: 'image/*' }, ({ source, name, size, file }) => {
            // file - is the raw File Object
            console.log({ source, name, size, file })
            // Todo: Upload to cloud.
          })
        }}
        disabled={loading}
      >
        选择文件
      </Button>
      <Button
        style={{ width: 120, marginTop: 10 }}
        loading={loading} disabled={!file} onClick={() => {
          //将文件上传至服务器
          setLoading(true)
          console.log(props.id);
          let param = new FormData();
          param.append('file', file.file)
          param.append('id', props.id)
          let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
          axios.post(api_staff_upload_photo, param, config).then(res => {
            console.log(res);
            setLoading(false)
            message.success("上传成功！")
          })
        }}>上传</Button>

    </div>
  )
}

export default AvatarUpload