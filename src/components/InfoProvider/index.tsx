import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface DetailInfo {
  titleImage?: string
  comment?: string
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
    number?: number
    name?: string
    fittingColor?: string
    fittingSize?: string
  }
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
  detail?: DetailInfo
  simple?: any
  baseURL?: string
}

export const InfoContext = createContext<{ info: Info; setInfo: Dispatch<SetStateAction<Info>> }>(null)

export default function InfoProvider({ children }) {
  const [info, setInfo] = useState<Info>({
    type: 'detail',
    category: '상의/아우터',
    baseURL: '',
    detail: {
      titleImage: '',
      comment: '',
      fabricComment: '',
      colors: [],
      fabric: '',
      model: {
        number: 0,
        name: '',
        fittingColor: '',
        fittingSize: '',
      },
      mainImage: '',
      detailImage: '',
      size: [],
      made: '',
    },
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}