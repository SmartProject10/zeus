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
		period: '2022',
		process: 'Proceso de evaluación de desempeño',
		result: 'Aprobado',
		report: 'Reporte de evaluación de desempeño',
	},
]

function PerformanceEvaluationTable () {
	return (
		<div className="table-response my-16">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Periodo</th>
						<th>Proceso</th>
						<th>Resultado final</th>
						<th>Reporte</th>
					</tr>
				</thead>
				<tbody>
					{
						data.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.period}</td>
									<td>{item.process}</td>
									<td>{item.result}</td>
									<td>{item.report}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export function PerformanceEvaluation () {
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
				<PerformanceEvaluationTable />
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
				</div>
			</div>
		</div>
	)
}
