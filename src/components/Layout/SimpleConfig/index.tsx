import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'

export default function SimpleConfig() {
  const { info, setInfo } = useContext(InfoContext)
  const { colors: colorsString, fittingColor, fittingSize, size } = info.simple
  const colors = colorsString?.split(',')
  const sizes = size?.map((size) => (size.name.includes('(') ? size.name.slice(0, size.name.indexOf('(')) : size.name))
  const showFitting = colors?.length > 0 && sizes?.length > 0

  function onFittingChange(e, target) {
    const newSet = info.simple[target]
    if (e.target.checked) {
      newSet.add(e.target.value)
    } else {
      newSet.delete(e.target.value)
    }

    setInfo((prev) => ({
      ...prev,
      simple: {
        ...prev.simple,
        [target]: newSet,
      },
    }))
  }

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
        <h2>폴더명</h2>
        <input
          type="text"
          value={info.simple.folderName}
          onChange={(e) => onChange(e, 'folderName')}
        />
      </div>
      <div>
        <h2>작업 번호</h2>
        <input
          type="text"
          value={info.simple.jobName}
          onChange={(e) => onChange(e, 'jobName')}
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
      {showFitting && (
        <div>
          <h2 style={{ marginBottom: 0 }}>피팅 정보 입력</h2>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <h3>컬러</h3>
              {colors?.map((name) => (
                <div key={name}>
                  <input
                    id={name}
                    type="checkbox"
                    checked={fittingColor.has(name)}
                    value={name}
                    onChange={(e) => onFittingChange(e, 'fittingColor')}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              ))}
            </div>
            <div>
              <h3>사이즈</h3>
              {sizes?.map((size) => (
                <div key={size}>
                  <input
                    id={size}
                    type="checkbox"
                    checked={fittingSize.has(size)}
                    value={size}
                    onChange={(e) => onFittingChange(e, 'fittingSize')}
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
