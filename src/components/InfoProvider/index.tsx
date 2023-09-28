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
  sizeInfoImage?: string
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
  detail?: DetailInfo
  simple?: any
}

export const InfoContext = createContext<{ info: Info; setInfo: Dispatch<SetStateAction<Info>> }>(null)

export default function InfoProvider({ children }) {
  const [info, setInfo] = useState<Info>({
    type: 'detail',
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
      sizeInfoImage: '',
      detailSizeHeader: '',
      detailSizeTable: '',
      size: [],
      made: '',
    },
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
