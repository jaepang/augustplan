import { useContext } from 'react'
import { InfoContext } from '../InfoProvider'

export default function DetailConfig() {
  const { info, setInfo } = useContext(InfoContext)
  const { type } = info

  function onChange(e, value) {
    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [value]: e.target.value,
      },
    }))
  }

  function onColorCommentChange(e, idx) {
    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        colors: prev[type].colors.map((color, i) => {
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
        <h2>상세 설명 입력</h2>
        <textarea
          value={info[type].comment}
          onChange={(e) => onChange(e, 'comment')}
          cols={30}
          rows={10}
          style={{ width: 'calc(100% - 16px)', resize: 'none' }}
        />
      </div>
      <div>
        <h2>패브릭 입력</h2>
        {info[type].fabric ? (
          <>
            <h2>{info[type].fabric}의 혼용률로</h2>
            <textarea
              value={info[type].fabricComment}
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
        {info[type].colors?.length > 0 ? (
          info[type].colors.map((color, idx) => (
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
