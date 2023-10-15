import { useContext, useState, useEffect } from 'react'
import { InfoContext } from '@components/InfoProvider'
import DragDrop from './DragDrop'

import classNames from 'classnames/bind'
import styles from './ImageConfig.module.css'
const cx = classNames.bind(styles)

export default function ImageConfig({ dateStr, onChange }) {
  const { info, setInfo } = useContext(InfoContext)
  const [additionalAdded, setAdditionalAdded] = useState(false)
  const [includeDate, setIncludeDate] = useState(true)
  const [additionalImage, setAdditionalImage] = useState({
    date: new Date().toISOString().slice(0, 10),
    dateStr: '',
    folderName: '',
    jobName: '',
    fileName: '',
  })
  const { baseURL, imgPrefix } = info
  const { folderName, jobName, mainImage, imageLength, images } = info.detail
  const prefix = jobName ? `${imgPrefix}${folderName}-${jobName}` : `${imgPrefix}${folderName}`

  const additionalPrefix = additionalImage.jobName
    ? `${imgPrefix}${additionalImage.folderName}-${additionalImage.jobName}`
    : `${imgPrefix}${additionalImage.folderName}`
  const additionalImageFilename = `${includeDate ? dateStr : additionalImage.dateStr}/${additionalImage.folderName}/${additionalPrefix}${
    additionalImage.fileName
  }`
  console.log(images, imgPrefix, jobName, prefix)

  useEffect(() => {
    setAdditionalImage((prev) => ({
      ...prev,
      dateStr: additionalImage.date.replace(/-/g, '').slice(2),
    }))
  }, [additionalImage.date])

  function createImages() {
    if (additionalAdded && !confirm('수동으로 추가한 이미지가 있습니다. 추가 이미지를 삭제하고 자동 생성하시겠습니까?')) return
    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        images: Array.from({ length: imageLength }).map(
          (_, i) => `${baseURL}/page/${dateStr}/${folderName}/${prefix}_${(i + 1).toString().padStart(2, '0')}.jpg`,
        ),
      },
    }))
  }

  function setAdditionalImageInput(e, target) {
    setAdditionalImage((prev) => ({
      ...prev,
      [target]: e.target.value,
    }))
  }

  function addAdditionalImage() {
    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        images: [...prev.detail.images, `${baseURL}/page/${additionalImageFilename}.jpg`],
      },
    }))
    setAdditionalImage({
      date: new Date().toISOString().slice(0, 10),
      dateStr: '',
      folderName: '',
      jobName: '',
      fileName: '',
    })
    setAdditionalAdded(true)
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
          {folderName && mainImage && imageLength > 0 && <button onClick={createImages}>이미지 목록 자동 생성</button>}
        </div>
      </div>
      <div className={cx('additional-img')}>
        <h3>추가 이미지 수동 입력</h3>

        <label
          className={cx('checkbox')}
          htmlFor="includeDate"
        >
          <input
            id="includeDate"
            type="checkbox"
            checked={includeDate}
            onChange={() => setIncludeDate(!includeDate)}
          />
          동일 날짜
        </label>
        {(dateStr || additionalImage.dateStr) && additionalImage.fileName && additionalImage.folderName && (
          <span>{`${baseURL}/page/${additionalImageFilename}.jpg`}</span>
        )}
        <div className={cx('row', 'additional')}>
          {!includeDate && (
            <div>
              <h4>날짜</h4>
              <input
                type="date"
                value={additionalImage.date}
                onChange={(e) => setAdditionalImageInput(e, 'date')}
              />
            </div>
          )}
          <div>
            <h4>폴더명</h4>
            <input
              type="text"
              value={additionalImage.folderName}
              onChange={(e) => setAdditionalImageInput(e, 'folderName')}
            />
          </div>
          <div>
            <h4>작업명</h4>
            <input
              type="text"
              value={additionalImage.jobName}
              onChange={(e) => setAdditionalImageInput(e, 'jobName')}
            />
          </div>
          <div>
            <h4>파일명</h4>
            <input
              type="text"
              value={additionalImage.fileName}
              onChange={(e) => setAdditionalImageInput(e, 'fileName')}
            />
          </div>
          {(dateStr || additionalImage.dateStr) && additionalImage.fileName && additionalImage.folderName && <button onClick={addAdditionalImage}>추가</button>}
        </div>
      </div>
      {images.length > 0 && <DragDrop dateStr={dateStr} />}
    </div>
  )
}
