import mock from './presets-mock.json'

export const KnitComment = `
+
원사를 편직하여 만든 니트제품은
생활 환경에 따라 필링현상이 생길 수 있습니다.
이는 불량으로 간주하기 어려우며 착용하신 상품은
어떠한 경우에도 교환 및 반품이 불가한 점 양해 부탁드립니다.

`

export const CoatComment = `
+
해당 상품은 압축 가공처리 후 높은 밀도로 제작 되어
필링현상을 최소화 하였습니다.
다만 제품 구성 성분 중 하나인 폴리는 화학 섬유로
생활 환경에 따라 필링현상이 생길 수 있습니다.
이는 불량으로 간주하기 어려우며 착용하신 상품은
어떠한 경우에도 교환 및 반품이 불가한 점 양해 부탁드립니다.

`

export const config = JSON.parse(process.env.CONFIG || 'null') || mock
