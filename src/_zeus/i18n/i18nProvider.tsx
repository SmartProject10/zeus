import {FC} from 'react'
import {useLang} from './Zeus18n.tsx'
import {IntlProvider} from 'react-intl'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/es'

import enMessages from './messages/en.json'
import esMessages from './messages/es.json'
import {WithChildren} from '../helpers'

const allMessages = {
  en: enMessages,
  es: esMessages
}

const I18nProvider: FC<WithChildren> = ({children}) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export {I18nProvider}
