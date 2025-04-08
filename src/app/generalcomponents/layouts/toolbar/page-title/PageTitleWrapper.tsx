import { useLayout } from '../../layoutprovider/LayoutProvider.tsx'
import {PageTitle} from './PageTitle'

const PageTitleWrapper = () => {
  const {config} = useLayout()
  if (!config.app?.pageTitle?.display) {
    return null
  }

  return <PageTitle />
}

export {PageTitleWrapper}
