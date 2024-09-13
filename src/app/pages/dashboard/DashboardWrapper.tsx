import { FC } from 'react'
import { toAbsoluteUrl } from '../../../_zeus/helpers'
import { Content } from '../../../_zeus/layout/components/content'
import { ToolbarWrapper } from '../../../_zeus/layout/components/toolbar'
import { PageTitle } from '../../../_zeus/layout/core'
import {
  CardsWidget17,
  CardsWidget20,
  CardsWidget7,
  ListsWidget26,
} from '../../../_zeus/partials/widgets'

const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div
        className="row g-5 g-xl-10 mb-5 mb-xl-10">
        {/* begin::Col */}
        <div
          className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
          <CardsWidget20
            className="h-md-50 mb-5 mb-xl-10"
            description="Active Projects"
            color="#F1416C"
            img={toAbsoluteUrl('media/patterns/vector-1.png')}
          />
          <CardsWidget7
            className="h-md-50 mb-5 mb-xl-10"
            description="Professionals"
            icon={false}
            stats={357}
            labelColor="dark"
            textColor="gray-300"
          />
        </div>
        <div
          className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
          <CardsWidget17
            className="h-md-50 mb-5 mb-xl-10" />
          <CardsWidget7
            className="h-md-50 mb-5 mb-xl-10"
            description="Professionals"
            icon={false}
            stats={357}
            labelColor="dark"
            textColor="gray-300"
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div
          className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
          <CardsWidget17
            className="h-md-50 mb-5 mb-xl-10" />
          <ListsWidget26
            className="h-lg-50" />
        </div>
        {/* end::Col */}

        {/* begin::Col */}

        {/* end::Col */}
      </div>
      {/* end::Row */}
    </Content>
  </>
)

const DashboardWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <>
      <PageTitle
        breadcrumbs={[]}>{'Planear'}</PageTitle>
      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
