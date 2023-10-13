import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
import DragDrop from './DragDrop'

import classNames from 'classnames/bind'
import styles from './ImageConfig.module.css'
const cx = classNames.bind(styles)

export default function ImageConfig({ dateStr, onChange }) {
  const { info, setInfo } = useContext(InfoContext)
  const { baseURL, imgPrefix } = info
  const { folderName, jobName, mainImage, imageLength, images } = info.detail
  const prefix = jobName ? `${imgPrefix}${folderName}-${jobName}` : `${imgPrefix}${folderName}`
  console.log(images, imgPrefix, jobName, prefix)

  function createImages() {
    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        images: Array.from({ length: imageLength }).map((_, i) => (i + 1).toString().padStart(2, '0')),
      },
    }))
  }

  return (
    <div>
      <h2>이미지 입력</h2>
      <div className={cx('row')}>
        <div>
          <h3>폴더명</h3>
          <input
            type="text"
            value={folderName}
            onChange={(e) => onChange(e, 'folderName')}
          />
        </div>
        <div>
          <h3>작업명</h3>
          <input
            type="text"
            value={jobName}
            onChange={(e) => onChange(e, 'jobName')}
          />
        </div>
        <div>
          <h3>메인 이미지</h3>
          {folderName && mainImage && <span>{`${baseURL}/page/${dateStr}/${folderName}/${prefix}${mainImage}.jpg`}</span>}

          <input
            type="text"
            value={mainImage}
            onChange={(e) => onChange(e, 'mainImage')}
          />
        </div>
        <div>
          <h3>본문 이미지 개수</h3>
          <input
            type="number"
            value={imageLength}
            onChange={(e) => onChange(e, 'imageLength')}
          />
          {folderName && mainImage && imageLength > 0 && <button onClick={createImages}>이미지 목록 생성</button>}
        </div>
      </div>
      {images.length > 0 && <DragDrop dateStr={dateStr} />}
    </div>
  )
}
