import { useLayout } from '@zeus/app/generalcomponents/layoutprovider/LayoutProvider'
import {PageTitle} from './PageTitle'

const PageTitleWrapper = () => {
  const {config} = useLayout()
  if (!config.app?.pageTitle?.display) {
    return null
  }

  return <PageTitle />
}

export {PageTitleWrapper}
