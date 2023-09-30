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
  model?: {
    number?: number
    name?: string
    fittingColor?: string
    fittingSize?: string
  }
  mainImage?: string
  detailImage?: string
  detailSizeHeader?: string
  detailSizeTable?: string
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
      detailSizeHeader: '',
      detailSizeTable: '',
      size: [],
      made: '',
    },
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
