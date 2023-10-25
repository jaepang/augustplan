import { useContext } from 'react'
import { InfoContext } from '@components/InfoProvider'
import { ListManager } from 'react-beautiful-dnd-grid'

import classNames from 'classnames/bind'
import styles from './DragDrop.module.css'
const cx = classNames.bind(styles)

export default function DragDrop() {
  const { info, setInfo } = useContext(InfoContext)
  const { baseURL, dateStr } = info
  const { folderName, modelImages } = info.detail

  function onDragEnd(srcIndex: number, destIndex: number) {
    const target = modelImages[srcIndex]
    console.log(srcIndex, destIndex, modelImages[srcIndex])
    setInfo((prev) => {
      const newImages = prev.detail.modelImages

      newImages.splice(srcIndex, 1)
      newImages.splice(destIndex, 0, target)

      return {
        ...prev,
        detail: {
          ...prev.detail,
          modelImages: newImages,
        },
      }
    })
  }

  function removeImage(image: string) {
    const idx = modelImages.findIndex((img) => img === image)
    const newImages = info.detail.modelImages
    newImages.splice(idx, 1)

    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        modelImages: newImages,
      },
    }))
  }

  function simplifyImageURL(url: string) {
    return url.replace(`${baseURL}/page`, '').replace(`/${dateStr}`, '').replace(`/${folderName}/`, '').replace('/', '').replace('.jpg', '')
  }

  return (
    <div className={cx('draggable-container')}>
      <ListManager
        items={modelImages}
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
