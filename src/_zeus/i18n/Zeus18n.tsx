/* eslint-disable react-refresh/only-export-components */
import {FC, createContext, useContext} from 'react'
import {WithChildren} from '../helpers'

const I18N_CONFIG_KEY = import.meta.env.VITE_APP_I18N_CONFIG_KEY || 'i18nConfig'

type Props = {
  selectedLang: 'en' | 'es'
}
const initialState: Props = {
  selectedLang: 'es',
}

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY)
  if (ls) {
    try {
      return JSON.parse(ls) as Props
    } catch (er) {
      console.error(er)
    }
  }
  return initialState
}

// Side effect
export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: lang}))
  window.location.reload()
}

const WorkerContext = createContext<Props>(initialState)

const useLang = () => {
  return useContext(WorkerContext).selectedLang
}

const WorkerProvider: FC<WithChildren> = ({children}) => {
  const lang = getConfig()
  return <WorkerContext.Provider value={lang}>{children}</WorkerContext.Provider>
}

export {WorkerProvider, useLang}
