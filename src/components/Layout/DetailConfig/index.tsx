import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'

import classNames from 'classnames/bind'
import styles from './DetailConfig.module.css'
const cx = classNames.bind(styles)

export default function DetailConfig({ date }) {
  const { info, setInfo } = useContext(InfoContext)
  const { type } = info
  const { size, colors } = info.detail
  const sizes = size?.map((size) => size.name.slice(0, size.name.indexOf('(')))
  const dateStr = date.replace(/-/g, '').slice(2)

  function onChange(e, value) {
    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [value]: e.target.value,
      },
    }))
  }

  function onFittingChange(e, target) {
    const newSet = info.detail[target]
    if (e.target.checked) {
      newSet.add(e.target.value)
    } else {
      newSet.delete(e.target.value)
    }

    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [target]: newSet,
      },
    }))
  }

  function onColorCommentChange(e, idx) {
    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        colors: prev.detail.colors.map((color, i) => {
          if (i === idx) {
            return {
              ...color,
              comment: e.target.value,
            }
          }
          return color
        }),
      },
    }))
  }

  return (
    <>
      <div>
        <h2 style={{ marginBottom: 0 }}>피팅 정보 입력</h2>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <h3>컬러</h3>
            {colors?.map(({ name }) => (
              <div key={name}>
                <input
                  id={name}
                  type="checkbox"
                  checked={info.detail.fittingColor.has(name)}
                  value={name}
                  onChange={(e) => onFittingChange(e, 'fittingColor')}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
          </div>
          <div>
            <h3>사이즈</h3>
            {sizes.map((size) => (
              <div key={size}>
                <input
                  id={size}
                  type="checkbox"
                  checked={info.detail.fittingSize.has(size)}
                  value={size}
                  onChange={(e) => onFittingChange(e, 'fittingSize')}
                />
                <label htmlFor={size}>{size}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2>이미지 입력</h2>
        <div className={cx('row')}>
          <div>
            <h3>폴더명</h3>
            <input
              type="text"
              value={info.detail.folderName}
              onChange={(e) => onChange(e, 'folderName')}
            />
          </div>
          <div>
            <h3>
              메인 이미지
              {info.detail.folderName && info.detail.mainImage && ` (${info.baseURL}/page/${dateStr}/${info.detail.folderName}/${info.detail.mainImage})`}
            </h3>

            <input
              type="text"
              value={info.detail.mainImage}
              onChange={(e) => onChange(e, 'mainImage')}
            />
          </div>
        </div>
      </div>
      <div>
        <h2>상세 설명 입력</h2>
        <textarea
          value={info.detail.comment}
          onChange={(e) => onChange(e, 'comment')}
          cols={30}
          rows={10}
          style={{ width: 'calc(100% - 16px)', resize: 'none' }}
        />
      </div>
      <div>
        <h2>패브릭 입력</h2>
        {info.detail.fabric ? (
          <>
            <h2>{info.detail.fabric}의 혼용률로</h2>
            <textarea
              value={info.detail.fabricComment}
              onChange={(e) => onChange(e, 'fabricComment')}
              cols={30}
              rows={10}
              style={{ width: 'calc(100% - 16px)', resize: 'none' }}
            />
          </>
        ) : (
          <div>입력된 패브릭이 존재하지 않습니다. 엑셀 시트를 입력해주세요.</div>
        )}
      </div>
      <div>
        <h2>컬러 입력</h2>
        {info.detail.colors?.length > 0 ? (
          info.detail.colors.map((color, idx) => (
            <div key={color.name}>
              <input
                type="text"
                value={color.comment}
                placeholder={`${color.name} 코멘트`}
                onChange={(e) => onColorCommentChange(e, idx)}
              />
              <strong>#{color.name}</strong>
            </div>
          ))
        ) : (
          <div>입력된 컬러가 존재하지 않습니다. 엑셀 시트를 입력해주세요.</div>
        )}
      </div>
    </>
  )
}
