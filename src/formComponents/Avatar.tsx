import { Upload, Icon, message } from 'antd';
import React from 'react'
import ImageService from './imageService'
// @ts-ignore
// import styles from './avatar.less'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function convertImgToBase64(url, callback, outputFormat?: string){
    let canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img,0,0);
      var dataURL = canvas.toDataURL(outputFormat || 'image/png');
      callback.call(this, dataURL);
      canvas = null; 
    };
    img.src = url;
}
   
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export interface IAvatar {
  onChange: (value: any) => void
  action: string
  initImageUrl: string
}
const imageService = new ImageService()
export default class Avatar extends React.Component<IAvatar> {
  state = {
    loading: false,
    imageUrl: '',
  };
  componentDidMount() {
    const {initImageUrl} = this.props
    if (initImageUrl) {
      this.getFullImageUrl(initImageUrl)
    }
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response && info.file.response.result) {
        this.props.onChange(info.file.response.result)
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  getFullImageUrl = async (img) => {
    // const IMAGE_THUMBNAIL_PARAM_ALIOSS = '?x-oss-process=image/resize,m_lfit,h_400,w_400';
    imageService.getFullImageUrl(img).then(imgUrl => {
      if (imgUrl) {
        // thumbnail = imgUrl.split('?')[0] + IMAGE_THUMBNAIL_PARAM_ALIOSS;
        this.setState({
          imageUrl: imgUrl
        })
      }
    })
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state
    return (
      <Upload
        name="file"
        listType="picture-card"
        // className={styles.avatar_uploader}
        showUploadList={false}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}