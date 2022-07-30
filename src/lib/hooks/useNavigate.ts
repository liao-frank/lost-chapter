import { useNavigate as useNavigateInternal } from 'react-router-dom'

import { GH_PAGES_BASE_PATH } from '../../consts'

export const useNavigate = (): ((path: string) => void) => {
  const navigate = useNavigateInternal()

  return (path: string) => {
    if (!path.startsWith('/')) path = '/' + path

    navigate(GH_PAGES_BASE_PATH + path)
  }
}
