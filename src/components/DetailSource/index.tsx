import classNames from 'classnames/bind'
import styles from './DetailSource.module.css'
const cx = classNames.bind(styles)

interface Props {
  titleImage?: string
  comment?: string
  additionalComment?: string
  color?: {
    image?: string
    comment?: string
  }
  fabrics?: {
    image?: string
    mixedRate?: string
    comment?: string
  }[]
  model?: {
    number?: number
    name?: string
    fittingColor?: string
    fittingSize?: string
  }
  mainImage?: string
  detailImage?: string
  sizeInfoImage?: string
  detailSizeHeader?: string
  detailSizeTable?: string
  size?: string
  colors?: string
  made?: string
}

export default function DetailSource({
  titleImage,
  comment,
  additionalComment,
  color,
  fabrics,
  model,
  mainImage,
  detailImage,
  sizeInfoImage,
  detailSizeHeader,
  detailSizeTable,
  size,
  colors,
  made,
}: Props) {
  return (
    <div id="page">
      <div id="top">
        {/*임시 이미지 영역 (설날 배송, 쿠폰, 안내사항 등 페이지 가장 상단에 노출 됨_오픈마켓/자사몰 동일)*/}

        {/*배송지연상품 확인하기*/}
        <div>
          <a href="http://shop1.aplan92.cafe24.com/article/%EC%9E%85%EA%B3%A0%EC%A7%80%EC%97%B0/101/286/">
            <img src="http://aplan92.hgodo.com/etc/delay.jpg" />
          </a>
        </div>

        {/*유튜브 링크 (유튜브 영상 노출)*/}

        {/*메인이미지*/}
        {titleImage}

        {/*오늘 더 사랑스러운 당신에게*/}
        <img src="http://aplan92.hgodo.com/etc/page_02.jpg" />

        {/*상세설명*/}
        <img src="http://aplan92.hgodo.com/etc/page_08.jpg" />
        <div className={cx('base')}>
          <div
            style={{
              lineHeight: '18px',
              marginBottom: '50px',
            }}
          >
            {comment} {additionalComment}
            {/*컬러뷰*/}
            {color?.image}
            {color?.comment}
            {/*패브릭*/}
            {fabrics?.[0]?.image}
            {fabrics?.[0]?.mixedRate}의 혼용률로
            <br />
            {fabrics?.[0]?.comment}
            <br />
            {/*피팅모델인포*/}
            {/*소소모델
            <div style={{marginBottom:5px;">
            <img src='http://aplan92.hgodo.com/etc/page_04.jpg' />
            *블랙,FREE사이즈 착용*
            */}
            {/*시화모델
            <div style={{marginBottom:5px;">
            <img src='http://aplan92.hgodo.com/etc/page_05.jpg' /><br>
            *블랙,FREE사이즈 착용*<br>
            */}
            {/*윤정모델    
            <div style={{marginBottom:5px;">
            <img src='http://aplan92.hgodo.com/etc/page_06.jpg' /><br>
            *블랙,FREE사이즈 착용*<br>
            */}
            {/*지수모델
            <div style={{marginBottom:5px;">
            <img src='http://aplan92.hgodo.com/etc/page_07.jpg' /><br>
            *블랙,M사이즈 착용*<br>
            */}
            {/*수민모델
            <div style={{marginBottom:5px;">
            <img src='http://aplan92.hgodo.com/etc/page_15.jpg' /><br>
            *블랙,M사이즈 착용*<br>
            */}
            {/*서영모델
            <div style={{marginBottom:5px;">
            <img src='http://aplan92.hgodo.com/etc/page_14.jpg' /><br>
            *블랙,M사이즈 착용*<br>
            */}
            <img src="http://aplan92.hgodo.com/etc/page_{modelNumber}.jpg" />
            <br />*{model?.fittingColor},{model?.fittingSize}사이즈 착용*
            <br />
            {/*본문이미지*/}
            {mainImage}
            {/*디테일이미지*/}
            {detailImage}
            {/*사이즈 인포 시작*/}
            <div id="detail">
              <div id="size">
                <table>
                  <tbody>
                    <tr>
                      <td align="center">
                        <img src="http://aplan92.hgodo.com/etc/page_09.jpg" />
                      </td>
                    </tr>
                  </tbody>
                </table>

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
                    src="http://gi.esmplus.com/aplan92/web/basic/drawing/{sizeInfoImage}"
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
                  }}
                >
                  <tbody>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      {detailSizeHeader}

                      {/*★사이즈 입력★
                        사이즈 많은 경우 <tr></tr> 한 세트 복사 붙여넣기,
                        항목에 개수에 따라 <td></td> 추가 혹은 삭제
                        <FONT color=#990000></FONT> 강조 할 때 폰트 컬러 소스 활성화
                      */}

                      {detailSizeTable}
                    </tr>
                  </tbody>
                </table>

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
                  style={{ marginTop: '200px' }}
                >
                  <img src="http://aplan92.hgodo.com/etc/page_10.jpg" />

                  <div>{fabrics[1]?.image}</div>

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
                      <b>컬러(Color)</b> : {colors}
                      <br />
                      <b>소재(Fabric</b>) : {fabrics[0]?.mixedRate}
                      <br />
                      <b>사이즈(Size)</b> : {size}
                      <br />
                      <b>모델피팅(Model fitting)</b> : {model?.name}/{model?.fittingColor}/{model?.fittingSize}사이즈
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
                  }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img src="http://aplan92.hgodo.com/etc/page_11.jpg" />
                        </td>
                      </tr>
                    </tbody>
                  </table>

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
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/yes.gif"
                          />
                          &nbsp;드라이클리닝
                        </td>
                        <td
                          className={cx('pt5')}
                          height="20"
                        >
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/no.gif"
                          />
                          &nbsp;단독 손세탁
                        </td>
                        <td
                          height="20"
                          className={cx('pt5')}
                        >
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/no.gif"
                          />
                          &nbsp;일반세탁
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: '15%' }}>두께감</th>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{thickness_high}.gif"
                          />
                          &nbsp;두꺼움
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{thickness_medium}.gif"
                          />
                          &nbsp;보통
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{thickness_low}.gif"
                          />
                          &nbsp;얇음
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: '15%' }}>안감</th>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{lining_yes}.gif"
                          />
                          &nbsp;있음
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{lining_no}.gif"
                          />
                          &nbsp;없음
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{lining_part}.gif"
                          />
                          &nbsp;부분/기모안감
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: '15%' }}>신축성</th>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{flexibility_no}.gif"
                          />
                          &nbsp;없음
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{flexibility_yes}.gif"
                          />
                          &nbsp;있음
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{flexibility_little}.gif"
                          />
                          &nbsp;약간있음
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: '15%' }}>비침</th>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{see_through_yes}.gif"
                          />
                          &nbsp;있음
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{see_through_no}.gif"
                          />
                          &nbsp;없음
                        </td>
                        <td height="20">
                          <img
                            className={cx('wh11')}
                            src="http://gi.esmplus.com/aplan92/web/basic/{see_through_little}.gif"
                          />
                          &nbsp;약간/부분있음
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/*제조일, 제조국 체크*/}
                  <table>
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
        </div>
      </div>
    </div>
  )
}