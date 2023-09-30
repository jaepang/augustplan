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
  const { info, setInfo } = useContext(InfoContext)
  const { presets, categories } = mockPresets
  const presetNames = Object.keys(presets)

  useEffect(() => {
    if (presets) {
      setPreset(presets[presetOption])
    }
  }, [presets, presetOption])

  function presetOnChange(e) {
    if (e?.target?.value) {
      setPresetOption(e.target.value)
      setInfo((prev) => ({
        ...prev,
        type: presets[e.target.value]['type'],
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

  return (
    <div className={cx('root')}>
      <div className={cx('col', 'setting')}>
        <div className={cx('row')}>
          <h2>프리셋 설정</h2>
          <select
            value={presetOption}
            onChange={presetOnChange}
          >
            {presetNames.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className={cx('row')}>
          <h2>상품 카테고리 설정</h2>
          <select
            id="category"
            value={info.category}
            onChange={categoryOnChange}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className={cx('row')}>
          <h2>엑셀 시트 붙여넣기</h2>
          <ExcelInput />
        </div>
        {preset['type'] === 'detail' && <DetailConfig />}
      </div>
      <div className={cx('col', 'preview')}>{<DetailSource />}</div>
    </div>
  )
}
