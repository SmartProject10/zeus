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
		institute: 'Instituto',
		concept: 'Concepto',
		certificate: 'Certificado',
		year: 'Año de capacitación',
	},
]

function ExternalTrainingTable () {
	return (
		<div className="table-response">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Institución</th>
						<th>Concepto</th>
						<th>Certificado / Constancia</th>
						<th>Año de capacitación</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.institute}</td>
									<td>{item.concept}</td>
									<td>{item.certificate}</td>
									<td>{item.year}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export function ExternalTrainingSection () {
	return (
		<div className="card mb-8" id="external-training">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">
					Capacitaciones externas
				</h5>
				<button className="btn btn-primary btn-sm">
					<KTIcon
						iconName="add-item"
						iconType="duotone" 
					/>
					Agregar
				</button>
			</div>
			<div className="card-body">
				<div className="card-content">
					<ExternalTrainingTable />

					<div className="d-flex justify-content-end mt-16">
						<div className="flex-1"></div>
						<Pagination />
					</div>
				</div>
			</div>
		</div>
	)
}
