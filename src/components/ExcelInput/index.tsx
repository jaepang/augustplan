import { useContext, useState, useEffect, FormEvent } from 'react'
import { InfoContext } from '../InfoProvider'
import mockPresets from '@shared/presets-mock.json'

function parseExcel(excel: string) {
  const items = excel.split(/\t|\n/g)
  return items
}

export default function ExcelInput() {
  const [excel, setExcel] = useState<string>()
  const { info, setInfo } = useContext(InfoContext)
  const { type } = info
  const curInfo = info[type]
  const { excelColumns } = mockPresets
  const columns = excelColumns[type]

  function onChange(e: FormEvent<HTMLTextAreaElement>) {
    setExcel(e.currentTarget.value)
    const newInfo = parseExcel(e.currentTarget.value).reduce((acc, cur, idx) => {
      console.log(idx, columns[idx], cur)
      if (cur !== '' && idx >= columns.length) {
        /**
         *  0  1  2  3  4  5  6  7  8  9
         * 10 11 12 13 14 15 16 17 18 19
         *
         */
        console.log('new row', idx, cur, columns[idx % columns.length])
        const prev = acc[columns[idx % columns.length]]
        acc[columns[idx % columns.length]] = typeof prev === 'string' ? [prev, cur] : [...prev, cur]
      }
      if (columns[idx]) {
        acc[columns[idx]] = cur
      }
      return acc
    }, {})
    console.log(newInfo)

    setInfo((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        made: newInfo['원산지'],
        colors: newInfo['컬러'].split(',').map((color) => ({ name: color, comment: '' })),
        fabric: newInfo['소재(%)'],
        size: newInfo['사이즈(추천사이즈)'].split(',').map((size, idx) => {
          console.log(newInfo['사이즈(추천사이즈)'].split(','), size, idx, newInfo['어깨'][idx])
          return {
            name: size,
            sizes: [
              newInfo?.['어깨']?.[idx] ?? '',
              newInfo?.['가슴']?.[idx] ?? '',
              newInfo?.['소매길이']?.[idx] ?? '',
              newInfo?.['암홀']?.[idx] ?? '',
              newInfo?.['팔통']?.[idx] ?? '',
              newInfo?.['밑단'][idx] ?? '',
              newInfo?.['총기장'][idx] ?? '',
            ],
          }
        }),
      },
    }))
  }
  console.log(curInfo)

  return (
    <textarea
      value={excel}
      onChange={onChange}
      cols={30}
      rows={10}
    />
  )
}
