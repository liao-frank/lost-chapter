import './App.scss'
import { LostChapterIcon } from './Icon'

export const App = () => {
  return (
    <div className="app">
      <div className="coming-soon">
        <LostChapterIcon size="16rem" />
        <span>Coming soon</span>
      </div>
    </div>
  )
}
