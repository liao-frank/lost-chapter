import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import backgroundPath from '../images/background.png'
import './App.scss'
import { Scrollable } from './Scrollable'

export const App = () => {
  // Lazy load fancy background.
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
      <Scrollable className="app">
        <div className="container h-full mx-auto">
          <Outlet />
        </div>
      </Scrollable>
    </>
  )
}
