import { useContext, useState, useEffect } from 'react'
import mockPresets from '@shared/presets-mock.json'

import { InfoContext } from '../InfoProvider'
import ExcelInput from '../ExcelInput'
import DetailSource from '../DetailSource'
import DetailConfig from '../DetailConfig'

import classNames from 'classnames/bind'
import styles from './Layout.module.css'
const cx = classNames.bind(styles)

export default function Layout() {
  const [preset, setPreset] = useState({})
  const [presetOption, setPresetOption] = useState<string>('augustplan')
  const [downloadOption, setDownloadOption] = useState({
    date: new Date().toISOString().slice(0, 10),
    title: '',
  })
  const { info, setInfo } = useContext(InfoContext)
  const { presets, categories } = mockPresets
  const presetNames = Object.keys(presets)

  useEffect(() => {
    if (presets) {
      setPreset(presets[presetOption])
      setInfo((prev) => ({
        ...prev,
        type: presets[presetOption]['type'],
        baseURL: presets[presetOption]['imgBaseUrl'] || '',
      }))
    }
  }, [presets, presetOption])

  function presetOnChange(e) {
    if (e?.target?.value) {
      setPresetOption(e.target.value)
      setInfo((prev) => ({
        ...prev,
        type: presets[e.target.value]['type'],
        baseURL: presets[e.target.value]['imageBaseUrl'] || '',
      }))
    }
  }

  function categoryOnChange(e) {
    if (e?.target?.value) {
      setInfo((prev) => ({
        ...prev,
        category: e.target.value,
      }))
    }
  }

  function onDownloadOptionChange(e, option) {
    if (e?.target?.value) {
      setDownloadOption((prev) => ({
        ...prev,
        [option]: e.target.value,
      }))
    }
  }

  function downloadAsHTML() {
    const pageHTML = document.querySelector('#page').outerHTML
    const blob = new Blob([pageHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const tempEl = document.createElement('a')
    document.body.appendChild(tempEl)
    tempEl.href = url
    const downloadCategory = info.category === '상의/아우터' ? '상의' : info.category
    tempEl.download = `${downloadOption.date.replace(/-/gi, '').slice(2)}_${downloadOption.title}_${downloadCategory}.html`
    tempEl.click()
    setTimeout(() => {
      URL.revokeObjectURL(url)
      tempEl.parentNode.removeChild(tempEl)
    }, 2000)
  }

  return (
    <div className={cx('root')}>
      <div className={cx('col', 'setting')}>
        <div className={cx('row')}>
          <div>
            <h2>프리셋</h2>
            <select
              value={presetOption}
              onChange={presetOnChange}
            >
              {presetNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
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
                checked={info.detail.cautionComment === 'knit'}
                onChange={() => setInfo((prev) => ({ ...prev, detail: { ...prev.detail, cautionComment: 'knit' } }))}
              />
              니트 코멘트 추가
            </label>
            <label htmlFor="coat">
              <input
                id="coat"
                type="checkbox"
                checked={info.detail.cautionComment === 'coat'}
                onChange={() => setInfo((prev) => ({ ...prev, detail: { ...prev.detail, cautionComment: 'coat' } }))}
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
        </div>
        <div>
          <div>
            <h2>엑셀 시트 붙여넣기</h2>
            <ExcelInput />
          </div>
        </div>
        <div>{preset['type'] === 'detail' && <DetailConfig />}</div>
      </div>
      <div className={cx('col', 'preview')}>
        <button
          className={cx('download')}
          onClick={downloadAsHTML}
        >
          download
        </button>
        <div className={cx('container')}>{<DetailSource />}</div>
      </div>
    </div>
  )
}
