import InfoProvider from '../InfoProvider'
import DetailSource from '../DetailSource'
import ExcelInput from '../ExcelInput'

import classNames from 'classnames/bind'
import styles from './Layout.module.css'
const cx = classNames.bind(styles)

export default function Layout() {
  return (
    <InfoProvider>
      <div className={cx('root')}>
        <div className={cx('col', 'setting')}>
          <ExcelInput />
        </div>
        <div className={cx('col', 'preview')}>{/*<DetailSource />*/}</div>
      </div>
    </InfoProvider>
  )
}
