import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { App } from './components/App'
import { Dashboard } from './components/Dashboard'
import { Landing } from './components/Landing'

const el = document.getElementById('root')
// @ts-ignore
const root = createRoot(el)

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </HashRouter>
)
