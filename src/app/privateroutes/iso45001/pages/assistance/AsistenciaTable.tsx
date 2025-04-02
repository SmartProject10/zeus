// @ts-nocheck
import { useState } from 'react'
import { KTCard, KTCardBody } from '@zeus/app/generalcomponents/helpers'
import AsistenciaModal from './AsistenciaModal' // Importar tu componente modal

function AsistenciaTable({ dataSource, handleSeeData }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedItem, setSelectedItem] = useState(null)

	// Función para abrir el modal y pasar el item seleccionado
	const handleEditClick = (item: any) => {
		setSelectedItem(item) // Guardar el item seleccionado
		setIsModalOpen(true) // Abrir el modal
	}

	// Función para cerrar el modal
	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedItem(null) // Limpiar el item seleccionado al cerrar
	}

	return (
		<>
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
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												title="Ver"
												onClick={() => handleSeeData(item)}
											>
												<i className="fas fa-eye fs-4"></i>
											</button>
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												title="Editar"
												onClick={() => handleEditClick(item)} // Abre el modal
											>
												<i className="fas fa-edit fs-4"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</KTCardBody>
			</KTCard>

			{/* Modal de edición */}
			{isModalOpen && (
				<div
className="modal show d-block" tabIndex={-1}
role="dialog">
					<div className="modal-dialog modal-xl">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Editar Asistencia</h5>
								<button
type="button" className="btn-close"
onClick={handleCloseModal}></button>
							</div>
							<div className="modal-body">
								<AsistenciaModal item={selectedItem} /> {/* Pasar el item al modal */}
							</div>
							<div className="modal-footer">
								<button
type="button" className="btn btn-secondary"
onClick={handleCloseModal}>
									Cerrar
								</button>
								<button type="button" className="btn btn-primary">
									Guardar Cambios
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AsistenciaTable
