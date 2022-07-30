import { SOURCE_URL_LOCALSTORAGE_KEY } from '../consts'
import { isValidData } from '../lib/data'
import useFetch from '../lib/hooks/useFetch'
import { useLocalStorageString } from '../lib/hooks/useLocalStorage'
import { useNavigate } from '../lib/hooks/useNavigate'
import './Dashboard.scss'
import { Scrollable } from './Scrollable'

export const Dashboard = () => {
  const navigate = useNavigate()

  const [sourceUrl] = useLocalStorageString(SOURCE_URL_LOCALSTORAGE_KEY, '')
  if (!sourceUrl) navigate('/')

  const { data, error } = useFetch<any>(sourceUrl)
  if (error || (data && !isValidData(data))) navigate('/')

  // TODO
  const loading = !data && !error

  return (
    <div className="dashboard">
      <Scrollable className="h-96 mt-12">
        <pre className="placeholder">{JSON.stringify(data, undefined, 4)}</pre>
      </Scrollable>
    </div>
  )
}
