import { useContext, useState, useEffect } from 'react'
import { InfoContext } from '@components/InfoProvider'

import classNames from 'classnames/bind'
import styles from '../DetailConfig/ImagesConfig/ImageConfig.module.css'
import DragDrop from '../DragDrop'
const cx = classNames.bind(styles)

export default function SimpleConfig() {
  const { info, setInfo } = useContext(InfoContext)
  const { date, dateStr, baseURL, simple } = info
  const { colors: colorsString, fittingColor, fittingSize, size, imageLength, folderName, jobName } = simple
  const colors = colorsString?.split(',')
  const sizes = size?.map((size) => (size.name.includes('(') ? size.name.slice(0, size.name.indexOf('(')) : size.name))
  const showFitting = colors?.length > 0 && sizes?.length > 0

  const [additionalAdded, setAdditionalAdded] = useState(false)
  const [includeDate, setIncludeDate] = useState(true)
  const [additionalImage, setAdditionalImage] = useState({
    date,
    dateStr: '',
    folderName: '',
    fileName: '',
  })

  const additionalImageFilename = `${includeDate ? dateStr : additionalImage.dateStr}/${additionalImage.folderName}/${additionalImage.fileName}`

  useEffect(() => {
    if (baseURL && dateStr && folderName && jobName && imageLength > 0) {
      setInfo(prev => ({
        ...prev,
        simple: {
          ...prev.simple,
          images: Array.from({ length: imageLength }, (_, i) => i + 2).map((i) => (
            `${baseURL}/page/${dateStr}/${folderName}/h${folderName}-${jobName}_${i.toString().padStart(2, '0')}.jpg`
          ))
        }
      }))
    }
  }, [folderName, jobName, imageLength])
  useEffect(() => {
    setAdditionalImage((prev) => ({
      ...prev,
      dateStr: additionalImage.date.replace(/-/g, '').slice(2),
    }))
  }, [additionalImage.date])

  function onFittingChange(e, target) {
    const newSet = info.simple[target]
    if (e.target.checked) {
      newSet.add(e.target.value)
    } else {
      newSet.delete(e.target.value)
    }

    setInfo((prev) => ({
      ...prev,
      simple: {
        ...prev.simple,
        [target]: newSet,
      },
    }))
  }

  function onChange(e, value) {
    setInfo((prev) => ({
      ...prev,
      simple: {
        ...prev.simple,
        [value]: e.target.value,
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
      simple: {
        ...prev.simple,
        images: [...prev.simple.images, `${baseURL}/page/${additionalImageFilename}.jpg`],
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
    <>
      <div>
        <h2>폴더명</h2>
        <input
          type="text"
          value={info.simple.folderName}
          onChange={(e) => onChange(e, 'folderName')}
        />
      </div>
      <div>
        <h2>작업 번호</h2>
        <input
          type="text"
          value={info.simple.jobName}
          onChange={(e) => onChange(e, 'jobName')}
        />
      </div>
      <div>
        <h2>이미지 개수</h2>
        <input
          type="number"
          value={info.simple.imageLength}
          onChange={(e) => onChange(e, 'imageLength')}
        />
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
      <DragDrop scope="simple" />
      {showFitting && (
        <div>
          <h2 style={{ marginBottom: 0 }}>피팅 정보 입력</h2>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <h3>컬러</h3>
              {colors?.map((name) => (
                <div key={name}>
                  <input
                    id={name}
                    type="checkbox"
                    checked={fittingColor.has(name)}
                    value={name}
                    onChange={(e) => onFittingChange(e, 'fittingColor')}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              ))}
            </div>
            <div>
              <h3>사이즈</h3>
              {sizes?.map((size) => (
                <div key={size}>
                  <input
                    id={size}
                    type="checkbox"
                    checked={fittingSize.has(size)}
                    value={size}
                    onChange={(e) => onFittingChange(e, 'fittingSize')}
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
