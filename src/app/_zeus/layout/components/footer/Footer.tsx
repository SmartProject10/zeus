import {useEffect} from 'react'
import {ILayout, useLayout} from '../../core'

const Footer = () => {
  const {config} = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  return (
    <>
      <div className='text-gray-900 order-2 order-md-1'>
        <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()}&copy;
        </span>
        <a
          href='https://www.instagram.com/ever.jrg/'
          target='_blank'
          className='text-gray-800 text-hover-primary'
        >
          @ever.jrg
        </a>
      </div>

      <ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
        <li className='menu-item'>
          <a href='#' target='_blank' className='menu-link px-2'>
            Sobre nosotros
          </a>
        </li>

        <li className='menu-item'>
          <a href='#' target='_blank' className='menu-link px-2'>
            Ayuda & Soporte
          </a>
        </li>

        <li className='menu-item'>
          <a
            href='#'
            target='_blank'
            className='menu-link px-2'
          >
            Política de Privacidad
          </a>
        </li>
      </ul>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export {Footer}
