import { KTIcon } from '@zeus/_zeus/helpers'

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

export function CourseHistory () {
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
