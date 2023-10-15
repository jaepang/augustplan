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
    detail?: string
  }
  size?: {
    name: string
    spec: string[]
  }[]
  made?: string
  folderName?: string
  jobName?: string
  imageLength?: number
}

interface InfoSimple extends InfoBase {
  comment_1?: string
  comment_2?: string
  comment_3?: string
  colors?: string
}

interface InfoDetail extends InfoBase {
  comment?: string
  titleImage?: string
  mainImage?: string
  fabricComment?: string
  colors?: {
    name?: string
    comment?: string
  }[]
  fittingColor?: Set<string>
  fittingSize?: Set<string>
  images: string[]
}

export interface Info {
  type: 'detail' | 'simple'
  category: string
  dateStr?: string
  detail?: InfoDetail
  simple?: InfoSimple
  baseURL?: string
  imgPrefix?: string
  setProduct?: InfoBase & {
    category: string[]
  }
}

export const InfoContext = createContext<{ info: Info; setInfo: Dispatch<SetStateAction<Info>> }>(null)

export default function InfoProvider({ children }) {
  const [info, setInfo] = useState<Info>({
    type: 'detail',
    category: mockPrsests.categories[0],
    dateStr: '',
    baseURL: '',
    imgPrefix: '',
    detail: {
      titleImage: '',
      comment: '',
      cautionComment: 'none',
      fabricComment: '',
      colors: [],
      fabric: '',
      mainImage: '',
      size: [],
      made: '',
      fittingColor: new Set(),
      fittingSize: new Set(),
      folderName: '',
      imageLength: 0,
      images: [],
      jobName: '',
    },
    simple: {
      comment_1: '',
      comment_2: '',
      comment_3: '',
      colors: '',
      fabric: '',
      size: [],
      made: '',
      folderName: '',
      jobName: '',
      imageLength: 0,
    },
  })
  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
