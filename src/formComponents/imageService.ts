import axios from 'axios'
const SERVICE_ENDPOINT = '/services/'
export const URL_GET_PICTURE_URL = SERVICE_ENDPOINT + 'fileDownload?returnType=url'
export const ALIYUN_OSS_URL = '.oss-cn-beijing.aliyuncs.com'
export const ALIYUN_OSS_HW_PARAMS = '?x-oss-process'

export default class ImageService {
  public show = (img, onComplete = (imgUrl) => {}) => {
    if (img.indexOf(ALIYUN_OSS_URL) > -1) {
      if (img.indexOf(ALIYUN_OSS_HW_PARAMS) > -1) {
        let imgUrl = img.substring(0, img.indexOf(ALIYUN_OSS_HW_PARAMS))
        onComplete(imgUrl)
      } else {
        onComplete(img)
      }
    } else {
      axios({
        method: 'get',
        url: URL_GET_PICTURE_URL + '&filePath=' + img,
        responseType: 'text',
      }).then((res) => {
        onComplete(res)
      })
    }
  }
  public getFullImageUrl = (img: string) => {
    return new Promise((resolve) => {
      this.show(img, (imgUrl) => {
        if (imgUrl) {
          resolve(imgUrl)
        }
      })
    })
  }
}
