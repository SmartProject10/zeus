import { KTIcon } from '@zeus/_zeus/helpers'

import './FichaUsuario.scss'

function Pagination () {
	return (
		<ul className="pagination">
			<li className="page-item previous disabled">
				<a href="#" className="page-link">
					<i className="previous"></i>
				</a>
			</li>

			<li className="page-item "><a href="#" className="page-link">1</a></li>
			<li className="page-item active"><a href="#" className="page-link">2</a></li>
			<li className="page-item "><a href="#" className="page-link">3</a></li>
			<li className="page-item "><a href="#" className="page-link">4</a></li>
			<li className="page-item "><a href="#" className="page-link">5</a></li>
			<li className="page-item "><a href="#" className="page-link">6</a></li>

			<li className="page-item next">
				<a href="#" className="page-link">
					<i className="next"></i>
				</a>
			</li>
		</ul>
	)
}

const data = [
	{
		id: 1,
		course: 'Curso de Ingeniería Informática',
		program: 'Programa de Ingeniería Informática',
		duration: '2 años',
		status: 'Completado',
		assistance: 'Asistencia',
		note: '4.0',
		certificate: 'Certificado',
	},
]

function CourseHistoryTable () {
	return (
		<div className="table-response my-16">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Curso</th>
						<th>Programa</th>
						<th>Duración</th>
						<th>Estado</th>
						<th>Asistencia</th>
						<th>Nota</th>
						<th>Certificado</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.course}</td>
									<td>{item.program}</td>
									<td>{item.duration}</td>
									<td>{item.status}</td>
									<td>{item.assistance}</td>
									<td>{item.note}</td>
									<td>{item.certificate}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

function CourseHistory () {
	return (
		<div className="card">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">Historial</h5>
				<button className="btn btn-primary btn-sm">
					<KTIcon
						iconName="add-item"
						iconType="duotone" 
					/>
					Exportar
				</button>
			</div>
			<div className="card-body">
				<div className="card-content">
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique ea quis eum voluptatibus, quisquam dolor perferendis recusandae laudantium aliquid temporibus impedit placeat dolorum, fugit illum quidem maiores, sint blanditiis unde.
					</p>
				</div>
				<CourseHistoryTable />
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
				</div>
			</div>
		</div>
	)
}

function PersonalInformation () {
	return (
		<div className="row">
			<div className="col-3">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis odio asperiores neque animi laborum expedita repudiandae explicabo, modi eos ad, tempore ipsa fugiat autem reprehenderit harum excepturi inventore doloremque facere!
				</p>
			</div>
			<div className="col-9">
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis debitis id sequi repellat nihil? Error distinctio maiores laudantium! Ipsa commodi consequatur sequi similique doloremque tempore alias, neque quasi fugit cumque.
				</p>
			</div>
		</div>
	)
}

export function FichaUsuario() {
  return (
    <div className="ficha-usuario w-100">
      <div className="d-flex flex-column align-items-center w-100">
        <img 
					src="https://placeholder.co/200.png"
					alt=""
					className="rounded-circle border border-info border-4" 
				/>

        <p className="fw-bold fs-1 mt-5 mb-2">Jhunior Chavez Cruz</p>
        <p className="fw-bold fs-4 text-muted">Tecnologico medico de post procesamiento</p>

        <button
					className="btn btn-outline btn-outline-info btn-active-light-info">
          <KTIcon
						iconName="add-item"
						iconType="duotone" 
					/>
          Organigrama
        </button>
      </div>

      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
        <li className="nav-item">
          <a
            className="nav-link active btn-active-light-secondary"
            data-bs-toggle="tab"
            href="#kt_tab_pane_1"
          >
            Información laboral y personal
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_2"
          >
            Historial de cursos
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_3"
          >
            Historial de evaluación de desempeño
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_4"
          >
            Documentos informativos
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade active show"
          id="kt_tab_pane_1"
          role="tabpanel"
        >
					<PersonalInformation />
				</div>
        <div
					className="tab-pane fade"
					id="kt_tab_pane_2"
					role="tabpanel"
				>
					<CourseHistory />
				</div>
        <div
					className="tab-pane fade"
					id="kt_tab_pane_3"
					role="tabpanel"
				>
          Sint sit mollit irure quis est nostrud cillum consequat Lorem
          esse do quis dolor esse fugiat sunt do. Eu ex commodo veniam
          Lorem aliquip laborum occaecat qui Lorem esse mollit dolore anim
          cupidatat. eserunt officia id Lorem nostrud aute id commodo elit
          eiusmod enim irure amet eiusmod qui reprehenderit nostrud
          tempor. Fugiat ipsum excepteur in aliqua non et quis aliquip ad
          irure in labore cillum elit enim. Consequat aliquip incididunt
          ipsum et minim laborum laborum laborum et cillum labore.
          Deserunt adipisicing cillum id nulla minim nostrud labore
          eiusmod et amet.
        </div>
      </div>
    </div>
  )
}
