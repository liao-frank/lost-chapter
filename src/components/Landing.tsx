import classNames from 'classnames'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
import { isWebUri } from 'valid-url'

import { SOURCE_URL_LOCALSTORAGE_KEY } from '../consts'
import { isValidData } from '../lib/data'
import useFetch from '../lib/hooks/useFetch'
import { useLocalStorageString } from '../lib/hooks/useLocalStorage'
import { useNavigate } from '../lib/hooks/useNavigate'
import { useSecretPhrase } from '../lib/hooks/useSecretPhrase'
import { LostChapterIcon } from './Icon'

export const Landing = () => {
  const navigate = useNavigate()
  const isBetaTester = useSecretPhrase(
    'imbetatester',
    'imnotbetatester',
    '20a1e058-3978-43ea-9fe7-1b4faf7ab278'
  )

  const { error, sourceUrl, validated, validating, setSourceUrl } =
    useSourceUrl()

  return (
    <div className="container flex flex-col items-center justify-center h-screen mx-auto pb-8">
      <a href="https://github.com/liao-frank/lost-chapter" target="_blank">
        <LostChapterIcon className="h-80 max-w-full w-80 sm:h-[32rem] sm:w-[32rem]" />
      </a>
      <div className="mt-12 subtitle">Lost Chapter</div>
      <div className="flex flex-col items-center justify-start mt-2 relative w-full">
        <div
          className={classNames(
            'text-center title',
            isBetaTester && 'invisible'
          )}
        >
          Coming Soon
        </div>
        {isBetaTester && (
          <>
            <input
              className="absolute max-w-full mt-6 top-0 w-96"
              onChange={(event) => void setSourceUrl(event.target.value)}
              placeholder="Paste your server here"
              spellCheck="false"
              value={sourceUrl}
            />
            <div
              className={classNames('absolute mt-24')}
              style={{ backfaceVisibility: 'hidden' }}
            >
              {error && <span className="text-[#EF5350]">{error.message}</span>}
              {validating && <span>Checking server data...</span>}
              {validated && (
                <button
                  onClick={() => {
                    navigate('/dashboard')
                  }}
                >
                  Enter
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const useSourceUrl = (): {
  error?: Error
  sourceUrl: string
  setSourceUrl: (url: string) => void
  validated: boolean
  validating: boolean
} => {
  const [error, setError] = useState<Error | undefined>()
  const [fetching, setFetching] = useState(false)
  const [validated, setValidated] = useState(false)

  const resetValidationState = () => {
    setError(undefined)
    setFetching(false)
    setValidated(false)
  }

  const [cachedUrl, _setCachedUrl] = useLocalStorageString(
    SOURCE_URL_LOCALSTORAGE_KEY,
    ''
  )
  const [inputUrl, setInputUrl] = useState(cachedUrl)

  const setCachedUrlDebounced = useCallback(
    debounce((url: string) => {
      void _setCachedUrl(url)
    }, 400),
    []
  )

  useFetch<any>(cachedUrl, undefined, (action) => {
    setFetching(action.type === 'loading')

    if (action.type === 'error') {
      if (action.payload.message.includes('Failed to fetch')) {
        setError(
          new Error(
            'Failed to retrieve data. Server either does not exist or is offline.'
          )
        )
      } else if (action.payload.message.includes('Unexpected token')) {
        setError(new Error('Data from server appears to be malformed'))
      } else {
        setError(action.payload)
      }
    } else if (action.type === 'fetched') {
      if (isValidData(action.payload)) {
        setValidated(true)
      } else {
        setError(new Error('Data from server appears to be malformed'))
      }
    }
  })

  return {
    error: validated
      ? undefined
      : inputUrl && !getValidUrl(inputUrl)
      ? new Error('Please enter a valid URL or server name')
      : error,
    validating: fetching,
    sourceUrl: inputUrl,
    setSourceUrl: (url: string) => {
      setInputUrl(url)
      resetValidationState()

      if (!url) {
        _setCachedUrl('')
        return
      }

      const validUrl = getValidUrl(url)
      if (validUrl) {
        setCachedUrlDebounced(validUrl)
      } else {
        setCachedUrlDebounced.cancel()
      }
    },
    validated,
  }
}

const getValidUrl = (maybeUrl: string): string => {
  const nicknamed = URL_NICKNAMES[maybeUrl.toLowerCase().replace(/\s/g, '')]
  if (nicknamed) maybeUrl = nicknamed

  maybeUrl = maybeUrl.trim()

  if (!maybeUrl.startsWith('http')) maybeUrl = 'http://' + maybeUrl

  if (isWebUri(maybeUrl)) {
    try {
      return new URL(maybeUrl).toString()
    } catch {}
  }

  return ''
}

const URL_NICKNAMES: { [nickname: string]: string } = {
  leaguebois: 'https://league-bois-lost-chapter.herokuapp.com/',
}
