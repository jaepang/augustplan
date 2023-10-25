import { useContext, useState, useEffect } from 'react'
import { config } from '@shared/consts'

import { InfoContext } from '@components/InfoProvider'
import BaseConfig from './BaseConfig'
import ExcelInput from './ExcelInput'
import SimpleConfig from './SimpleConfig'
import DetailConfig from './DetailConfig'
import SimpleSource from './SimpleSource'
import DetailSource from './DetailSource'

import classNames from 'classnames/bind'
import styles from './Layout.module.css'

const cx = classNames.bind(styles)

export default function Layout() {
  const [preset, setPreset] = useState({})
  const [presetOption, setPresetOption] = useState<string>('augustplan')
  const { info, setInfo } = useContext(InfoContext)
  const { date, dateStr, type, category, setProduct } = info
  const { presets, categories } = config
  const { models } = (preset as any) || {}
  const presetNames = Object.keys(presets)
  const isCategorySet = category === '세트'

  useEffect(() => {
    if (presets) {
      const nxtPreset = presets?.[presetOption]
      const type = nxtPreset?.type

      setPreset(nxtPreset)
      setInfo((prev) => ({
        ...prev,
        type,
        preset: nxtPreset?.name,
        baseURL: nxtPreset.imgBaseUrl || '',
        imgPrefix: nxtPreset.imgPrefix,

        [type]: {
          ...prev[type],
          model: nxtPreset?.models?.[0] || {},
        },
      }))
    }
  }, [presetOption])

  useEffect(() => {
    if (isCategorySet && !setProduct) {
      setInfo((prev) => ({
        ...prev,
        setProduct: {
          category: ['상의/아우터', '바지'],
        },
      }))
    }
  }, [isCategorySet])

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      dateStr: date.replace(/-/g, '').slice(2),
    }))
  }, [date])

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

  function onSetProductCategoryChange(e, index) {
    if (e?.target?.value) {
      setInfo((prev) => ({
        ...prev,
        setProduct: {
          ...prev.setProduct,
          category: prev.setProduct.category.map((c, i) => (i === index ? e.target.value : c)),
        },
      }))
    }
  }

  function onModelChange(e) {
    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        model: models.find((model) => model.code === e.target.value) || {},
      },
    }))
  }

  function downloadAsHTML() {
    const pageHTML = document.querySelector('#page').outerHTML
    const blob = new Blob([pageHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const tempEl = document.createElement('a')
    document.body.appendChild(tempEl)
    tempEl.href = url
    const downloadCategory = category === '상의/아우터' ? '상의' : category
    tempEl.download = `${dateStr}_${info[type].folderName}_${downloadCategory}.html`
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
          <BaseConfig />
        </div>
        {isCategorySet ? (
          <>
            <div>
              <h2>세트 1 엑셀 시트 붙여넣기</h2>
              <select
                value={setProduct?.category?.[0]}
                onChange={(e) => onSetProductCategoryChange(e, 0)}
              >
                {categories
                  .filter((c) => c !== '세트')
                  .map((category) => (
                    <option key={category}>{category}</option>
                  ))}
              </select>
              <ExcelInput />
            </div>
            <div>
              <h2>세트 2 엑셀 시트 붙여넣기</h2>
              <select
                value={setProduct?.category?.[1]}
                onChange={(e) => onSetProductCategoryChange(e, 1)}
              >
                {categories
                  .filter((c) => c !== '세트')
                  .map((category) => (
                    <option key={category}>{category}</option>
                  ))}
              </select>
              <ExcelInput setProduct />
            </div>
          </>
        ) : (
          <div>
            <h2>엑셀 시트 붙여넣기</h2>
            <ExcelInput />
          </div>
        )}
        <div>
          <h2>모델</h2>
          {models?.length > 0 && (
            <select
              value={info[type]?.model?.code}
              onChange={onModelChange}
            >
              {models.map((model) => (
                <option
                  value={model.code}
                  key={model.code}
                >
                  {model.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          {preset['type'] === 'detail' && <DetailConfig />}
          {preset['type'] === 'simple' && <SimpleConfig />}
        </div>
      </div>
      <div className={cx('col', 'preview')}>
        <button
          className={cx('download')}
          onClick={downloadAsHTML}
        >
          download
        </button>
        <div className={cx('container')}>{type === 'detail' ? <DetailSource /> : <SimpleSource />}</div>
      </div>
    </div>
  )
}
