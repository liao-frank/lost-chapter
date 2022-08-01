import './Dashboard.scss'

import { Link, Navigate } from 'react-router-dom'

import { SOURCE_URL_LOCALSTORAGE_KEY } from '../consts'
import { isValidData } from '../lib/data'
import useFetch from '../lib/hooks/useFetch'
import { useLocalStorageString } from '../lib/hooks/useLocalStorage'
import { LostChapterIcon } from './Icon'
import { PlayerTable } from './PlayerTable'

export const Dashboard = () => {
  const [sourceUrl] = useLocalStorageString(SOURCE_URL_LOCALSTORAGE_KEY, '')
  if (!sourceUrl) return <Navigate to="/"></Navigate>

  const { data, error } = useFetch<any>(sourceUrl)
  if (error || (data && !isValidData(data))) return <Navigate to="/"></Navigate>

  return (
    <div className="dashboard container">
      <nav className="flex items-center justify-between py-6 w-full">
        <a
          className="logo clickable"
          href="https://github.com/liao-frank/lost-chapter"
          target="_blank"
        >
          <LostChapterIcon className="relative right-2" size="3rem" />
          <h1>Lost Chapter</h1>
        </a>
        <Link to="/">
          <button>Change&nbsp;&nbsp;Servers</button>
        </Link>
      </nav>
      <hr className="border-[#3d4244] min-w-full w-screen" />
      {data ? (
        <PlayerTable className="mt-12" data={data} />
      ) : (
        <div className="flex grow items-center justify-center pb-24 title">
          <span>LOADING...</span>
        </div>
      )}
    </div>
  )
}
