import { KTCard, KTCardBody } from "@zeus/_zeus/helpers";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useState } from "react";

function KitTable({ dataSource, handleDeleteData }) {
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const exportToExcel = () => {
		// Crear una hoja de trabajo a partir de los datos
		const worksheet = XLSX.utils.json_to_sheet(dataSource);

		// Crear un libro de trabajo y agregar la hoja de trabajo
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Botiquines");

		// Generar un archivo de Excel
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		// Guardar el archivo usando file-saver
		const data = new Blob([excelBuffer], { type: "application/octet-stream" });

		saveAs(data, "Kit.xlsx");
	};

	return (
		<KTCard>
			<KTCardBody className="py-4 card card-grid min-w-full">
				<div className="d-grid gap-2 d-md-flex justify-content-md-end">
					<button
						onClick={exportToExcel}
						className="btn btn-success btn-sm"
						type="button"
					>
						<i className="bi bi-file-earmark-spreadsheet-fill"></i>
						Exportar a Excel
					</button>
				</div>

				{/* Tabla */}
				<div className="table-responsive">
					<table className="table table-striped align-middle gy-7 gs-7">
						<thead>
							<tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
								<th>Código</th>
								<th>Sede</th>
								<th>Número</th>
								<th>Área</th>
								<th>Ubicación</th>
								<th>Acción</th>
							</tr>
						</thead>
						<tbody>
							{dataSource.length > 0 ? (
								<>
									{dataSource.map((kit, index) => (
										<tr key={index}>
											<td>{kit.codigo}</td>
											<td>{kit.sede}</td>
											<td>{kit.numero}</td>
											<td>{kit.area}</td>
											<td>{kit.ubicacion}</td>
											<td>
												<div className="d-flex gap-2">
													{/* <button type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#staticBackdrop" className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary" data-bs-toggle='tooltip' title='Editar'>
                                                        <i className="fas fa-edit fs-4"></i>
                                                    </button> */}
													<button
														className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
														type="button"
														data-bs-toggle="modal"
														title="Editar"
														data-bs-target="#staticBackdrop"
													>
														<i className="fas fa-edit fs-4"></i>
													</button>

													<button
														type="button"
														onClick={() => handleDeleteData(index)}
														className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
														data-bs-toggle="tooltip"
														title="Eliminar"
													>
														<i className="fas fa-trash fs-4"></i>
													</button>
												</div>
											</td>
										</tr>
									))}
								</>
							) : (
								<tr className="text-center">
									<td colSpan={7}>No se encontraron kit antiderrame.</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{dataSource.length > 0 && (
					<div className="mt-2">
						<ul className="pagination">
							<li
								className={
									currentPage == 1
										? "page-item previous disabled"
										: "page-item previous"
								}
							>
								<button
									onClick={() => navigatePage("previous")}
									className="page-link"
								>
									<i className="previous"></i>
								</button>
							</li>
							{[...Array(totalPages)].map((page, i) => (
								<li
									key={i}
									className={
										currentPage == i + 1 ? "page-item active" : "page-item"
									}
								>
									<button
										// onClick={() => selectPageNavigate(i + 1)}
										className="page-link "
									>
										{i + 1}
									</button>
								</li>
							))}
							<li
								className={
									currentPage == totalPages
										? "page-item next disabled"
										: "page-item next"
								}
							>
								<button
									onClick={() => navigatePage("next")}
									className="page-link"
								>
									<i className="next"></i>
								</button>
							</li>
						</ul>
					</div>
				)}
			</KTCardBody>
		</KTCard>
	);
}

export default KitTable;
