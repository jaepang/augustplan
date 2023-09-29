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
  categoryImage?: string
  detailSizeHeader?: string
  detailSizeTable?: string
  size?: {
    name: string
    sizes: string[]
  }[]
  made?: string
}

export interface Info {
  type: 'detail' | 'simple'
  category: string // '원피스' | '바지' | '치마' | '상의/아우터' | '신발'
  detail?: DetailInfo
  simple?: any
}

export const InfoContext = createContext<{ info: Info; setInfo: Dispatch<SetStateAction<Info>> }>(null)

export default function InfoProvider({ children }) {
  const [info, setInfo] = useState<Info>({
    type: 'detail',
    category: '원피스',
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
      categoryImage: '',
      detailSizeHeader: '',
      detailSizeTable: '',
      size: [],
      made: '',
    },
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
