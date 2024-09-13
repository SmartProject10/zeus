import {FC} from 'react'
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
  ChartsWidget4,
  ChartsWidget5,
  ChartsWidget6,
  ChartsWidget7,
  ChartsWidget8,
} from '../../../../_zeus/partials/widgets'
import { ToolbarWrapper } from '../../../../_zeus/layout/components/toolbar'
import { Content } from '../../../../_zeus/layout/components/content'

export const Charts: FC = () => {
  return (
    <>
      <ToolbarWrapper />
      <Content>
        {/* begin::Row */}
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <ChartsWidget1 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-6'>
            <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <ChartsWidget3 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-6'>
            <ChartsWidget4 className='card-xl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <ChartsWidget5 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-6'>
            <ChartsWidget6 className='card-xl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
        {/* end::Row */}

        {/* begin::Row */}
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <ChartsWidget7 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-6'>
            <ChartsWidget8 className='card-xl-stretch mb-5 mb-xl-8' />
          </div>
        </div>
        {/* end::Row */}
      </Content>
    </>
  )
}