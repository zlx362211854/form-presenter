import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';
import ImageService from './imageService'


export interface IFileProp {
  uid: string
  name?: string
  status?: string
  url: string
}
export interface IUploadProps {
  onChange: (value: any) => void
  action: string
  initImageUrls?: IFileProp[] | string[]
  maxFileLength: number
  fileTypes?: string[]
  fileSize?: number,
  origin?: boolean
  form?: any
}
export default class Uploader extends React.Component<IUploadProps> {
  private defaultFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
  private defaultFileSize = 2
  private defaultMaxFileLength = 4
  state = {
    fileList: [],
    fileTypes: this.props.fileTypes || this.defaultFileTypes,
    fileSize: this.props.fileSize || this.defaultFileSize,
    maxFileLength: this.props.maxFileLength || this.defaultMaxFileLength,
  }
  componentDidMount() {
    const {initImageUrls = [], origin} = this.props
    this.init(initImageUrls, origin)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.initImageUrls && newProps.initImageUrls.length > 0 && this.props.initImageUrls.length === 0) {
      this.init(newProps.initImageUrls, newProps.origin)
    }
  }

  init = (initImageUrls, origin) => {
    if (initImageUrls) {
      // 获取全路径
      if (origin) {
        let imgsPromise = []
        const service = new ImageService()
        initImageUrls && initImageUrls.forEach(i => {
          imgsPromise.push(service.getFullImageUrl(i))
        })
        Promise.all(imgsPromise).then(arr => {
          const fileList = arr.map((i, index) => ({
            uid: index,
            status: 'done',
            url: i.data,
            response: {url: i.data},
          }))
          this.setState({fileList})
        })
      } else {
        if(typeof initImageUrls === 'string'){
          initImageUrls = [initImageUrls]
        }
        const fileList = initImageUrls.map((i, index) => ({
          uid: index,
          status: 'done',
          url: i,
          response: {url: i},
        }))
        this.setState({fileList})
      }
    }
  }


  handleChange = (info) => {
    const {fileList} = info
    if (info.file.status === 'done' || info.file.status === 'removed') {
      const donefileList = fileList.filter((i) => i.status === 'done').map((i) => ({url: i.response.result, name: i.name}))
      this.props.onChange(donefileList)
    }
    if (this.isRightType(info.file)) {
      this.setState({fileList})
    }
  }
  isRightType = (file) => {
    const {fileTypes} = this.state
    const isRightFileType = fileTypes.find(t => file.type.indexOf(t) !== -1)
    return !!isRightFileType
  }
  beforeUpload = (file): boolean => {
    const {fileSize} = this.state
    const isRightFileType = this.isRightType(file)
    if (!isRightFileType) {
      this.props.form.setFields({
        files: {
          errors: [new Error('不能上传该类型文件')],
        },
      })
      message.error('不能上传该类型文件')
    }
    const isLessthan = file.size / 1024 / 1024 < fileSize
    if (!isLessthan) {
      message.error(`图片大小不能超过${fileSize}MB!`)
    }
    return !!isRightFileType && !!isLessthan
  }
  render() {
    const {fileList, maxFileLength} = this.state
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          showUploadList={{showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: false}}
        >
          {fileList.length >= maxFileLength ? null :  <Button type={'primary'}><UploadOutlined /></Button>}
        </Upload>

      </div>
    );
  }
}
