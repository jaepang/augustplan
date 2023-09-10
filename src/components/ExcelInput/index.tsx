import { useState, useEffect, FormEvent } from 'react'

function parseExcel(excel: string) {
  const items = excel.split('\t')
  return items
}

export default function ExcelInput() {
  const [excel, setExcel] = useState<string>()

  useEffect(() => {
    if (excel) console.log(parseExcel(excel).filter((item) => !!item))
  }, [excel])

  function onChange(e: FormEvent<HTMLTextAreaElement>) {
    setExcel(e.currentTarget.value)
  }

  return (
    <textarea
      value={excel}
      onChange={onChange}
      cols={30}
      rows={10}
    />
  )
}
