import { createRoot } from 'react-dom/client'

import { App } from './components/App'

const el = document.getElementById('root')
// @ts-ignore
const root = createRoot(el)
root.render(<App />)
