import { useContext, useCallback } from 'react'
import { InfoContext } from '@components/InfoProvider'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

import classNames from 'classnames/bind'
import styles from './DragDrop.module.css'
const cx = classNames.bind(styles)

export default function DragDrop({ dateStr }) {
  const { info, setInfo } = useContext(InfoContext)
  const { baseURL, imgPrefix } = info
  const { images, jobName, folderName } = info.detail
  const prefix = jobName ? `${imgPrefix}${folderName}-${jobName}` : `${imgPrefix}${folderName}`

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.reason === 'DROP') {
        console.log(result, result?.source, result?.destination)
        const { source, destination, draggableId } = result
        const srcIndex = result.source?.index
        const destIndex = result.destination?.index

        if (!srcIndex || !destIndex) return
        if (destination.droppableId === source.droppableId && source.index === destination.index) return

        setInfo((prev) => {
          const newImages = prev.detail.images

          newImages.splice(srcIndex, 1)
          newImages.splice(destIndex, 0, draggableId)

          return {
            ...prev,
            detail: {
              ...prev.detail,
              images: newImages,
            },
          }
        })
      }
    },
    [info, setInfo],
  )

  function removeImage(idx: number) {
    const newImages = info.detail.images
    newImages.splice(idx, 1)

    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        images: newImages,
      },
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cx('draggable-container')}
            >
              {images.map((image, idx) => (
                <Draggable
                  key={image}
                  draggableId={image}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cx('draggable-item')}
                      ref={provided.innerRef}
                    >
                      <div>
                        <h3>{`${prefix}_${image}.jpg`}</h3>
                        <img src={`${baseURL}/page/${dateStr}/${folderName}/${prefix}_${image}.jpg`} />
                      </div>

                      <button onClick={() => removeImage(idx)}>X</button>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </DragDropContext>
  )
}
