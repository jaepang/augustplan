import { useContext, useState, useEffect, FormEvent } from 'react'
import { InfoContext } from '../InfoProvider'

import InfoEditableTable from '../InfoEditableTable'
import mockPresets from '@shared/presets-mock.json'

function parseExcel(excel: string, columns: string[]) {
  const items = excel.split(/\t|\n/g)
  return items.reduce((acc, cur, idx) => {
    if (cur !== '' && idx >= columns.length) {
      // console.log('new row', idx, cur, columns[idx % columns.length])
      const prev = acc?.[columns[idx % columns.length]]
      if (prev) acc[columns[idx % columns.length]] = typeof prev === 'string' ? [prev, cur] : [...prev, cur]
    }
    if (columns?.[idx]) {
      acc[columns[idx]] = cur
    }
    return acc
  }, {})
}

export function excelToInfo(excelData) {
  return {
    made: excelData?.['원산지'],
    colors: excelData?.['컬러']?.split(',')?.map((color) => ({ name: color, comment: '' })),
    fabric: excelData?.['소재(%)'],
    size: excelData?.['사이즈(추천사이즈)']?.split(',').map((size, idx) => ({
      name: size,
      sizes: [
        excelData?.['어깨']?.[idx] ?? '',
        excelData?.['가슴']?.[idx] ?? '',
        excelData?.['소매길이']?.[idx] ?? '',
        excelData?.['암홀']?.[idx] ?? '',
        excelData?.['팔통']?.[idx] ?? '',
        excelData?.['밑단'][idx] ?? '',
        excelData?.['총기장'][idx] ?? '',
      ],
    })),
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
