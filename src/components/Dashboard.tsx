import './Dashboard.scss'

import { SOURCE_URL_LOCALSTORAGE_KEY } from '../consts'
import { isValidData } from '../lib/data'
import useFetch from '../lib/hooks/useFetch'
import { useLocalStorageString } from '../lib/hooks/useLocalStorage'
import { useNavigate } from '../lib/hooks/useNavigate'
import { LostChapterIcon } from './Icon'
import { PlayerTable } from './PlayerTable'

export const Dashboard = () => {
  const navigate = useNavigate()

  const [sourceUrl] = useLocalStorageString(SOURCE_URL_LOCALSTORAGE_KEY, '')
  if (!sourceUrl) navigate('/')

  const { data, error } = useFetch<any>(sourceUrl)
  if (error || (data && !isValidData(data))) navigate('/')

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
        <button onClick={() => void navigate('/')}>
          Change&nbsp;&nbsp;Servers
        </button>
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
