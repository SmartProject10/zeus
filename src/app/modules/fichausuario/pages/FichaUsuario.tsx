import { KTIcon } from '@zeus/_zeus/helpers';
import './FichaUsuario.scss';

export function FichaUsuario() {
  return (
    <div className='ficha-usuario w-100'>
      <div className="d-flex flex-column align-items-center w-100">
        <img src="https://placeholder.co/200.png" alt="" className="rounded-circle border border-info border-4" />
        <p className='fw-bold fs-1 mt-5 mb-2'>Jhunior Chavez Cruz</p>
        <p className='fw-bold fs-4 text-muted'>Tecnologico medico de post procesamiento</p>
        <button className='btn btn-outline btn-outline-info btn-active-light-info'>
          <KTIcon iconName='add-item' iconType='duotone' />
          Organigrama
        </button>
      </div>
    </div>
  )
}