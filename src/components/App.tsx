import backgroundPath from '../images/background.png'
import './App.scss'

import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

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
        <div className="h-full mx-auto w-full">
          <Outlet />
        </div>
      </Scrollable>
    </>
  )
}
