
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../../core'

const MegaMenu: FC = () => {
  const {setLayoutType, setToolbarType} = useLayout()
  return (
    <div className='row'>
      {/* begin:Col */}
      <div className='col-lg-6'>
        {/* begin:Row */}
        <div className='row'>
          {/* begin:Col */}
          <div className='col-lg-6 mb-3'>
            {/* begin:Heading */}
            <h4 className='fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4'>Herramientas</h4>
            {/* end:Heading */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              {/*<a onClick={() => setLayoutType('light-sidebar')} className='menu-link'>*/}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Nuevo empleado</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Nuevo auditor externo</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Otra opcion</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Otra opcion</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
          </div>
          {/* end:Col */}
          {/* begin:Col */}
          <div className='col-lg-6 mb-3'>
            {/* begin:Heading */}
            <h4 className='fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4'>Acceso directo</h4>
            {/* end:Heading */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Mesa de ayuda</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a  className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Reporte de accidentes</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Reporte de incidentes</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Reporte de incidentes de soborno</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
            {/* begin:Menu item */}
            <div className='menu-item p-0 m-0'>
              {/* begin:Menu link */}
              <a className='menu-link'>
                <span className='menu-bullet'>
                  <span className='bullet bullet-dot bg-gray-300i h-6px w-6px'></span>
                </span>
                <span className='menu-title'>Reporte de incidentes Ambiental</span>
              </a>
              {/* end:Menu link */}
            </div>
            {/* end:Menu item */}
          </div>
          {/* end:Col */}
        </div>
        {/* end:Row */}
        <div className='separator separator-dashed mx-lg-5 mt-2 mb-6'></div>
        {/* begin:Layout Builder */}
        <div className='d-flex flex-stack flex-wrap flex-lg-nowrap gap-2 mb-5 mb-lg-0 mx-lg-5'>
          <div className='d-flex flex-column me-5'>
            <div className='fs-6 fw-bold text-gray-800'>Tienes algun problema?</div>
            <div className='fs-7 fw-semibold text-muted'>Llamanos..</div>
          </div>
          <Link to='' className='btn btn-sm btn-primary fw-bold'>
            +1 312 442 2661
          </Link>
        </div>
        {/* end:Layout Builder */}
      </div>
      {/* end:Col */}
      {/* begin:Col */}
      <div className='col-lg-6 mb-3 py-lg-3 pe-lg-8 d-flex align-items-center'>
        <img src={toAbsoluteUrl('media/stock/900x600/45.jpg')} className='rounded mw-100' alt='' />
      </div>
      {/* end:Col */}
    </div>
  )
}

export {MegaMenu}
