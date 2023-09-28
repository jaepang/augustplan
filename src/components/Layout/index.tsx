import { useContext, useState, useEffect, FormEvent } from 'react'
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
  const { presets } = mockPresets
  const { excelColumns } = mockPresets
  const presetNames = Object.keys(presets)
  const columns = excelColumns[preset['type']]
  console.log(preset, columns)

  useEffect(() => {
    if (presets) {
      setPreset(presets[presetOption])
    }
  }, [presets, presetOption])

  function selectOnChange(e: FormEvent<HTMLSelectElement>) {
    setPresetOption(e.currentTarget.value)
    setInfo((prev) => ({
      ...prev,
      type: preset['type'],
    }))
  }

  return (
    <div className={cx('root')}>
      <div className={cx('col', 'setting')}>
        <select
          value={presetOption}
          onChange={selectOnChange}
        >
          {presetNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <ExcelInput />
      </div>
      <div className={cx('col', 'preview')}>{<DetailSource />}</div>
    </div>
  )
}
