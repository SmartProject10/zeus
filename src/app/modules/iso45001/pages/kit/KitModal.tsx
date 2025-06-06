import * as Yup from 'yup'
import { useFormik } from 'formik'
// import { dateInput } from '@zeus/app/utils/dateFormat'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

const kitSchema = Yup.object().shape({
	numero: Yup.number()
		.min(1, 'Número debe ser mayor a 1')
		.required('Número requerido'),
	codigo: Yup.string().required('Codigo Requerido'),
	sede: Yup.string().required('Sede requerido'),
	area: Yup.string().required('Área requerida'),
	tipo: Yup.string().required('Tipo requerido'),
	ubicacion: Yup.string().required('Úbicación requerida'),
})

const initialValues = {
	codigo: '',
	numero: 1,
	ubicacion: '',
	area: '',
	sede: '',
	tipo: '',
}

function KitModal({ setNewData }: any) {
	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues,
		validationSchema: kitSchema,
		onSubmit: (values) => {
			setNewData(values)

			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer
					toast.onmouseleave = Swal.resumeTimer
				},
			})
			Toast.fire({
				icon: 'success',
				title: 'Kit creado correctamente!',
			})

			const closeButton = document.getElementById('closeButton')
			if (closeButton) {
				closeButton.click()
			}
		},
	})

	//#region Formulario y Contenido tabla
	const [tableData, setTableData] = useState<any>([])
	const [nombre, setNombre] = useState<any>('')
	const [tipo, setTipo] = useState('')
	const [unidad, setUnidad] = useState('')
	const [cantidad, setCantidad] = useState<any>(1)
	const [isEditTableData, setIsEditTableData] = useState({
		index: undefined,
		edit: false,
	})
	const [uneditableModal, setUneditableModal] = useState(false)

	useEffect(() => {
		///(si el botón por el cual se llamó al modal tiene el atributo "data-uneditable" se mostrará el modal de forma ineditable)
		const handleShow = (event: any) => {
			if (event.relatedTarget) {
				setUneditableModal(event.relatedTarget.hasAttribute('data-uneditable'))
			}
		}
		//(se agrega el evento handleShow)
		const modal = document.getElementById('staticBackdrop')
		if (modal) {
			modal.addEventListener('show.bs.modal', handleShow)
		}
		//(se remueve el evento handleShow)
		return () => {
			if (modal) {
				modal.removeEventListener('show.bs.modal', handleShow)
			}
		}
	}, [])

	const handleAddEditTableData = () => {
		console.log(tipo)
		if (!nombre || !unidad || !cantidad || !tipo) {
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer
					toast.onmouseleave = Swal.resumeTimer
				},
			})
			Toast.fire({
				icon: 'error',
				title: 'Por favor rellene todos los campos',
			})

			return
		}

		const data = Object.assign({ nombre, unidad, cantidad, tipo })
		if (!isEditTableData.edit) {
			setTableData((currData: any) => [...currData, data])
			console.log(data)
		} else {
			const indice = isEditTableData.index
			setTableData((currData: any) =>
				currData.map((row: any, index: any) =>
					index === indice ? { ...row, ...data } : row,
				),
			)
		}

		setNombre('')
		setUnidad('')
		setCantidad(1)
		setTipo('')
		setIsEditTableData({ index: undefined, edit: false })
	}

	// const handleEditData = (indice: number, data: any) => {
	// 	setNombre(data.nombre)
	// 	setUnidad(data.unidad)
	// 	setCantidad(data.cantidad)
	// 	setTipo(data.tipo)
	//
	// 	setIsEditTableData({ index: indice, edit: true })
	// }

	const handleDeleteData = (indice: number) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showCancelButton: true,
			showConfirmButton: true,
			timer: undefined,
		})

		Toast.fire({
			title: '¿Está seguro que desea eliminar el kit antiderrame?',
			icon: 'error',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar',
		}).then((result) => {
			if (result.isConfirmed) {
				console.log(typeof indice)
				const newArr = tableData.filter((data: any, index: any) => index !== indice)
				setTableData(newArr)
			}
		})
	}

	//#endregion

	return (
		////////////////(MODAL EDITABLE)

		!uneditableModal ? (
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-scrollable modal-lg">
					<form onSubmit={handleSubmit} className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title" id="staticBackdropLabel">
								Nuevo kit de antiderrame
							</h1>
							<button
								type="button"
								id="closeButton"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="card shadow-none mb-10">
								<div className="card-body bg-secondary card-blank">
									<div className="row gy-4 ">
										<div className="col-sm-6">
											<label htmlFor="codigo" className="required form-label">
												Código
											</label>
											<input
												type="text"
												className={clsx(
													'form-control ',
													{ 'is-invalid': touched.codigo && errors.codigo },
													{
														'is-valid': touched.codigo && !errors.codigo,
													},
												)}
												placeholder="Código"
												id="codigo"
												{...getFieldProps('codigo')}
											/>
											{touched.codigo && errors.codigo && (
												<div className="text-danger small">
													<span role="alert">{errors.codigo}</span>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label htmlFor="numero" className="required form-label">
												Numero
											</label>
											<input
												type="number"
												min={1}
												className={clsx(
													'form-control ',
													{ 'is-invalid': touched.numero && errors.numero },
													{
														'is-valid': touched.numero && !errors.numero,
													},
												)}
												placeholder="Número"
												id="numero"
												{...getFieldProps('numero')}
											/>
											{touched.numero && errors.numero && (
												<div className="text-danger small">
													<span role="alert">{errors.numero}</span>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label htmlFor="sede" className="required form-label">
												Sede
											</label>
											<select
												id="sede"
												className={clsx(
													'form-select ',
													{ 'is-invalid': touched.sede && errors.sede },
													{
														'is-valid': touched.sede && !errors.sede,
													},
												)}
												aria-label="Select example"
												{...getFieldProps('sede')}
											>
												<option>Seleccione</option>
												<option value="Norte">Norte</option>
												<option value="Sur">Sur</option>
												<option value="Oeste">Oeste</option>
											</select>
											{touched.sede && errors.sede && (
												<div className="text-danger small">
													<span role="alert">{errors.sede}</span>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label htmlFor="area" className="required form-label">
												Área
											</label>
											<select
												id="area"
												className={clsx(
													'form-select ',
													{ 'is-invalid': touched.area && errors.area },
													{
														'is-valid': touched.area && !errors.area,
													},
												)}
												aria-label="Select example"
												{...getFieldProps('area')}
											>
												<option>Seleccione</option>
												<option value="Gerencia">Gerencia</option>
												<option value="Gerencia industrial">
													Gerencia industrial
												</option>
											</select>
											{touched.area && errors.area && (
												<div className="text-danger small">
													<span role="alert">{errors.area}</span>
												</div>
											)}
										</div>
										<div className="col-12">
											<label
												htmlFor="ubicacion"
												className="required form-label"
											>
												Ubicación
											</label>
											<textarea
												className={clsx(
													'form-control ',
													{
														'is-invalid': touched.ubicacion && errors.ubicacion,
													},
													{
														'is-valid': touched.ubicacion && !errors.ubicacion,
													},
												)}
												placeholder="Ubicación"
												id="ubicacion"
												{...getFieldProps('ubicacion')}
											/>
											{touched.ubicacion && errors.ubicacion && (
												<div className="text-danger small">
													<span role="alert">{errors.ubicacion}</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="card shadow-none mb-0">
								<div className="card-body bg-secondary ">
									<div className="row gy-4 mb-10">
										<div className="col-sm-6">
											<label htmlFor="nombre" className="required form-label">
												Nombre
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Nombre"
												id="nombre"
												value={nombre}
												onChange={(e) => setNombre(e.target.value)}
											/>
										</div>
										<div className="col-sm-6">
											<label htmlFor="unidad" className="required form-label">
												Unidad
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Unidad"
												id="unidad"
												value={unidad}
												onChange={(e) => setUnidad(e.target.value)}
											/>
										</div>
										<div className="col-sm-6">
											<label htmlFor="cantidad" className="required form-label">
												Cantidad
											</label>
											<input
												type="number"
												className="form-control"
												placeholder="Cantidad"
												id="cantidad"
												min={0}
												value={cantidad}
												onChange={(e) => setCantidad(e.target.value)}
											/>
										</div>
										<div className="col-sm-6">
											<label htmlFor="tipo" className="required form-label">
												Tipo
											</label>
											<select
												id="tipo"
												className={clsx(
													'form-select ',
													{ 'is-invalid': touched.tipo && errors.tipo },
													{
														'is-valid': touched.tipo && !errors.tipo,
													},
												)}
												aria-label="Select example"
												{...getFieldProps('tipo')}
												onChange={(e) => {
													const value = e.target.value
													setTipo(value)
													getFieldProps('tipo').onChange(e)
												}}
											>
												<option value="">Seleccione</option>
												<option value="Epps">Epps</option>
												<option value="Otros">Otros</option>
											</select>
											{touched.tipo && errors.tipo && (
												<div className="text-danger small">
													<span role="alert">{errors.tipo}</span>
												</div>
											)}
										</div>
										<div className="col-12 text-end">
											<button
												type="button"
												onClick={handleAddEditTableData}
												className="btn btn-sm btn-primary"
											>
												{isEditTableData.edit ? 'Guardar' : 'Agregar'}
											</button>
										</div>
									</div>
									<hr />
									<div className="table-responsive mt-10">
										<table className="table table-secondary table-row-gray-300 align-middle gs-7">
											<thead>
												<tr className="fw-bold border-bottom-2 border-gray-200">
													<th>Nombre</th>
													<th>Unidad</th>
													<th>Cantidad</th>
													<th>Tipo</th>
													<th>Acciones</th>
												</tr>
											</thead>
											<tbody>
												{tableData.length > 0 ? (
													<>
														{tableData.map((data: any, index: any) => (
															<tr key={index}>
																<td>{data.nombre}</td>
																<td>{data.unidad}</td>
																<td>{data.cantidad}</td>
																<td>{data.tipo}</td>
																<td>
																	<div className="d-flex gap-2">
																		{/* <button type="button" onClick={() => handleEditData(index, data)} className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary" data-bs-toggle="tooltip" title="Editar">
                                                                <i className="fas fa-edit fs-4"></i>
                                                            </button> */}
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
														<td colSpan={6}>Sin datos</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								id="closeButton"
								data-bs-dismiss="modal"
							>
								Cerrar
							</button>
							<button
								type="submit"
								className="btn btn-success"
								// disabled={isSubmitting || !isValid}
							>
								Guardar
							</button>
						</div>
					</form>
				</div>
			</div>
		) : (
			////////////////(MODAL INEDITABLE)

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-scrollable modal-lg">
					<form className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title" id="staticBackdropLabel">
								Nuevo kit
							</h1>
							<button
								type="button"
								id="closeButton"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="card shadow-none mb-10">
								<div className="card-body bg-secondary card-blank">
									<div className="row gy-4 ">
										<div className="col-sm-6">
											<label htmlFor="numero" className="form-label">
												Número
											</label>
											<input
												type="number"
												min={1}
												className="form-control"
												placeholder="Número"
												id="numero"
												{...getFieldProps('numero')}
												disabled
											/>
											{touched.numero && errors.numero && (
												<div className="text-danger small">
													<span role="alert">{errors.numero}</span>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label htmlFor="sede" className="form-label">
												Sede
											</label>
											<select
												id="sede"
												className="form-select"
												aria-label="Select example"
												{...getFieldProps('sede')}
												disabled
											>
												<option>Seleccione</option>
												<option value="Norte">Norte</option>
												<option value="Sur">Sur</option>
												<option value="Oeste">Oeste</option>
											</select>
										</div>
										<div className="col-sm-6">
											<label htmlFor="area" className="form-label">
												Área
											</label>
											<select
												id="area"
												className="form-select"
												aria-label="Select example"
												{...getFieldProps('area')}
												disabled
											>
												<option>Seleccione</option>
												<option value="Gerencia">Gerencia</option>
												<option value="Gerencia industrial">
													Gerencia industrial
												</option>
											</select>
										</div>
										<div className="col-12">
											<label htmlFor="ubicacion" className="form-label">
												Ubicación
											</label>
											<textarea
												className="form-control"
												placeholder="Ubicación"
												id="ubicacion"
												{...getFieldProps('ubicacion')}
												disabled
												style={{ resize: 'none' }}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="card shadow-none mb-0">
								<div className="card-body bg-secondary ">
									<div className="row gy-4 mb-10">
										<div className="col-sm-6">
											<label htmlFor="nombre" className="form-label">
												Nombre
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Nombre"
												id="nombre"
												value={nombre}
												disabled
											/>
										</div>
										<div className="col-sm-6">
											<label htmlFor="unidad" className="form-label">
												Unidad
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Unidad"
												id="unidad"
												value={unidad}
												disabled
											/>
										</div>
										<div className="col-sm-6">
											<label htmlFor="cantidad" className="form-label">
												Cantidad
											</label>
											<input
												type="number"
												className="form-control"
												placeholder="Cantidad"
												id="cantidad"
												min={0}
												value={cantidad}
												disabled
											/>
										</div>
										<div className="col-sm-6">
											<label htmlFor="tipo" className="required form-label">
												Tipo
											</label>
											<select
												id="tipo"
												className={clsx(
													'form-select ',
													{ 'is-invalid': touched.tipo && errors.tipo },
													{
														'is-valid': touched.tipo && !errors.tipo,
													},
												)}
												aria-label="Select example"
												// value={tipo}
												// onChange={(e) => setTipo(e.target.value)}
												{...getFieldProps('tipo')}
												disabled
											>
												<option>Seleccione</option>
												<option value="Epps">Epps</option>
												<option value="Otros">Otros</option>
											</select>
											{touched.tipo && errors.tipo && (
												<div className="text-danger small">
													<span role="alert">{errors.tipo}</span>
												</div>
											)}
										</div>
									</div>
									<hr />
									<div className="table-responsive mt-10">
										<table className="table table-secondary table-row-gray-300 align-middle gs-7">
											<thead>
												<tr className="fw-bold border-bottom-2 border-gray-200">
													<th>Nombre</th>
													<th>Unidad</th>
													<th>Cantidad</th>
													<th>Tipo</th>
													<th>Acciones</th>
												</tr>
											</thead>
											<tbody>
												{tableData.length > 0 ? (
													<>
														{tableData.map((data: any, index: any) => (
															<tr key={index}>
																<td>{data.nombre}</td>
																<td>{data.unidad}</td>
																<td>{data.cantidad}</td>
																<td>{data.tipo}</td>
																<td>
																	<div className="d-flex gap-2"></div>
																</td>
															</tr>
														))}
													</>
												) : (
													<tr className="text-center">
														<td colSpan={6}>Sin datos</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								id="closeButton"
								data-bs-dismiss="modal"
							>
								Cerrar
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	)
}

export default KitModal
