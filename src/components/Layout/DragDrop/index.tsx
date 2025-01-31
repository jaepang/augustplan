import { useContext } from 'react'
import { InfoContext, InfoDetail, InfoSimple } from '@components/InfoProvider'
import { ListManager } from 'react-beautiful-dnd-grid'

import classNames from 'classnames/bind'
import styles from './DragDrop.module.css'
const cx = classNames.bind(styles)

export default function DragDrop({ scope = 'detail' }: { scope?: 'detail' | 'simple' }) {
  const { info, setInfo } = useContext(InfoContext)
  const { baseURL, dateStr } = info
  const { folderName, images } = info[scope] as InfoDetail
  const isDetail = scope === 'detail'

  function onDragEnd(srcIndex: number, destIndex: number) {
    const target = images[srcIndex]
    console.log(srcIndex, destIndex, images[srcIndex])
    setInfo((prev) => {
      const newImages = [...prev[scope].images]

      newImages.splice(srcIndex, 1)
      newImages.splice(destIndex, 0, target)

      return {
        ...prev,
        [scope]: {
          ...prev[scope],
          images: newImages,
        },
      }
    })
  }

  function removeImage(image: string) {
    const idx = images.findIndex((img) => img === image)
    const newImages = info[scope].images
    newImages.splice(idx, 1)

    setInfo((prev) => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        images: newImages,
      },
    }))
  }

  function simplifyImageURL(url: string) {
    return url.replace(`${baseURL}/page`, '').replace(`/${dateStr}`, '').replace(`/${folderName}/`, '').replace('/', '').replace('.jpg', '')
  }

  return (
    <div className={cx('draggable-container')}>
      <ListManager
        items={images}
        direction="horizontal"
        maxItems={10}
        render={(image) => (
          <div className={cx('draggable-wrap')}>
            <div className={cx('draggable-item')}>
              <h3>{simplifyImageURL(image)}</h3>
              <img src={image} />
            </div>

            <button onClick={() => removeImage(image)}>X</button>
          </div>
        )}
        onDragEnd={onDragEnd}
      />
    </div>
  )
}
