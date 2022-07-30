import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { App } from './components/App'
import { Dashboard } from './components/Dashboard'
import { Landing } from './components/Landing'
import { GH_PAGES_BASE_PATH } from './consts'

const el = document.getElementById('root')
// @ts-ignore
const root = createRoot(el)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={GH_PAGES_BASE_PATH} />} />
      <Route path={GH_PAGES_BASE_PATH} element={<App />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
