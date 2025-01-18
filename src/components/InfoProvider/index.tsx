import { createContext, useState, Dispatch, SetStateAction } from 'react'
import { config } from '@shared/consts'

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
  fittingColor?: Set<string>
  fittingSize?: Set<string>
  size?: {
    name: string
    spec: string[]
  }[]
  made?: string
  folderName?: string
  jobName?: string
}

export interface InfoSimple extends InfoBase {
  comment_1?: string
  comment_2?: string
  comment_3?: string
  colors?: string
  imageLength?: number
  images: string[]
}

export interface InfoDetail extends InfoBase {
  type: 'simple' | 'detail'
  comment?: string
  titleImage?: string
  fabricComment?: string
  colors?: {
    name?: string
    comment?: string
  }[]
  colorImage: string
  fabricImages: string[]
  modelImages: string[]
  detailImages: string[]
}

export interface Info {
  preset?: string
  type: 'detail' | 'simple'
  category: string
  date: string
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
    category: config.categories[0],
    date: new Date().toISOString().slice(0, 10),
    dateStr: '',
    baseURL: '',
    imgPrefix: '',
    detail: {
      type: 'simple',
      titleImage: '',
      comment: '',
      cautionComment: 'none',
      fabricComment: '',
      colors: [],
      fabric: '',
      size: [],
      made: '',
      fittingColor: new Set(),
      fittingSize: new Set(),
      folderName: '',
      jobName: '',
      colorImage: '',
      fabricImages: ['', ''],
      detailImages: [],
      modelImages: [],
    },
    simple: {
      cautionComment: 'none',
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
      fittingColor: new Set(),
      fittingSize: new Set(),
      images: []
    },
  })

  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
