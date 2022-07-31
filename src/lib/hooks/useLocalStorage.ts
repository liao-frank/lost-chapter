import { useLocalStorage } from 'usehooks-ts'

export const useLocalStorageString = <T = string>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [{ value }, _setValue] = useLocalStorage<{ value: T }>(key, {
    value: initialValue,
  })
  const setValue = (value: T) => void _setValue({ value })

  return [value, setValue]
}

export const useLocalStorageUndefinable = <T extends Object>(
  key: string,
  initialValue?: T
): [T | undefined, (value?: T) => void] => {
  const [_value, _setValue] = useLocalStorage<T | false>(
    key,
    initialValue || false
  )
  const value = _value ? _value : undefined
  const setValue = (value?: T) => {
    if (!value) {
      _setValue(false)
      return
    }

    _setValue(value)
  }

  return [value, setValue]
}
