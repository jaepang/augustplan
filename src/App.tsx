import './global.css'
import Layout from '@components/Layout'
import InfoProvider from './components/InfoProvider'

export default function App() {
  return (
    <InfoProvider>
      <Layout />
    </InfoProvider>
  )
}
