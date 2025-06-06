
import { FC } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../dropdown/Dropdown1'

type Props = {
  image: string
  title: string
  description: string
  status: 'up' | 'down'
  statusValue: number
  statusDesc: string
  progress: number
  progressType: string
}

export const Card5: FC<Props> = ({
  image,
  title,
  description,
  status,
  statusValue,
  statusDesc,
  progress,
  progressType,
}) => {
  return (
    <div className='card h-100'>
      <div className='card-header flex-nowrap border-0 pt-9'>
        <div className='card-title m-0'>
          <div className='symbol symbol-45px w-45px bg-light me-5'>
            <img src={toAbsoluteUrl(image)} alt='Metronic' className='p-3' />
          </div>

          <a href='#' className='fs-4 fw-bold text-hover-primary text-gray-600 m-0'>
            {title}
          </a>
        </div>

        <div className='card-toolbar m-0'>
          <button
            type='button'
            className='btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary me-n3'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-3 text-primary' />
          </button>

          <Dropdown1 />
        </div>
      </div>

      <div className='card-body d-flex flex-column px-9 pt-6 pb-8'>
        <div className='fs-2tx fw-bolder mb-3'>{description}</div>

        <div className='d-flex align-items-center flex-wrap mb-5 mt-auto fs-6'>
          {status === 'up' && (
            <KTIcon iconName='arrow-up-right' className='fs-3 me-1 text-success' />
          )}

          {status === 'down' && (
            <KTIcon iconName='arrow-down-right' className='fs-3 me-1 text-danger' />
          )}

          <div className={`fw-bolder me-2 ` + (status === 'up' ? 'text-success' : 'text-danger')}>
            {status === 'up' ? '+' : '-'}
            {statusValue}%
          </div>

          <div className='fw-bold text-gray-500'>{statusDesc}</div>
        </div>

        <div className='d-flex align-items-center fw-bold'>
          <span className='badge bg-light text-gray-700 px-3 py-2 me-2'>{progress}%</span>
          <span className='text-gray-500 fs-7'>{progressType}</span>
        </div>
      </div>
    </div>
  )
}
