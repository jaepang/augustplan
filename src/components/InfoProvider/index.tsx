import { createContext, useState, Dispatch, SetStateAction } from 'react'
import mockPrsests from '@shared/presets-mock.json'

interface InfoBase {
  titleImage?: string
  comment?: string
  cautionComment?: 'none' | 'knit' | 'coat'
  colors?: {
    name?: string
    comment?: string
  }[]
  fabric?: string
  fabricComment?: string

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
  fittingColor?: Set<string>
  fittingSize?: Set<string>
  mainImage?: string
  detailImage?: string
  size?: {
    name: string
    spec: string[]
  }[]
  made?: string
}

export interface Info {
  type: 'detail' | 'simple'
  category: string
  detail?: InfoBase
  simple?: InfoBase
  baseURL?: string
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
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
