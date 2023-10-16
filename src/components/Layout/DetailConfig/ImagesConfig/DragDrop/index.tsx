import { useContext, useCallback } from 'react'
import { InfoContext } from '@components/InfoProvider'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

import classNames from 'classnames/bind'
import styles from './DragDrop.module.css'
const cx = classNames.bind(styles)

export default function DragDrop() {
  const { info, setInfo } = useContext(InfoContext)
  const { baseURL, dateStr } = info
  const { folderName, modelImages } = info.detail

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
          const newImages = prev.detail.modelImages

          newImages.splice(srcIndex, 1)
          newImages.splice(destIndex, 0, draggableId)

          return {
            ...prev,
            detail: {
              ...prev.detail,
              modelImages: newImages,
            },
          }
        })
      }
    },
    [info, setInfo],
  )

  function removeImage(idx: number) {
    const newImages = info.detail.modelImages
    newImages.splice(idx, 1)

    setInfo((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        images: newImages,
      },
    }))
  }

  function simplifyImageURL(url: string) {
    return url.replace(`${baseURL}/page/${dateStr}/${folderName}/`, '').replace('.jpg', '')
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="images"
        direction="horizontal"
      >
        {(provided) => (
          <>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cx('draggable-container')}
            >
              {modelImages.map((image, idx) => (
                <Draggable
                  key={image}
                  draggableId={image}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cx('draggable-wrap')}
                      ref={provided.innerRef}
                    >
                      <div className={cx('draggable-item')}>
                        <h3>{simplifyImageURL(image)}</h3>
                        <img src={image} />
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
