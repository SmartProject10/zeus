import { FC } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'

export const Item2: FC = () => {
  return (
    <div className='timeline-item'>
      <div className='timeline-line w-40px'></div>

      <div className='timeline-icon symbol symbol-circle symbol-40px'>
        <div className='symbol-label bg-light'>
          <KTIcon iconName='pointers' className='fs-2 text-gray-500' />
        </div>
      </div>

      <div className='timeline-content mb-10 mt-n2'>
        <div className='overflow-auto pe-3'>
          <div className='fs-5 fw-bold mb-2'>
            Invitation for crafting engaging designs that speak human workshop
          </div>

          <div className='d-flex align-items-center mt-1 fs-6'>
            <div className='text-muted me-2 fs-7'>Sent at 4:23 PM by</div>

            <div
              className='symbol symbol-circle symbol-25px'
              data-bs-toggle='tooltip'
              data-bs-boundary='window'
              data-bs-placement='top'
              title='Alan Nilson'
            >
              <img src={toAbsoluteUrl('media/avatars/300-1.jpg')} alt='img' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
