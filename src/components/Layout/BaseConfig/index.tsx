import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
import { config } from '@shared/consts'

export default function BaseConfig() {
  const { info, setInfo } = useContext(InfoContext)
  const { date, type } = info
  const { categories } = config

  function onInfoBaseChange(e, option) {
    if (e?.target?.value) {
      setInfo((prev) => ({
        ...prev,
        [option]: e.target.value,
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

  function onFolderNameChange(e) {
    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        folderName: e.target.value,
      },
    }))
  }

  return (
    <>
      <div>
        <h2>상품 카테고리</h2>
        <select
          value={info.category}
          onChange={(e) => onInfoBaseChange(e, 'category')}
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
          value={date}
          onChange={(e) => onInfoBaseChange(e, 'date')}
        />
      </div>
      <div>
        <h2>착장 번호</h2>
        <input
          type="text"
          value={info[info.type].folderName}
          onChange={onFolderNameChange}
        />
      </div>
    </>
  )
}
