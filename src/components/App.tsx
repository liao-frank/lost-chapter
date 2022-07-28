import classNames from 'classnames'
import { useEffect, useState } from 'react'

import backgroundPath from '../images/background.png'
import './App.scss'
import { Landing } from './Landing'

export const App = () => {
  const [backgroundSrc, setBackgroundSrc] = useState<string | undefined>()

  useEffect(() => {
    const image = new Image()

    image.onload = () => void setBackgroundSrc(backgroundPath)
    image.src = backgroundPath
  }, [])

  return (
    <>
      <div
        className={classNames(
          'background',
          !backgroundSrc && 'background-hidden'
        )}
        style={{ backgroundImage: backgroundSrc && `url(${backgroundSrc})` }}
      ></div>
      <div className="app">
        <div className="container mx-auto">
          <Landing />
        </div>
      </div>
    </>
  )
}
