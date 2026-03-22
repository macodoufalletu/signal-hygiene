import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report'
import Reports from './pages/Reports'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signaler" element={<Report />} />
      <Route path="/alertes" element={<Reports />} />
    </Routes>
  )
}
