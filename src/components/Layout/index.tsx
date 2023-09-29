import { useContext, useState, useEffect } from 'react'
import mockPresets from '@shared/presets-mock.json'

import { InfoContext } from '../InfoProvider'
import DetailSource from '../DetailSource'
import ExcelInput from '../ExcelInput'

import classNames from 'classnames/bind'
import styles from './Layout.module.css'
const cx = classNames.bind(styles)

export default function Layout() {
  const [preset, setPreset] = useState({})
  const [presetOption, setPresetOption] = useState<string>('augustplan')
  const { info, setInfo } = useContext(InfoContext)
  const { presets, excelColumns, categories } = mockPresets
  const presetNames = Object.keys(presets)
  const columns = excelColumns[preset['type']]

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

  useEffect(() => {
    console.log(info)
  }, [info])

  return (
    <div className={cx('root')}>
      <div className={cx('col', 'setting')}>
        <select
          value={presetOption}
          onChange={presetOnChange}
        >
          {presetNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          id="category"
          value={info.category}
          onChange={categoryOnChange}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <ExcelInput />
      </div>
      <div className={cx('col', 'preview')}>{<DetailSource />}</div>
    </div>
  )
}
