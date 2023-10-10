import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
import { KnitComment, CoatComment } from '@shared/consts'
import mockPresets from '@shared/presets-mock.json'

import classNames from 'classnames/bind'
import styles from './SimpleSource.module.css'
const cx = classNames.bind(styles)

export default function SimpleSource({ date }) {
  const { info } = useContext(InfoContext)
  const { simple, category, baseURL } = info
  const { model, comment_1, comment_2, comment_3, cautionComment, colors, fabric, size, made, folderNo, jobNo, imageLength } = simple
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
  const { excelColumns } = mockPresets
  const specType = category === '상의/아우터' || category === '원피스' ? 'top' : 'bottom'
  const dateStr = date.replace(/-/g, '').slice(2)

  const infoStr = fInfo
    .map((f) => {
      if (simple?.[f] === '1') {
        return f.replace('(', ' ').replace(')', '')
      }
    })
    .filter((f) => f)
    .join('/')

  console.log(size)
  const sizeString =
    size
      ?.map(
        (s) =>
          `(${s.name}) ` +
          excelColumns.simple[specType]
            .slice(4, -15)
            .map((key, idx) => `${key}${s.spec[idx]}`)
            .join('/'),
      )
      ?.join('\n') ?? ''

  return (
    <div
      className={cx('root')}
      id="page"
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        id="top"
        style={{ width: '100%' }}
      >
        <img src={`${baseURL}/etc/Untitled-1.jpg`} />

        <br />
        <img src={`${baseURL}/etc/Untitled-2.jpg`} />
        <br />
        <img src={`${baseURL}/page/${dateStr}/${folderNo}/h${folderNo}-${jobNo}_01.jpg`} />
        <br />
      </div>
      <div style={{ color: 'rgb(0, 0, 0)', fontFamily: "'돋움', dotum", fontSize: '8.5pt' }}>
        <div style={{ lineHeight: '18px', marginBottom: '50px', fontFamily: "'돋움', dotum", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '8.5pt', marginBottom: '5px', color: 'rgb(0,0,0)' }}></div>
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
          {sizeString}
          <br />
          <br />
          [FITTING]
          <br />
          {model?.name}
          <br />
          {model?.detail}
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
          <br />
          {cautionComment === 'knit' ? KnitComment : cautionComment === 'coat' ? CoatComment : ''}
          <br />
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
          {Array.from({ length: imageLength - 1 }, (_, i) => i + 1).map((i) => (
            <img
              key={i}
              src={`${baseURL}/page/${dateStr}/${folderNo}/h${folderNo}-${jobNo}_${i.toString().padStart(2, '0')}.jpg`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
