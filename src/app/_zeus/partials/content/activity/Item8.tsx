
import { FC } from 'react'
import { KTIcon } from '../../../helpers'

export const Item8: FC = () => {
  return (
    <div className='timeline-item'>
      <div className='timeline-line w-40px'></div>

      <div className='timeline-icon symbol symbol-circle symbol-40px'>
        <div className='symbol-label bg-light'>
          <KTIcon iconName='basket' className='fs-2 text-gray-500' />
        </div>
      </div>

      <div className='timeline-content mt-n1'>
        <div className='pe-3 mb-5'>
          <div className='fs-5 fw-bold mb-2'>
            New order{' '}
            <a href='#' className='text-primary fw-bolder me-1'>
              #67890
            </a>
            is placed for Workshow Planning & Budget Estimation
          </div>

          <div className='d-flex align-items-center mt-1 fs-6'>
            <div className='text-muted me-2 fs-7'>Placed at 4:23 PM by</div>

            <a href='#' className='text-primary fw-bolder me-1'>
              Jimmy Bold
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
