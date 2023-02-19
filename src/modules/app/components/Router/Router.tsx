import { Routes, Route } from 'react-router-dom'
import { Layout } from '@modules/app/components/Layout'
import { Dashboard, Profile } from '@modules/management'
import { NotFound } from '@modules/common/components/NotFound'

const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default Router
