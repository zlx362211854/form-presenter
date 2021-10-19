import React from 'react'
import { CameraOutlined } from '@ant-design/icons';
import { Upload, Modal, message } from 'antd';
import ImageService from './imageService'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export interface IFileProp {
  uid: string
  name?: string
  status?: string
  url: string
}
export interface IPicturesWall {
  onChange: (value: any) => void
  action: string
  initImageUrls?: IFileProp[] | string[]
  maxFileLength: number
  fileTypes?: string[]
  fileSize?: number,
  origin?: boolean
  disabled?: boolean
}
export default class PicturesWall extends React.Component<IPicturesWall> {
  private defaultFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
  private defaultFileSize = 2
  constructor(props) {
    super(props)
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    fileTypes: this.props.fileTypes || this.defaultFileTypes,
    fileSize: this.props.fileSize || this.defaultFileSize,
    maxFileLength: 1,
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
  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })

  }

  handleChange = (info) => {

    const {fileList} = info
    if (info.file.status === 'done' || info.file.status === 'removed') {
      const donefileList = fileList.filter((i) => i.status === 'done').map((i) => i.response?.result ? i.response.result : i.response?.url)
      this.props.onChange(donefileList[0])
    }
    this.setState({fileList})
  }
  beforeUpload = (file) => {
    const {fileTypes, fileSize} = this.state
    const isRightFileType = fileTypes.indexOf(file.type) !== -1
    if (!isRightFileType) {
      message.error('不能上传该类型文件')
    }
    const isLessthan = file.size / 1024 / 1024 < fileSize
    if (!isLessthan) {
      message.error(`图片大小不能超过${fileSize}MB!`)
    }
    return isRightFileType && isLessthan
  }
  render() {
    const {previewVisible, previewImage, fileList, maxFileLength} = this.state
    const uploadButton = (
      <div>
        <CameraOutlined style={{fontSize: '38px', marginBottom: '10px'}} />
        <div className="ant-upload-text">上传</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          showUploadList={{showPreviewIcon: true, showRemoveIcon: this.props.disabled !== true, showDownloadIcon: false}}
        >
          {fileList.length >= maxFileLength ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
