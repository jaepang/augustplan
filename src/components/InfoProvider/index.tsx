import { createContext, useState, Dispatch, SetStateAction } from 'react'

export interface Info {
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

export const InfoContext = createContext<{ info: Info; setInfo: Dispatch<SetStateAction<Info>> }>(null)

export default function InfoProvider({ children }) {
  const [info, setInfo] = useState<Info>({
    titleImage: '',
    comment: '',
    additionalComment: '',
    color: {
      image: '',
      comment: ''
    },
    fabrics: [],
    model: {
      number: 0,
      name: '',
      fittingColor: '',
      fittingSize: ''
    },
    mainImage: '',
    detailImage: '',
    sizeInfoImage: '',
    detailSizeHeader: '',
    detailSizeTable: '',
    size: '',
    colors: '',
    made: ''
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
