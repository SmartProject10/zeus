import { KTIcon } from "src/app/generalcomponents/helpers"

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
		address: 'Calle 123, 123 123, 123 123',
		person: 'Persona de contacto',
		occupation: 'Ocupación',
		phone: '+56 987654321',
	},
]

function ContactDatailsTable () {
	return (
		<div className="table-response">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Dirección actualizada</th>
						<th>Persona de contacto</th>
						<th>Ocupación</th>
						<th>Celular</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.address}</td>
									<td>{item.person}</td>
									<td>{item.occupation}</td>
									<td>{item.phone}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export function ContactDetailsSection () {
	return (
		<div className="card mb-8" id="contact-details">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">
					Datos de contacto
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
					<ContactDatailsTable />

					<div className="d-flex justify-content-end mt-16">
						<div className="flex-1"></div>
						<Pagination />
					</div>
				</div>
			</div>
		</div>
	)
}
