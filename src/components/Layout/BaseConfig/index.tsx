import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'

import mockPresets from '@shared/presets-mock.json'

export default function BaseConfig({ downloadOption, onDownloadOptionChange }) {
  const { info, setInfo } = useContext(InfoContext)
  const { presets, categories } = mockPresets

  function categoryOnChange(e) {
    if (e?.target?.value) {
      setInfo((prev) => ({
        ...prev,
        category: e.target.value,
      }))
    }
  }

  function cautionCommentOnChange(e) {
    let cautionComment: 'none' | 'knit' | 'coat' = 'none'
    if (e.target.checked) {
      if (e.target.id === 'knit') {
        cautionComment = 'knit'
      } else if (e.target.id === 'coat') {
        cautionComment = 'coat'
      }
    }
    setInfo((prev) => ({ ...prev, [info.type]: { ...prev[info.type], cautionComment } }))
  }

  return (
    <>
      <div>
        <h2>상품 카테고리</h2>
        <select
          value={info.category}
          onChange={categoryOnChange}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <label htmlFor="knit">
          <input
            id="knit"
            type="checkbox"
            checked={info[info.type].cautionComment === 'knit'}
            onChange={cautionCommentOnChange}
          />
          니트 코멘트 추가
        </label>
        <label htmlFor="coat">
          <input
            id="coat"
            type="checkbox"
            checked={info[info.type].cautionComment === 'coat'}
            onChange={cautionCommentOnChange}
          />
          코트 코멘트 추가
        </label>
      </div>
      <div>
        <h2>날짜</h2>
        <input
          type="date"
          value={downloadOption.date}
          onChange={(e) => onDownloadOptionChange(e, 'date')}
        />
      </div>
      <div>
        <h2>착장 번호</h2>
        <input
          type="text"
          value={downloadOption.title}
          onChange={(e) => onDownloadOptionChange(e, 'title')}
        />
      </div>
    </>
  )
}
