import { createContext, useState, Dispatch, SetStateAction } from 'react'
import mockPrsests from '@shared/presets-mock.json'

interface InfoBase {
  cautionComment?: 'none' | 'knit' | 'coat'
  fabric?: string
  '두께감(두꺼움)'?: string
  '두께감(보통)'?: string
  '두께감(얇음)'?: string
  '안감(있음)'?: string
  '안감(없음)'?: string
  '안감(부분/기모)'?: string
  '신축성(없음)'?: string
  '신축성(있음)'?: string
  '신축성(약간있음)'?: string
  '비침(있음)'?: string
  '비침(없음)'?: string
  '비침(약간있음)'?: string
  model?: {
    code?: number | string
    name?: string
  }
  size?: {
    name: string
    spec: string[]
  }[]
  made?: string
}

interface InfoSimple extends InfoBase {
  comment_1?: string
  comment_2?: string
  comment_3?: string
  colors?: string
  images?: string[]
}

interface InfoDetail extends InfoBase {
  comment?: string
  titleImage?: string
  mainImage?: string
  detailImage?: string
  fabricComment?: string
  colors?: {
    name?: string
    comment?: string
  }[]
  fittingColor?: Set<string>
  fittingSize?: Set<string>
}

export interface Info {
  type: 'detail' | 'simple'
  category: string
  detail?: InfoDetail
  simple?: InfoSimple
  baseURL?: string
  setProduct?: InfoBase & {
    category: string[]
  }
}

export const InfoContext = createContext<{ info: Info; setInfo: Dispatch<SetStateAction<Info>> }>(null)

export default function InfoProvider({ children }) {
  const [info, setInfo] = useState<Info>({
    type: 'detail',
    category: mockPrsests.categories[0],
    baseURL: '',
    detail: {
      titleImage: '',
      comment: '',
      cautionComment: 'none',
      fabricComment: '',
      colors: [],
      fabric: '',
      model: mockPrsests.models[0],
      mainImage: '',
      detailImage: '',
      size: [],
      made: '',
      fittingColor: new Set(),
      fittingSize: new Set(),
    },
    simple: {
      comment_1: '',
      comment_2: '',
      comment_3: '',
      colors: '',
      images: [],
      fabric: '',
      size: [],
      made: '',
    },
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
