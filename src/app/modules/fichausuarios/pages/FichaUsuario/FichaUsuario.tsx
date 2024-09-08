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

      <div className="card">
        <img src="https://placehold.co/600x200.png" alt="" />
      </div>

      <div className="row mt-8">

        <div className="col-lg-4 col-md-6 col-xs-12">
          <div className="g-col-6 g-col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title fw-bold fs-1">Mesa de ayuda</div>
                <p className='fw-bold mt-0 mb-12'>Requieres asistencia u orientación?</p>

                <p className='fw-light fs-6'>
                  Para consultas sobre la plataforma, los cursos virtuales y otros temas,
                  comunícate con nuestros expertos. El horario de atención es de lunes a viernes en horario de oficina.
                </p>

                <div className='card bg-gray'>
                  <div className="card-body">
                    <p className='m-0 mb-2'>Horario de repuesta</p>
                    <p className='m-0 fw-bold'>8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <button className='btn btn-bg-light btn-color-info'>Registrar ticket de ayuda</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}