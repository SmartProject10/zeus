import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '@zeus/_zeus/helpers/AssetHelpers'

export function FichaUsuario() {
  return (
    <div>
      <div className='d-flex flex-row justify-content-between'>
        <div>
          <p className='fw-bold fs-1 mb-0'>Inicio</p>
          <p className='text-muted fw-bold fs-7'>Bienvenido, Usuario</p>
        </div>

        <div>
          <button className='btn btn-secondary'>Ver ficha de usuario</button>
        </div>
      </div>
    </div>
  )
}