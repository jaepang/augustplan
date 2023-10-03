import { useContext, useState, useEffect, FormEvent } from 'react'
import { InfoContext } from '../InfoProvider'

import InfoEditableTable from './InfoEditableTable'
import mockPresets from '@shared/presets-mock.json'

function parseExcel(excel: string, columns: string[]) {
  const items = excel.split(/\t|\n/g)
  console.log(items)
  return items.reduce((acc, cur, idx) => {
    if (cur.trim() === '' && idx < columns.length) return acc
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

export function excelToInfo(excelData) {
  console.log(excelData)
  return {
    made: excelData?.['원산지'],
    colors: excelData?.['컬러']?.split(',')?.map((color) => ({ name: color ?? '', comment: '' })),
    fabric: excelData?.['소재(%)'],
    size: excelData?.['사이즈(추천사이즈)']?.split(',')?.map((size, idx) => ({
      name: size ?? '',
      spec: {
        어깨: excelData?.['어깨']?.[idx] ?? '',
        가슴: excelData?.['가슴']?.[idx] ?? '',
        소매길이: excelData?.['소매길이']?.[idx] ?? '',
        암홀: excelData?.['암홀']?.[idx] ?? '',
        팔통: excelData?.['팔통']?.[idx] ?? '',
        밑단: excelData?.['밑단']?.[idx] ?? '',
        총기장: excelData?.['총기장']?.[idx] ?? '',
      },
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
  }
}

export default function ExcelInput() {
  const [excel, setExcel] = useState<string>('')
  const [excelData, setExcelData] = useState<any>(null)
  const { info, setInfo } = useContext(InfoContext)
  const { type } = info
  const { excelColumns } = mockPresets
  const columns = excelColumns[type]

  useEffect(() => {
    if (excelData) {
      try {
        setInfo((prev) => ({
          ...prev,
          [type]: {
            ...prev[type],
            ...excelToInfo(excelData),
          },
        }))
      } catch (e) {
        alert('엑셀 형식이 잘못되었습니다. 다시 시도해주세요.')
        console.log(e)
        setExcel('')
        setExcelData(null)
      }
    }
  }, [excelData])

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
