import classNames from 'classnames/bind'
import styles from './InfoEditableTable.module.css'
const cx = classNames.bind(styles)

export default function InfoEditableTable({ data, setData }) {
  const size = Object.keys(data).length
  const columnStyle = {
    gridTemplateColumns: `repeat(${size}, 70px)`,
  }

  function onChange(e, key, idx = undefined) {
    // array
    if (idx !== undefined) {
      setData((prev) => ({
        ...prev,
        [key]: prev[key].map((item, i) => {
          if (i === idx) {
            return e.target.value
          }
          return item
        }),
      }))
    } else {
      setData((prev) => ({
        ...prev,
        [key]: e.target.value,
      }))
    }
  }

  return (
    <div>
      <h2>엑셀 데이터 (수정 가능)</h2>
      <div className={cx('table')}>
        <div
          className={cx('row', 'th')}
          style={columnStyle}
        >
          {Object.keys(data).map((key) => (
            <div
              className={cx('col')}
              key={key}
            >
              <p>{key}</p>
            </div>
          ))}
        </div>
        <div
          className={cx('row')}
          style={columnStyle}
        >
          {Object.keys(data).map((key) => (
            <div
              key={key}
              className={cx('col')}
            >
              {typeof data[key] === 'string' ? (
                <textarea
                  className={cx('cell')}
                  value={data[key]}
                  onChange={(e) => onChange(e, key)}
                />
              ) : (
                data[key].map((item, idx) => (
                  <textarea
                    className={cx('cell', 'array')}
                    key={key + idx}
                    value={item}
                    onChange={(e) => onChange(e, key, idx)}
                  />
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
