import { useContext } from 'react'
import { InfoContext, type Info } from '@components/InfoProvider'
import { KnitComment, CoatComment } from '@shared/consts'
import { config } from '@shared/consts'
import classNames from 'classnames/bind'
import styles from './DetailSource.module.css'
const cx = classNames.bind(styles)

const categoryImageCodeMap = {
  원피스: 'ops.jpg',
  바지: 'pt.jpg',
  치마: 'sk.jpg',
  '상의/아우터': 'top.jpg',
}

function generateSizeString({ size, specType }: { size: Info['detail']['size']; specType: string }): string {
  const { excelColumns } = config
  const sizeStringOffset = specType === 'top' ? -12 : -13

  return size
    ?.map(
      (s) =>
        `(${s.name}) ` +
        excelColumns.detail[specType]
          .slice(4, sizeStringOffset)
          .map((key, idx) => `${key}${s.spec[idx] ?? ''}`)
          .join('/'),
    )
    ?.filter((item) => item !== '')
    ?.join('\n') ?? ''
}

function FabricCheckbox({ checked = false }) {
  const fileName = checked ? 'yes.gif' : 'no.gif'
  return (
    <img
      style={{ width: '11px', height: '11px' }}
      src={`http://gi.esmplus.com/aplan92/web/basic/${fileName}`}
    />
  )
}

function sizeDetailTableHeader(excelColumns, category, size) {
  const columnCategory = category === '바지' || category === '치마' ? 'bottom' : 'top'
  const sliceOffset = category === '바지' || category === '치마' ? -13 : -12
  const columns = excelColumns.detail[columnCategory].slice(4, sliceOffset)
  return size?.length > 0 ? ['사이즈', '추천사이즈', ...(columns ?? [])] : []
}

export default function DetailSource() {
  const { info } = useContext(InfoContext)
  const { baseURL, category } = info
  const {
    titleImage,
    comment,
    cautionComment,
    fabricComment,
    colors,
    fabric,
    model,
    fittingColor,
    fittingSize,
    images,
    size,
    made,
  } = info.detail || {}
  const fabricInfo = {
    '두께감(두꺼움)': info.detail?.['두께감(두꺼움)'],
    '두께감(보통)': info.detail?.['두께감(보통)'],
    '두께감(얇음)': info.detail?.['두께감(얇음)'],

    '안감(있음)': info.detail?.['안감(있음)'],
    '안감(없음)': info.detail?.['안감(없음)'],
    '안감(부분/기모안감)': info.detail?.['안감(부분/기모안감)'],

    '신축성(없음)': info.detail?.['신축성(없음)'],
    '신축성(있음)': info.detail?.['신축성(있음)'],
    '신축성(약간있음)': info.detail?.['신축성(약간있음)'],

    '비침(있음)': info.detail?.['비침(있음)'],
    '비침(없음)': info.detail?.['비침(없음)'],
    '비침(약간/부분있음)': info.detail?.['비침(약간/부분있음)'],
  }
  const fabricString = Object.entries(fabricInfo).filter(([key, value]) => value === 1).map(([key, value]) => key).join('/')
  const fittingColorString = fittingColor.size > 0 ? `${Array.from(fittingColor).join(', ')}컬러,` : ''
  const fittingSizeString = fittingSize.size > 0 ? `${Array.from(fittingSize).join(', ')}사이즈 착용` : ''

  const isSet = info.category === '세트'
  const categoryIncludingSet = isSet ? info.setProduct?.category : [category]
  const sizeIncludingSet = isSet ? [size, info.setProduct?.size] : [size]
  const specTypeIncludingSet = categoryIncludingSet?.map(category =>
    category === '상의/아우터' || category === '원피스' ? 'top' : 'bottom',
  )
  const sizeString = specTypeIncludingSet?.map((specType, idx) => generateSizeString({ size: sizeIncludingSet[idx], specType })).join('\n\n')

  return (
    <div
      id="page"
      className={cx('root')}
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/*임시 이미지 영역 (설날 배송, 쿠폰, 안내사항 등 페이지 가장 상단에 노출 됨_오픈마켓/자사몰 동일)*/}

      {/*배송지연상품 확인하기*/}
      <div>
        <a href="http://shop1.aplan92.cafe24.com/article/%EC%9E%85%EA%B3%A0%EC%A7%80%EC%97%B0/101/286/">
          <img src={`${baseURL}/etc/delay.jpg`} />
        </a>
      </div>

      {/*유튜브 링크 (유튜브 영상 노출)*/}
      <div>
        <img
          src={titleImage}
        />
        <br />
      </div>
      <br />
      [COLOR]
      <br />
      {colors.map(color => color.name).join(',')}
      <br />
      <br />
      <br />
      [FABRIC]
      <br />
      {fabric}
      <br />
      {fabricString}
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
      <span style={{ whiteSpace: 'pre-wrap' }}>{comment}</span>
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
  )
}
