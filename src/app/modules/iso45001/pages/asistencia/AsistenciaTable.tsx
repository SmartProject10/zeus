import { KTCard, KTCardBody } from '@zeus/_zeus/helpers'
import VerButton from './buttons/VerButton'
import EditarButton from './buttons/EditarButton'

function AsistenciaTable({ dataSource, handleSeeData , handleUpdateData }: any) {
	return (
		<KTCard>
			<KTCardBody className="py-4 card card-grid min-w-full">
				{/* Tabla */}
				<div className="table-responsive">
					<table className="table table-striped align-middle gy-7">
						<thead>
							<tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
								<th>Tipo</th>
								<th>Sede</th>
								<th>Fecha</th>
								<th>Elaborado por</th>
								<th>Subido por</th>
								<th>DNI</th> {/* Campo no editable */}
								<th>Área</th> {/* Campo no editable */}
								<th>Cargo</th> {/* Campo no editable */}
								<th>Firma</th> {/* Campo no editable */}
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{dataSource.map((item, index) => (
								<tr key={index}>
									<td><span className="text-muted">{item.tipo}</span></td>
									<td><span className="text-muted">{item.sede}</span></td>
									<td><span className="text-muted">{item.fecha}</span></td>
									<td><span className="text-muted">{item.elaboradoPor}</span></td>
									<td><span className="text-muted">{item.subidoPor}</span></td>
									<td><span className="text-muted">{item.dni}</span></td>
									<td><span className="text-muted">{item.area}</span></td>
									<td><span className="text-muted">{item.cargo}</span></td>
									<td><span className="text-muted">{item.firma}</span></td>
									<td>
										<VerButton item={item} onClick={handleSeeData} />
										<EditarButton item={item} onClick={handleUpdateData} />
									</td>
								</tr>
							))}
						</tbody>

					</table>
				</div>
			</KTCardBody>
		</KTCard>
	)
}

export default AsistenciaTable
