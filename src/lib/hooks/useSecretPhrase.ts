import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export const useSecretPhrase = (
  activatePhrase: string | string[],
  deactivatePhrase?: string | string[],
  localStorageKey?: string
): boolean => {
  const [activated, setActivated] = localStorageKey
    ? useLocalStorage<boolean>(localStorageKey, false)
    : useState<boolean>(false)

  const keysRef = useRef<string[]>([])
  const maxLen =
    Math.max(activatePhrase.length, deactivatePhrase?.length || 0) + 3

  useEffect(() => {
    const onKeydown = (evt: KeyboardEvent) => {
      const keys = keysRef.current

      if (evt.key === 'Backspace') {
        keys.pop()
      } else {
        keys.push(evt.key)
      }

      if (keys.length > maxLen) {
        keys.splice(0, keys.length - maxLen)
      }

      if (checkSecretPhrase(keys, activatePhrase)) setActivated(true)
      if (deactivatePhrase && checkSecretPhrase(keys, deactivatePhrase))
        setActivated(false)
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [])

  return activated
}

const checkSecretPhrase = (pressed: string[], phrase: string | string[]) => {
  if (Array.isArray(phrase)) {
    const relevantPressed = pressed.slice(-phrase.length)
    return isEqual(relevantPressed, phrase)
  }

  for (const key of pressed) {
    if (key.length > 1) return false
  }

  return pressed.join('').endsWith(phrase)
}
