import { useContext, useState, useEffect } from 'react'
import { InfoContext } from '@components/InfoProvider'
import DragDrop from './DragDrop'

import classNames from 'classnames/bind'
import styles from './ImageConfig.module.css'
const cx = classNames.bind(styles)

export default function ImageConfig({ onChange }) {
  const { info, setInfo } = useContext(InfoContext)
  const { baseURL, imgPrefix, date, dateStr } = info
  const { folderName, jobName, titleImage, modelImages } = info.detail
  
  const [imageLength, setImageLength] = useState({
    detail: 6,
    model: 0,
  })
  const [additionalAdded, setAdditionalAdded] = useState(false)
  const [includeDate, setIncludeDate] = useState(true)
  const [additionalImage, setAdditionalImage] = useState({
    date,
    dateStr: '',
    folderName: '',
    fileName: '',
  })

  const defaultPrefix = `${imgPrefix}${folderName}`
  const prefix = jobName ? `${defaultPrefix}-${jobName}` : defaultPrefix

  const additionalImageFilename = `${includeDate ? dateStr : additionalImage.dateStr}/${additionalImage.folderName}/${
    additionalImage.fileName
  }`

  useEffect(() => {
    setAdditionalImage((prev) => ({
      ...prev,
      dateStr: additionalImage.date.replace(/-/g, '').slice(2),
    }))
  }, [additionalImage.date])

  useEffect(() => {
    if(folderName && jobName)
      setInfo((prev) => ({
        ...prev,
        detail: {
          ...prev.detail,
          titleImage: `${baseURL}/page/${dateStr}/${folderName}/${prefix}m.jpg`,
          colorImage: `${baseURL}/page/${dateStr}/${folderName}/${prefix}_01.jpg`,
          fabricImages: [prev.detail.fabricImages[0], `${baseURL}/page/${dateStr}/${folderName}/${prefix}f.jpg`],
        },
      }))
  }, [dateStr, folderName, jobName])

  function createImages() {
    if (additionalAdded && !confirm('수동으로 추가한 이미지가 있습니다. 추가 이미지를 삭제하고 자동 생성하시겠습니까?')) return
    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        fabricImages: [`${baseURL}/page/${dateStr}/${folderName}/${prefix}_${(imageLength.detail).toString().padStart(2, '0')}.jpg`, prev.detail.fabricImages[1]],
        detailImages: Array.from({ length: imageLength.detail - 2 }).map(
          (_, i) => `${baseURL}/page/${dateStr}/${folderName}/${prefix}_${(i + 2).toString().padStart(2, '0')}.jpg`,
        ),
        modelImages: [
          ...Array.from({ length: imageLength.model }).map(
            (_, i) => `${baseURL}/page/${dateStr}/${folderName}/${defaultPrefix}_${(i + 1).toString().padStart(2, '0')}.jpg`,
          ),
          `${baseURL}/page/${dateStr}/cut.jpg`,
        ],
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
        modelImages: [...prev.detail.modelImages, `${baseURL}/page/${additionalImageFilename}.jpg`],
      },
    }))
    setAdditionalAdded(true)
  }

  function clearAdditionalImage() {
    setAdditionalImage({
      date,
      dateStr: '',
      folderName: '',
      fileName: '',
    })
  }

  return (
    <div>
      <h2>이미지 입력</h2>
      <p>타이틀 이미지: {titleImage}</p>
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
          <h3>본문 이미지 개수</h3>
          <div>
            <h4>디테일</h4>
            <input
              type="number"
              value={imageLength.detail}
              onChange={(e) => setImageLength((prev) => ({ ...prev, detail: parseInt(e.target.value) }))}
            />
          </div>
          <div>
            <h4>모델</h4>
            <input
              type="number"
              value={imageLength.model}
              onChange={(e) => setImageLength((prev) => ({ ...prev, model: parseInt(e.target.value) }))}
            />
          </div>
        </div>
      </div>
      {folderName && titleImage && (imageLength.detail > 0 || imageLength.model > 0) && (
        <button
          className={cx('create-img-btn')}
          onClick={createImages}
        >
          이미지 목록 자동 생성
        </button>
      )}
      {modelImages.length > 0 && <DragDrop />}
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
            <h4>파일명</h4>
            <input
              type="text"
              value={additionalImage.fileName}
              onChange={(e) => setAdditionalImageInput(e, 'fileName')}
            />
          </div>
          <button
            disabled={!((dateStr || additionalImage.dateStr) && additionalImage.fileName && additionalImage.folderName)}
            onClick={addAdditionalImage}
          >
            추가
          </button>
          <button onClick={clearAdditionalImage}>초기화</button>
        </div>
      </div>
    </div>
  )
}
