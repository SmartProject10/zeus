import {FC} from 'react'
import {
  FeedsWidget2,
  FeedsWidget3,
  FeedsWidget4,
  FeedsWidget5,
  FeedsWidget6,
} from '../../../../_zeus/partials/widgets'
import { ToolbarWrapper } from '../../../../_zeus/layout/components/toolbar'
import { Content } from '../../../../_zeus/layout/components/content'

export const Feeds: FC = () => {
  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div
className="row g-5 g-xl-8">
            {/* begin::Col */}
            <div
className="col-xl-6">
              <FeedsWidget2
className="mb-5 mb-xl-8" />

              <FeedsWidget3
className="mb-5 mb-xl-8" />

              <FeedsWidget4
className="mb-5 mb-xl-8" />
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div
className="col-xl-6">
              <FeedsWidget5
className="mb-5 mb-xl-8" />

              <FeedsWidget6
className="mb-5 mb-xl-8" />
            </div>
            {/* end::Col */}
        </div>
      </Content>
    </>
  )
}
