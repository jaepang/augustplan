import { useContext, useState, useEffect, FormEvent } from 'react'
import { InfoContext } from '../../InfoProvider'

import InfoEditableTable from './InfoEditableTable'
import { config } from '@shared/consts'

function parseExcel(excel: string, columns: string[]) {
  console.log(columns)
  const items = excel.split(/\t|\n/g)
  console.log(items)
  return items.reduce((acc, cur, idx) => {
    if (cur !== '' && idx >= columns.length) {
      // console.log('new row', idx, cur, columns[idx % columns.length])
      const prev = acc?.[columns[idx % columns.length]]
      if (prev) acc[columns[idx % columns.length]] = typeof prev === 'string' ? [prev, cur] : [...prev, cur]
    } else if (columns?.[idx]) {
      acc[columns[idx]] = cur
    }
    return acc
  }, {})
}

export function excelToInfo(type, category, excelData) {
  const specType = category === '상의/아우터' || category === '원피스' ? 'top' : 'bottom'
  const sizeLength = excelData?.['사이즈(추천사이즈)']?.split(',')?.length ?? 0
  return {
    made: excelData?.['원산지'],
    colors: type === 'simple' ? excelData?.['컬러'] : excelData?.['컬러']?.split(',')?.map((color) => ({ name: color ?? '', comment: '' })),
    fabric: excelData?.['소재(%)'],
    size: excelData?.['사이즈(추천사이즈)']?.split(',')?.map((size, idx) => ({
      name: size ?? '',
      spec:
        specType === 'top'
          ? [
              sizeLength < 2 ? excelData?.['어깨'] ?? '' : excelData?.['어깨']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['가슴'] ?? '' : excelData?.['가슴']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['소매길이'] ?? '' : excelData?.['소매길이']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['암홀'] ?? '' : excelData?.['암홀']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['팔통'] ?? '' : excelData?.['팔통']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['밑단'] ?? '' : excelData?.['밑단']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['총기장'] ?? '' : excelData?.['총기장']?.[idx] ?? '',
            ]
          : [
              sizeLength < 2 ? excelData?.['허리'] ?? '' : excelData?.['허리']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['힙'] ?? '' : excelData?.['힙']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['허벅지'] ?? '' : excelData?.['허벅지']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['밑위'] ?? '' : excelData?.['밑위']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['밑단'] ?? '' : excelData?.['밑단']?.[idx] ?? '',
              sizeLength < 2 ? excelData?.['총기장'] ?? '' : excelData?.['총기장']?.[idx] ?? '',
            ],
    })),

    '두께감(두꺼움)': excelData?.['두께감(두꺼움)'],
    '두께감(보통)': excelData?.['두께감(보통)'],
    '두께감(얇음)': excelData?.['두께감(얇음)'],

    '안감(있음)': excelData?.['안감(있음)'],
    '안감(없음)': excelData?.['안감(없음)'],
    '안감(부분/기모)': excelData?.['안감(부분/기모안감)'],

    '신축성(없음)': excelData?.['신축성(없음)'],
    '신축성(있음)': excelData?.['신축성(있음)'],
    '신축성(약간있음)': excelData?.['신축성(약간있음)'],

    '비침(있음)': excelData?.['비침(있음)'],
    '비침(없음)': excelData?.['비침(없음)'],
    '비침(약간있음)': excelData?.['비침(약간있음)'],

    comment_1: excelData?.['comment_1'],
    comment_2: excelData?.['comment_2'],
    comment_3: excelData?.['comment_3'],
  }
}

export default function ExcelInput({ setProduct = false }) {
  const [excel, setExcel] = useState<string>('')
  const [excelData, setExcelData] = useState<any>(null)
  const { info, setInfo } = useContext(InfoContext)
  const { type, category } = info
  const { excelColumns } = config
  const parseCategory = category !== '세트' ? category : !setProduct ? info.setProduct?.category?.[0] : info.setProduct?.category?.[1]
  const columnCategory = parseCategory === '바지' || parseCategory === '치마' ? 'bottom' : 'top'
  const columns = excelColumns[type][columnCategory]

  useEffect(() => {
    setExcel('')
  }, [info.preset])

  useEffect(() => {
    if (excelData) {
      try {
        if (setProduct) {
          setInfo((prev) => ({
            ...prev,
            setProduct: {
              ...prev.setProduct,
              ...excelToInfo(type, parseCategory, excelData),
            },
          }))
        } else {
          setInfo((prev) => ({
            ...prev,
            [type]: {
              ...prev[type],
              ...excelToInfo(type, parseCategory, excelData),
            },
          }))
        }
      } catch (e) {
        alert('엑셀 형식이 잘못되었습니다. 다시 시도해주세요.')
        console.log(e)
        setExcel('')
        setExcelData(null)
      }
    }
  }, [excelData])

  useEffect(() => {
    console.log(category, columns)
    if (excel) {
      setExcelData(parseExcel(excel, columns))
    }
  }, [category])

  function onChange(e: FormEvent<HTMLTextAreaElement>) {
    try {
      setExcel(e.currentTarget.value)
      setExcelData(parseExcel(e.currentTarget.value, columns))
    } catch (error) {
      alert('엑셀 형식이 잘못되었습니다. 다시 시도해주세요.')
      console.log(error)
      setExcel('')
      setExcelData(null)
    }
  }

  return (
    <>
      <textarea
        value={excel}
        onChange={onChange}
        cols={30}
        rows={10}
        style={{ width: 'calc(100% - 16px)', resize: 'none' }}
      />
      {excel && (
        <InfoEditableTable
          data={excelData}
          setData={setExcelData}
        />
      )}
    </>
  )
}
