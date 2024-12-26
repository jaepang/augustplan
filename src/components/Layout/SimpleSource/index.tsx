import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
import type { Info } from '@components/InfoProvider'
import { KnitComment, CoatComment } from '@shared/consts'
import { config } from '@shared/consts'

import classNames from 'classnames/bind'
import styles from './SimpleSource.module.css'
const cx = classNames.bind(styles)

function generateSizeString({ size, specType }: { size: Info['simple']['size']; specType: string }): string {
  const { excelColumns } = config
  const sizeStringOffset = specType === 'top' ? -15 : -16

  return size
    ?.map(
      (s) =>
        `(${s.name}) ` +
        excelColumns.simple[specType]
          .slice(4, sizeStringOffset)
          .map((key, idx) => `${key}${s.spec[idx] ?? ''}`)
          .join('/'),
    )
    ?.filter((item) => item !== '')
    ?.join('\n') ?? ''
}

export default function SimpleSource() {
  const { info } = useContext(InfoContext)
  const { simple, category, baseURL, dateStr, imgPrefix } = info
  const { model, comment_1, comment_2, comment_3, cautionComment, colors, fabric, size, made, folderName, jobName, imageLength, fittingColor, fittingSize, images } = simple
  const fInfo = [
    '두께감(두꺼움)',
    '두께감(보통)',
    '두께감(얇음)',
    '안감(있음)',
    '안감(없음)',
    '안감(부분/기모)',
    '신축성(없음)',
    '신축성(있음)',
    '신축성(약간있음)',
    '비침(있음)',
    '비침(없음)',
    '비침(약간있음)',
  ]
  const fittingColorString = fittingColor.size > 0 ? `${Array.from(fittingColor).join(', ')}컬러,` : ''
  const fittingSizeString = fittingSize.size > 0 ? `${Array.from(fittingSize).join(', ')}사이즈 착용` : ''

  const isSet = info.category === '세트'
  const categoryIncludingSet = isSet ? info.setProduct?.category : [category]
  const sizeIncludingSet = isSet ? [size, info.setProduct?.size] : [size]
  const specTypeIncludingSet = categoryIncludingSet?.map(category =>
    category === '상의/아우터' || category === '원피스' ? 'top' : 'bottom',
  )

  const infoStr = fInfo
    .map((f) => {
      if (simple?.[f] === '1') {
        return f.replace('(', ' ').replace(')', '')
      }
    })
    .filter((f) => f)
    .join('/')
  const sizeString = specTypeIncludingSet?.map((specType, idx) => generateSizeString({ size: sizeIncludingSet[idx], specType })).join('\n\n')

  return (
    <div
      className={cx('root')}
      id="page"
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'rgb(0, 0, 0)',
        fontSize: '8.5pt',
      }}
    >
      <div
        id="top"
        style={{ width: '100%' }}
      >
        <img src={`${baseURL}/${dateStr}/${folderName}/${imgPrefix}${folderName}-${jobName}_01.jpg`} />
        <br />
      </div>
      <div
        style={{
          lineHeight: '18px',
          marginBottom: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <br />
        [COLOR]
        <br />
        {colors}
        <br />
        <br />
        <br />
        [FABRIC]
        <br />
        {fabric}
        <br />
        {infoStr}
        <br />
        <br />
        <br />
        [SIZE]
        <br />
        <span style={{ whiteSpace: 'pre-wrap' }}>{sizeString}</span>
        <br />
        <br />
        [FITTING]
        <br />
        {model?.name}
        <br />
        {model?.detail}
        <br />
        {fittingColorString + fittingSizeString}
        <br />
        <br />
        <br />
        [COMMENT]
        <br />
        {comment_1}
        <br />
        {comment_2}
        <br />
        {comment_3}
        <br />
        {cautionComment !== 'none' ? (
          <>
            <span style={{ whiteSpace: 'pre-wrap' }}>{cautionComment === 'knit' ? KnitComment : cautionComment === 'coat' ? CoatComment : ''}</span>
          </>
        ) : <br />}
        <br />
        [PRODUCT CHECK]
        <br />
        제조국 : {made}
        <br />
        제조사 : 홉스앤드 헙력업체
        <br />
        제조일자 : 게시일로 부터 3개월 내 제작된 제품
        <br />
        <br />
        <br />
        {images?.map(image => (
          <div key={image}>
            <img
              src={image}
            />
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}
