import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'

export default function SimpleConfig() {
  const { info, setInfo } = useContext(InfoContext)
  console.log(info.simple)

  function onChange(e, value) {
    setInfo((prev) => ({
      ...prev,
      simple: {
        ...prev.simple,
        [value]: e.target.value,
      },
    }))
  }

  return (
    <>
      <div>
        <h2>폴더 번호</h2>
        <input
          type="text"
          value={info.simple.folderNo}
          onChange={(e) => onChange(e, 'folderNo')}
        />
      </div>
      <div>
        <h2>작업 번호</h2>
        <input
          type="text"
          value={info.simple.jobNo}
          onChange={(e) => onChange(e, 'jobNo')}
        />
      </div>
      <div>
        <h2>이미지 개수</h2>
        <input
          type="number"
          value={info.simple.imageLength}
          onChange={(e) => onChange(e, 'imageLength')}
        />
      </div>
    </>
  )
}
