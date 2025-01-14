import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
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
  const { baseURL, category, imgPrefix, dateStr } = info
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
    colorImage,
    fabricImages,
    detailImages,
    modelImages,
    size,
    made,
    folderName,
    jobName,
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
  const categoryImage = categoryImageCodeMap[info.category]
  const isSet = info.category === '세트'
  const setCategoryImage = info.setProduct?.category?.map((category) => categoryImageCodeMap[category])
  const { excelColumns } = config
  const categoryIncludingSet = isSet ? info.setProduct?.category : [category]
  const sizeTableHeader = categoryIncludingSet?.map((category) => sizeDetailTableHeader(excelColumns, category, size))

  const additionalComment = cautionComment === 'knit' ? KnitComment : cautionComment === 'coat' ? CoatComment : ''
  const showColors = colors.reduce((acc, cur) => acc || (cur.comment !== ''), false)
  const showFiber = fabricComment !== ''

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

      {/*메인이미지*/}
      <img src={titleImage} />

      {/*오늘 더 사랑스러운 당신에게*/}
      <img src={`${baseURL}/etc/page_02.jpg`} />

      {/*상세설명*/}
      <img src={`${baseURL}/etc/page_08.jpg`} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'rgb(0, 0, 0)',
          fontSize: '8.5pt',
          textAlign: 'center',
          lineHeight: '18px',
          marginBottom: '50px',
        }}
      >
        <span style={{ whiteSpace: 'pre-wrap' }}>{comment}</span>
        <br />
        <span style={{ whiteSpace: 'pre-wrap' }}>{additionalComment}</span>
        {/*컬러뷰*/}
        <img src={colorImage} />
        {showColors &&
          colors?.map(({ name, comment }) => (
            <div key={name}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '7px',
                  lineHeight: '18px',
                }}
              >
                {comment} <strong style={{ fontWeight: 'bold' }}>#{name}</strong>
              </div>
              <br />
              <br />
            </div>
          ))}
        {/*패브릭*/}
        <img src={fabricImages[0]} />
        {showFiber && <>{fabric}의 혼용률로</>}
        <br />
        {fabricComment}
        <br />
        {/*피팅모델인포*/}
        <img src={`${baseURL}/etc/page_${model?.code}.jpg`} />
        <br />*{Array.from(fittingColor).join(',')}컬러, {Array.from(fittingSize).join(',')}사이즈 착용*
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/*본문이미지*/}
          {/*모델이미지*/}
          {modelImages.map((image) => (
            <img
              key={image}
              src={image}
            />
          ))}
          {/*디테일이미지*/}
          {detailImages.map((image) => (
            <img
              key={image}
              src={image}
            />
          ))}
        </div>
        {/*사이즈 인포 시작*/}
        <div
          id="size"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={`${baseURL}/etc/page_09.jpg`} />

          {/*★도식화★
              원피스 ops.jpg
              바지 pt.jpg
              치마 sk.jpg
              상의/아우터 top.jpg
              신발 sh.jpg
            */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <img
              src={`http://gi.esmplus.com/aplan92/web/basic/drawing/${isSet ? setCategoryImage?.[0] : categoryImage}`}
              width="600"
              height="460"
            />
          </div>

          {/*★상품 품목★
            해당되는 품목 주석 풀고 비해당 항목 주석 다시 체크*/}
          <table
            width="70%"
            style={{
              textAlign: 'center',
              borderTopColor: 'rgb(133, 133, 133)',
              borderBottomColor: 'rgb(229, 229, 229)',
              borderTopWidth: '2px',
              borderBottomWidth: '1px',
              borderTopStyle: 'solid',
              borderBottomStyle: 'solid',
              margin: '0 auto',
            }}
          >
            <tbody>
              <tr style={{ backgroundColor: '#f5f5f5', whiteSpace: 'nowrap' }}>
                {sizeTableHeader?.[0]?.map((key) => {
                  return <th key={key}>{key}</th>
                })}

                {/*★사이즈 입력★
                    사이즈 많은 경우 <tr></tr> 한 세트 복사 붙여넣기,
                    항목에 개수에 따라 <td></td> 추가 혹은 삭제
                    <FONT color=#990000></FONT> 강조 할 때 폰트 컬러 소스 활성화
                  */}
              </tr>
              {size?.map((item, idx) => {
                const size = item?.name?.slice(0, item.name.indexOf('('))
                const recSize = item.name.match(/[^()]+(?=\))/g)?.[0]

                const row = [size, recSize, ...Object.values(item?.spec)]
                return (
                  <tr key={idx}>
                    {row.map((value, idx) => (
                      <td key={value + idx}>{value || '-'}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>

          {isSet && (
            <>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              >
                <img
                  src={`http://gi.esmplus.com/aplan92/web/basic/drawing/${setCategoryImage?.[1]}`}
                  width="600"
                  height="460"
                />
              </div>

              {/*★상품 품목★
            해당되는 품목 주석 풀고 비해당 항목 주석 다시 체크*/}
              <table
                width="70%"
                style={{
                  textAlign: 'center',
                  borderTopColor: 'rgb(133, 133, 133)',
                  borderBottomColor: 'rgb(229, 229, 229)',
                  borderTopWidth: '2px',
                  borderBottomWidth: '1px',
                  borderTopStyle: 'solid',
                  borderBottomStyle: 'solid',
                  margin: '0 auto',
                }}
              >
                <tbody>
                  <tr style={{ backgroundColor: '#f5f5f5', whiteSpace: 'nowrap' }}>
                    {sizeTableHeader?.[1]?.map((key) => {
                      return <th key={key}>{key}</th>
                    })}

                    {/*★사이즈 입력★
                    사이즈 많은 경우 <tr></tr> 한 세트 복사 붙여넣기,
                    항목에 개수에 따라 <td></td> 추가 혹은 삭제
                    <FONT color=#990000></FONT> 강조 할 때 폰트 컬러 소스 활성화
                  */}
                  </tr>
                  {info.setProduct?.size?.map((item, idx) => {
                    const size = item?.name?.slice(0, item.name.indexOf('('))
                    const recSize = item.name.match(/[^()]+(?=\))/g)?.[0]

                    const row = [size, recSize, ...Object.values(item?.spec)]
                    return (
                      <tr key={idx}>
                        {row.map((value, idx) => (
                          <td key={value + idx}>{value || '-'}</td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
          )}

          <p
            style={{
              color: 'rgb(130, 130, 130)',
              lineHeight: '15px',
              fontSize: '11px',
              marginTop: '10px',
              marginBottom: '10px',
              verticalAlign: 'top',
            }}
          >
            <br />
            ■ 모든 사이즈의 단위는 cm입니다.
            <br />
            ■ 사이즈는 재는 방법, 재는 위치 등에 따라 약간의 오차가 있을 수 있습니다.
            <br />
            ■ 추천 사이즈는 평균 데이터를 바탕으로 하고 있습니다. 개인의 체형에 따라 다를 수 있으니 상세 사이즈를 꼭 확인 해 주세요.
            <br />■ 어거스트플랜의 모든 의류는 첫 세탁시 드라이 클리닝을 권장합니다.
          </p>

          {/*페브릭/컬러/소재/사이즈/모델피팅정보*/}
          <div
            id="fabric_info"
            style={{
              marginTop: '200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={`${baseURL}/etc/page_10.jpg`} />

            <img
              src={fabricImages[1]}
              width={570}
              height={438}
            />

            <div>
              <p
                style={{
                  color: 'rgb(130, 130, 130)',
                  lineHeight: '15px',
                  fontSize: '11px',
                  marginTop: '10px',
                  marginBottom: '40px',
                  verticalAlign: 'top',
                }}
              >
                {'눈으로 만져보세요 :)'}
              </p>
            </div>

            <div>
              <p style={{ color: 'rgb(99, 99, 99)', lineHeight: '15px', fontSize: '12px', verticalAlign: 'top' }}>
                <b>컬러(Color)</b> : {colors?.map((color) => color.name).join(', ')}
                <br />
                <b>소재(Fabric</b>) : {fabric}
                <br />
                <b>사이즈(Size)</b> : {size?.map((size) => size.name).join(',')}
                <br />
                <b>모델피팅(Model fitting)</b> : {model?.name}/{Array.from(fittingColor).join(',')}/{Array.from(fittingSize).join(',')}
                사이즈
              </p>
            </div>
          </div>

          {/*페브릭 정보 체크 체크박스 on=yes / off=no*/}
          <div
            id="fabric_check"
            style={{
              margin: '100px auto 0px',
              marginTop: '200px',
              width: '100%',
              minWidth: '300px',
              maxWidth: '100% !important',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={`${baseURL}/etc/page_11.jpg`} />

            <table
              width="100%"
              style={{
                height: '153px',
                textAlign: 'center',
                marginBottom: '30px',
                borderTopColor: 'rgb(133, 133, 133)',
                borderBottomColor: 'rgb(192, 192, 192)',
                borderTopWidth: '2px',
                borderBottomWidth: '1px',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
              }}
            >
              <tbody>
                <tr>
                  <th style={{ padding: '5px 0px 0px', width: '15%' }}>세탁</th>
                  <td
                    height="20"
                    style={{ padding: '5px 0px 0px' }}
                  >
                    <FabricCheckbox checked />
                    &nbsp;드라이클리닝
                  </td>
                  <td
                    style={{ paddingTop: '5px' }}
                    height="20"
                  >
                    <FabricCheckbox />
                    &nbsp;단독 손세탁
                  </td>
                  <td
                    height="20"
                    style={{ paddingTop: '5px' }}
                  >
                    <FabricCheckbox />
                    &nbsp;일반세탁
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '15%' }}>두께감</th>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['두께감(두꺼움)'] === '1'} />
                    &nbsp;두꺼움
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['두께감(보통)'] === '1'} />
                    &nbsp;보통
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['두께감(얇음)'] === '1'} />
                    &nbsp;얇음
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '15%' }}>안감</th>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['안감(있음)'] === '1'} />
                    &nbsp;있음
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['안감(없음)'] === '1'} />
                    &nbsp;없음
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['안감(부분/기모안감)'] === '1'} />
                    &nbsp;부분/기모안감
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '15%' }}>신축성</th>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['신축성(없음)'] === '1'} />
                    &nbsp;없음
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['신축성(있음)'] === '1'} />
                    &nbsp;있음
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['신축성(약간있음)'] === '1'} />
                    &nbsp;약간있음
                  </td>
                </tr>
                <tr>
                  <th style={{ width: '15%' }}>비침</th>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['비침(있음)'] === '1'} />
                    &nbsp;있음
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['비침(없음)'] === '1'} />
                    &nbsp;없음
                  </td>
                  <td height="20">
                    <FabricCheckbox checked={fabricInfo?.['비침(약간/부분있음)'] === '1'} />
                    &nbsp;약간/부분있음
                  </td>
                </tr>
              </tbody>
            </table>

            {/*제조일, 제조국 체크*/}
            <table
              style={{
                width: '100%',
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style={{
                        textAlign: 'center',
                        color: 'rgb(130, 130, 130)',
                        lineHeight: '15px',
                        fontSize: '11px',
                        verticalAlign: 'top',
                      }}
                    >
                      제조국:{made}
                      <br />
                      제조사:어거스트플랜 제휴업체
                      <br />
                      제조일:발송일 기준 6개월 이내
                      <br />
                      AS 책임자:어거스트앤드 컴퍼니, 어거스트플랜[070-8672-6111]
                      <br />
                      품질 보증기간:상품 이상시 공정거래 위원회 고시 소비자 분쟁 해결기준에 의거
                      <br />
                      가능 범위에 해당 되는 경우 교환, 반품 신청이 가능합니다.
                      <br />
                      <br />
                      copyright ⓒ 어거스트플랜 all rights reserved
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
