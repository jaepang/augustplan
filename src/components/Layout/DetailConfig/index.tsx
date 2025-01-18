import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
import ImageConfig from './ImagesConfig'

export default function DetailConfig() {
  const { info, setInfo } = useContext(InfoContext)
  const { type } = info
  const { type: detailType, size, colors, fittingColor, fittingSize, comment, fabric, fabricComment } = info.detail
  const sizes = size?.map((size) => size.name.slice(0, size.name.indexOf('(')))

  function onChange(e, option) {
    const isComment = option === 'comment'
    const newValue = isComment ? e.target.value.replace(/\n*"\n*/g, '') : e.target.value

    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [option]: newValue,
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
        <h3>간략 노출 여부</h3>
        <input
          id="type"
          type="checkbox"
          checked={detailType === 'simple'}
          value={detailType}
          onChange={(e) => setInfo(prev => ({ ...prev, detail: { ...prev.detail, type: e.target.checked ? 'simple' : 'detail' } }))}
        />
        <h2 style={{ marginBottom: 0 }}>피팅 정보 입력</h2>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <h3>컬러</h3>
            {colors?.map(({ name }) => (
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
      <ImageConfig onChange={onChange} />
      <div>
        <h2>상세 설명 입력</h2>
        <textarea
          value={comment}
          onChange={(e) => onChange(e, 'comment')}
          cols={30}
          rows={10}
          style={{ width: 'calc(100% - 16px)', resize: 'none' }}
        />
      </div>
      {detailType === 'detail' &&
        <>
          <div>
            <h2>패브릭 입력</h2>
            {fabric ? (
              <>
                <h2>{fabric}의 혼용률로</h2>
                <textarea
                  value={fabricComment}
                  onChange={(e) => onChange(e, 'fabricComment')}
                  cols={30}
                  rows={1}
                  style={{ width: 'calc(100% - 16px)', resize: 'none' }}
                />
              </>
            ) : (
              <div>입력된 패브릭이 존재하지 않습니다. 엑셀 시트를 입력해주세요.</div>
            )}
          </div>
          <div>
            <h2>컬러 입력</h2>
            {colors?.length > 0 ? (
              colors.map((color, idx) => (
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
      }
    </>
  )
}
