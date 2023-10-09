import { useContext, useState, useEffect } from 'react'
import mockPresets from '@shared/presets-mock.json'

import { InfoContext } from '../InfoProvider'
import BaseConfig from './BaseConfig'
import ExcelInput from '../ExcelInput'
import DetailSource from '../DetailSource'
import DetailConfig from '../DetailConfig'
import ImageSelect from '../ImageSelect'

import classNames from 'classnames/bind'
import styles from './Layout.module.css'
import SimpleSource from '../SimpleSource'
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
  const isCategorySet = info.category === '세트'
  console.log(info.setProduct)
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

  useEffect(() => {
    if (isCategorySet && !info.setProduct) {
      setInfo((prev) => ({
        ...prev,
        setProduct: {
          category: ['상의/아우터', '바지'],
        },
      }))
    }
  }, [isCategorySet])

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

  function onDownloadOptionChange(e, option) {
    if (e?.target?.value) {
      setDownloadOption((prev) => ({
        ...prev,
        [option]: e.target.value,
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
          <BaseConfig
            downloadOption={downloadOption}
            onDownloadOptionChange={onDownloadOptionChange}
          />
        </div>
        {isCategorySet ? (
          <>
            <div>
              <h2>세트 1 엑셀 시트 붙여넣기</h2>
              <select
                value={info.setProduct?.category?.[0]}
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
                value={info.setProduct?.category?.[1]}
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

        {/*<div>
          <h2>이미지</h2>
          <ImageSelect date={downloadOption.date} />
        </div>*/}
        <div>{preset['type'] === 'detail' && <DetailConfig />}</div>
      </div>
      <div className={cx('col', 'preview')}>
        <button
          className={cx('download')}
          onClick={downloadAsHTML}
        >
          download
        </button>
        <div className={cx('container')}>{preset['type'] === 'detail' ? <DetailSource /> : <SimpleSource />}</div>
      </div>
    </div>
  )
}
