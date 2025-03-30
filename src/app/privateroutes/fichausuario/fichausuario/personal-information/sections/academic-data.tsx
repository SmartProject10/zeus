import { KTIcon } from "@zeus/app/_zeus/helpers"

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
		instute: 'Instituto',
		title: 'Titulo',
		level: 'Nivel',
		state: 'Estado',
		year: 'Año de graduación',
	},
]

function AcademicDataTable () {
	return (
		<div className="table-response">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Instituto</th>
						<th>Titulo</th>
						<th>Nivel</th>
						<th>Estado</th>
						<th>Año de graduación</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.instute}</td>
									<td>{item.title}</td>
									<td>{item.level}</td>
									<td>{item.state}</td>
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

export function AcademicDataSection () {
	return (
		<div className="card mb-8" id="academic-data">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">
					Datos académicos
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
					<AcademicDataTable />

					<div className="d-flex justify-content-end mt-16">
						<div className="flex-1"></div>
						<Pagination />
					</div>
				</div>
			</div>
		</div>
	)
}
