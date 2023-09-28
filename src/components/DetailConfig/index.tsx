import { useContext, useState } from 'react'
import { InfoContext } from '../InfoProvider'

export default function DetailConfig() {
  const { info, setInfo } = useContext(InfoContext)
  const { type } = info

  function onChange(e, value) {
    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [value]: e.currentTarget.value,
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
              comment: e.currentTarget.value,
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
        <h1>상세 설명 입력</h1>
        <textarea
          value={info[type].comment}
          onChange={(e) => onChange(e, 'comment')}
          cols={30}
          rows={10}
        />
      </div>
      <div>
        <h1>패브릭 입력</h1>
        <h2>{info[type].fabric}의 혼용률로</h2>
        <textarea
          value={info[type].fabricComment}
          onChange={(e) => onChange(e, 'fabricComment')}
          cols={30}
          rows={10}
        />
      </div>
      <div>
        <h1>컬러 입력</h1>
        {info[type].colors.map((color, idx) => (
          <div key={color.name}>
            <input
              type="text"
              value={color.comment}
              placeholder={`${color.name} 코멘트`}
              onChange={(e) => onColorCommentChange(e, idx)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
