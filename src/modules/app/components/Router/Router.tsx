import { Routes, Route } from 'react-router-dom'
import { NotFound } from '@modules/common/components/NotFound'

const Router = () => (
  <Routes>
    <Route path="/" element={<h1>Hello world</h1>} />
    <Route path="/dashboard" element={<h1>Hello world</h1>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default Router
