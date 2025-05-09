'use client'
import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { faEdit, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Extintor = {
	id: number
	codigo: string
	numeroExtintor: number
	sede: string
	area: string
	ubicacion: string
	tipoExtintor: string
	peso: number
	fechaFabricacion: string
	fechaPruebaHidrostatica: string
	fechaRecarga: string
	fechaIngreso: string
	certificacion: string
	file?: File | null
}

type Extinguisher = {
	id: number
	name: string
	unit: 'Kg' | 'L'
}

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
	if (!isOpen) return null

	return (
		<>
			<div
				className="modal-backdrop"
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					zIndex: 1040,
				}}
			/>
			<div className="modal show" style={{ display: 'block', zIndex: 1050 }}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Confirmar Eliminación</h5>
							<button
								type="button"
								className="btn-close"
								onClick={onClose}
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<p>¿Estás seguro de que deseas eliminar este extintor?</p>
						</div>
						<div className="modal-footer">
							<button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
							<button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export function ExtintoresPage(): JSX.Element {
	const [extintores, setExtintores] = useState<Extintor[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editModalOpen, setEditModalOpen] = useState(false)
	const [currentExtintor, setCurrentExtintor] = useState<Extintor | null>(null)
	const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
	const [extintorToDelete, setExtintorToDelete] = useState<number | null>(null)

	const [isOpen, setIsOpen] = useState(false)
	const [name, setName] = useState('')
	const [unit, setUnit] = useState<'Kg' | 'L'>('Kg')
	const [extinguishers, setExtinguishers] = useState<Extinguisher[]>([])
	const [deleteId, setDeleteId] = useState<number | null>(null)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const handleAdd = () => {
		if (name) {
			setExtinguishers([...extinguishers, { id: Date.now(), name, unit }])
			setName('')
			setUnit('Kg')
		}
	}

	const handleDeleteRequest = (id: number) => {
		setDeleteId(id)
		setIsConfirmOpen(true)
	}

	const handleDeleteConfirm = () => {
		if (deleteId !== null) {
			setExtinguishers(extinguishers.filter(e => e.id !== deleteId))
			setDeleteId(null)
		}
		setIsConfirmOpen(false)
	}

	const [filtroSede, setFiltroSede] = useState('')
	const [filtroArea, setFiltroArea] = useState('')
	const [filtroNumeroExtintor, setFiltroNumeroExtintor] = useState('')
	const [filtroUbicacion, setFiltroUbicacion] = useState('')
	const [filtroTipoExtintor, setFiltroTipoExtintor] = useState('')
	const [filtroPeso, setFiltroPeso] = useState('')
	const [filtroCertificacion, setFiltroCertificacion] = useState('')

	const handleAddExtintor = (newExtintor: Extintor) => {
		setExtintores([...extintores, newExtintor])
	}

	const handleOpenConfirmDeleteModal = (id: number) => {
		setExtintorToDelete(id)
		setConfirmDeleteModalOpen(true)
	}

	const handleDeleteExtintor = () => {
		if (extintorToDelete !== null) {
			setExtintores(prevExtintores => prevExtintores.filter(extintor => extintor.id !== extintorToDelete))
		}
		setConfirmDeleteModalOpen(false)
	}

	const handleOpenEditModal = (extintor: Extintor) => {
		setCurrentExtintor(extintor)
		setEditModalOpen(true)
	}

	const handleEditExtintor = (editedExtintor: Extintor) => {
		setExtintores(prevExtintores => prevExtintores.map(extintor => extintor.id === editedExtintor.id ? editedExtintor : extintor))
		setEditModalOpen(false)
	}

	const filteredExtintores = extintores.filter((extintor) => {
		return (
			(filtroSede ? extintor.sede === filtroSede : true) &&
			(filtroArea ? extintor.area === filtroArea : true) &&
			(filtroNumeroExtintor ? extintor.numeroExtintor.toString().includes(filtroNumeroExtintor) : true) &&
			(filtroUbicacion ? extintor.ubicacion.includes(filtroUbicacion) : true) &&
			(filtroTipoExtintor ? extintor.tipoExtintor === filtroTipoExtintor : true) &&
			(filtroPeso ? extintor.peso.toString().includes(filtroPeso) : true) &&
			(filtroCertificacion ? extintor.certificacion === filtroCertificacion : true)
		)
	})

	const AddExtintorModal = () => {
		const [codigo, setCodigo] = useState('')
		const [numeroExtintor, setNumeroExtintor] = useState<number | ''>('')
		const [sede, setSede] = useState('')
		const [area, setArea] = useState('')
		const [ubicacion, setUbicacion] = useState('')
		const [tipoExtintor, setTipoExtintor] = useState('')
		const [peso, setPeso] = useState<number | ''>('')
		const [fechaFabricacion, setFechaFabricacion] = useState('')
		const [fechaPruebaHidrostatica, setFechaPruebaHidrostatica] = useState('')
		const [fechaRecarga, setFechaRecarga] = useState('')
		const [fechaIngreso, setFechaIngreso] = useState('')
		const [certificacion, setCertificacion] = useState('')
		const [file, setFile] = useState<File | null>(null)
		const [error, setError] = useState('')

		const handleSubmit = () => {
			if (!codigo || !numeroExtintor || !sede || !area || !ubicacion || !tipoExtintor || !peso) {
				setError('Por favor, complete todos los campos obligatorios.')
				return
			}

			const newExtintor: Extintor = {
				id: Date.now(),
				codigo,
				numeroExtintor: Number(numeroExtintor),
				sede,
				area,
				ubicacion,
				tipoExtintor,
				peso: Number(peso),
				fechaFabricacion,
				fechaPruebaHidrostatica,
				fechaRecarga,
				fechaIngreso,
				certificacion,
				file: file || null,
			}
			handleAddExtintor(newExtintor)
			resetFields()
			setIsModalOpen(false)
		}

		const resetFields = () => {
			setCodigo('')
			setNumeroExtintor('')
			setSede('')
			setArea('')
			setUbicacion('')
			setTipoExtintor('')
			setPeso('')
			setFechaFabricacion('')
			setFechaPruebaHidrostatica('')
			setFechaRecarga('')
			setFechaIngreso('')
			setCertificacion('')
			setFile(null)
			setError('')
		}

		return (
			isModalOpen ? (
				<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
					<div className="modal show" style={{ display: 'block', zIndex: 1050 }}>
						<div className="modal-dialog" style={{ margin: 'auto', marginTop: '5%', marginBottom: '5%' }}>
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Agregar Nuevo Extintor</h5>
									<button
										type="button" className="btn-close"
										onClick={() => setIsModalOpen(false)} aria-label="Close" />
								</div>
								<div className="modal-body">
									{error && <div className="alert alert-danger">{error}</div>}
									<div className="mb-3">
										<label htmlFor="">Código</label>
										<input
											type="text" className="form-control"
											placeholder="Código" value={codigo}
											onChange={(e) => setCodigo(e.target.value)} />
									</div>
									<div className="mb-3">
										<label htmlFor="">N° Extintor</label>
										<input
											type="number" className="form-control"
											placeholder="N° Extintor" value={numeroExtintor === '' ? '' : numeroExtintor}
											onChange={(e) => setNumeroExtintor(e.target.value === '' ? '' : Number(e.target.value))} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Seleccione Sede</label>
										<select
											className="form-select" value={sede}
											onChange={(e) => setSede(e.target.value)}>
											<option value="">Seleccione Sede</option>
											<option value="Lima">Lima</option>
											<option value="Arequipa">Arequipa</option>
										</select>
									</div>
									<div className="mb-3">
										<label htmlFor="">Seleccione Área</label>
										<select
											className="form-select" value={area}
											onChange={(e) => setArea(e.target.value)}>
											<option value="">Seleccione Área</option>
											<option value="Administrativa">Administrativa</option>
											<option value="Operativa">Operativa</option>
										</select>
									</div>
									<div className="mb-3">
										<label htmlFor="">Ubicación</label>
										<input
											type="text" className="form-control"
											placeholder="Ubicación" value={ubicacion}
											onChange={(e) => setUbicacion(e.target.value)} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Seleccione Tipo de Extintor</label>
										<select
											className="form-select" value={tipoExtintor}
											onChange={(e) => setTipoExtintor(e.target.value)}>
											<option value="">Seleccione Tipo de Extintor</option>
											<option value="ABC">ABC</option>
											<option value="CO2">CO2</option>
										</select>
									</div>
									<div className="mb-3">
										<label htmlFor="">Peso</label>
										<input
											type="number" className="form-control"
											placeholder="Peso" value={peso === '' ? '' : peso}
											onChange={(e) => setPeso(e.target.value === '' ? '' : Number(e.target.value))} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Fecha de Fabricación</label>
										<input
											type="date" className="form-control"
											value={fechaFabricacion} onChange={(e) => setFechaFabricacion(e.target.value)} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Fecha de Prueba Hidrostática</label>
										<input
											type="date" className="form-control"
											value={fechaPruebaHidrostatica} onChange={(e) => setFechaPruebaHidrostatica(e.target.value)} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Fecha de Recarga</label>
										<input
											type="date" className="form-control"
											value={fechaRecarga} onChange={(e) => setFechaRecarga(e.target.value)} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Fecha de Ingreso</label>
										<input
											type="date" className="form-control"
											value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
									</div>
									<div className="mb-3">
										<label htmlFor="">Certificación</label>
										<select
											className="form-select" value={certificacion}
											onChange={(e) => setCertificacion(e.target.value)}>
											<option value="">Certificación</option>
											<option value="Sí">Sí</option>
											<option value="No">No</option>
										</select>
									</div>
									<div className="mb-3">
										<label htmlFor="">Archivo</label>
										<input
											type="file" className="form-control"
											accept=".pdf, .doc, .docx" onChange={(e) => {
												if (e.target.files) {
													setFile(e.target.files[0])
												}
											}} />
										{file && <p>Archivo seleccionado: {file.name}</p>}
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button" className="btn btn-primary"
										onClick={handleSubmit}>Agregar</button>
									<button
										type="button" className="btn btn-secondary"
										onClick={() => setIsModalOpen(false)}>Cerrar</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null
		)
	}

	const EditExtintorModal = () => {
		const [codigo, setCodigo] = useState(currentExtintor?.codigo || '')
		const [numeroExtintor, setNumeroExtintor] = useState<number | ''>(currentExtintor?.numeroExtintor || '')
		const [sede, setSede] = useState(currentExtintor?.sede || '')
		const [area, setArea] = useState(currentExtintor?.area || '')
		const [ubicacion, setUbicacion] = useState(currentExtintor?.ubicacion || '')
		const [tipoExtintor, setTipoExtintor] = useState(currentExtintor?.tipoExtintor || '')
		const [peso, setPeso] = useState<number | ''>(currentExtintor?.peso || '')
		const [fechaFabricacion, setFechaFabricacion] = useState(currentExtintor?.fechaFabricacion || '')
		const [fechaPruebaHidrostatica, setFechaPruebaHidrostatica] = useState(currentExtintor?.fechaPruebaHidrostatica || '')
		const [fechaRecarga, setFechaRecarga] = useState(currentExtintor?.fechaRecarga || '')
		const [fechaIngreso, setFechaIngreso] = useState(currentExtintor?.fechaIngreso || '')
		const [certificacion, setCertificacion] = useState(currentExtintor?.certificacion || '')
		const [file, setFile] = useState<File | null>(currentExtintor?.file || null)
		const [error, setError] = useState('')

		const handleSubmit = () => {
			if (!codigo || !numeroExtintor || !sede || !area || !ubicacion || !tipoExtintor || !peso) {
				setError('Por favor, complete todos los campos obligatorios.')
				return
			}

			const editedExtintor: Extintor = {
				id: currentExtintor?.id || 0,
				...currentExtintor,
				codigo,
				numeroExtintor: Number(numeroExtintor),
				sede,
				area,
				ubicacion,
				tipoExtintor,
				peso: Number(peso),
				fechaFabricacion,
				fechaPruebaHidrostatica,
				fechaRecarga,
				fechaIngreso,
				certificacion,
				file: file || null,
			}
			handleEditExtintor(editedExtintor)
			resetFields()
		}

		const resetFields = () => {
			setCodigo(currentExtintor?.codigo || '')
			setNumeroExtintor(currentExtintor?.numeroExtintor || '')
			setSede(currentExtintor?.sede || '')
			setArea(currentExtintor?.area || '')
			setUbicacion(currentExtintor?.ubicacion || '')
			setTipoExtintor(currentExtintor?.tipoExtintor || '')
			setPeso(currentExtintor?.peso || '')
			setFechaFabricacion(currentExtintor?.fechaFabricacion || '')
			setFechaPruebaHidrostatica(currentExtintor?.fechaPruebaHidrostatica || '')
			setFechaRecarga(currentExtintor?.fechaRecarga || '')
			setFechaIngreso(currentExtintor?.fechaIngreso || '')
			setCertificacion(currentExtintor?.certificacion || '')
			setFile(currentExtintor?.file || null)
			setError('')
		}

		return (
			editModalOpen ? (
				<>
					<div
						className="modal-backdrop"
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							zIndex: 1040,
						}}
					/>
					<div className="modal show" style={{ display: 'block', zIndex: 1050 }}>
						<div className="modal-dialog" style={{ margin: 'auto', marginTop: '5%', marginBottom: '5%' }}>
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Editar Extintor</h5>
									<button
										type="button"
										className="btn-close"
										onClick={() => setEditModalOpen(false)}
										aria-label="Close"
									/>
								</div>
								<div className="modal-body">
									{error && <div className="alert alert-danger">{error}</div>}
									<div className="mb-3">
										<label htmlFor="codigo" className="form-label">Código</label>
										<input
											type="text"
											className="form-control"
											id="codigo"
											value={codigo}
											onChange={(e) => setCodigo(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="numeroExtintor" className="form-label">N° Extintor</label>
										<input
											type="number"
											className="form-control"
											id="numeroExtintor"
											value={numeroExtintor === '' ? '' : numeroExtintor}
											onChange={(e) => setNumeroExtintor(e.target.value === '' ? '' : Number(e.target.value))}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="sede" className="form-label">Sede</label>
										<input
											type="text"
											className="form-control"
											id="sede"
											value={sede}
											onChange={(e) => setSede(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="area" className="form-label">Área</label>
										<input
											type="text"
											className="form-control"
											id="area"
											value={area}
											onChange={(e) => setArea(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="ubicacion" className="form-label">Ubicación</label>
										<input
											type="text"
											className="form-control"
											id="ubicacion"
											value={ubicacion}
											onChange={(e) => setUbicacion(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="tipoExtintor" className="form-label">Tipo de Extintor</label>
										<input
											type="text"
											className="form-control"
											id="tipoExtintor"
											value={tipoExtintor}
											onChange={(e) => setTipoExtintor(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="peso" className="form-label">Peso</label>
										<input
											type="number"
											className="form-control"
											id="peso"
											value={peso === '' ? '' : peso}
											onChange={(e) => setPeso(e.target.value === '' ? '' : Number(e.target.value))}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="fechaFabricacion" className="form-label">Fecha de Fabricación</label>
										<input
											type="date"
											className="form-control"
											id="fechaFabricacion"
											value={fechaFabricacion}
											onChange={(e) => setFechaFabricacion(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="fechaPruebaHidrostatica" className="form-label">Fecha de Prueba Hidrostática</label>
										<input
											type="date"
											className="form-control"
											id="fechaPruebaHidrostatica"
											value={fechaPruebaHidrostatica}
											onChange={(e) => setFechaPruebaHidrostatica(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="fechaRecarga" className="form-label">Fecha de Recarga</label>
										<input
											type="date"
											className="form-control"
											id="fechaRecarga"
											value={fechaRecarga}
											onChange={(e) => setFechaRecarga(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="fechaIngreso" className="form-label">Fecha de Ingreso</label>
										<input
											type="date"
											className="form-control"
											id="fechaIngreso"
											value={fechaIngreso}
											onChange={(e) => setFechaIngreso(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="certificacion" className="form-label">Certificación</label>
										<input
											type="text"
											className="form-control"
											id="certificacion"
											value={certificacion}
											onChange={(e) => setCertificacion(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="file" className="form-label">Archivo</label>
										<input
											type="file"
											className="form-control"
											id="file"
											onChange={(e) => {
												if (e.target.files) {
													setFile(e.target.files[0])
												}
											}}
										/>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button" className="btn btn-secondary"
										onClick={() => setEditModalOpen(false)}>
										Cerrar
									</button>
									<button
										type="button" className="btn btn-primary"
										onClick={handleSubmit}>
										Guardar cambios
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null
		)
	}

	return (
		<div className="py-4 card card-grid min-w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h1 className="text-2xl font-bold">Extintores</h1>
			<p className="text-sm text-gray-500">Gestión de extintores - Registro</p>

			<div className="space-y-2">
				<h5 className="text-sm font-semibold text-center">Extintores disponibles</h5>
				<h5 className="text-sm font-semibold text-center">Filtros de búsqueda</h5>

				<div className="row g-3 pt-4">
					{/* Filtros */}
					<div className="col-md-3">
						<label htmlFor="sede">Sede</label>
						<select
							id="sede" className="form-select w-full"
							onChange={(e) => setFiltroSede(e.target.value)}>
							<option value="">Sede</option>
							<option value="Lima">Lima</option>
							<option value="Arequipa">Arequipa</option>
						</select>
					</div>
					<div className="col-md-3">
						<label htmlFor="area">Área</label>
						<select
							id="area" className="form-select w-full"
							onChange={(e) => setFiltroArea(e.target.value)}>
							<option value="">Área</option>
							<option value="Administrativa">Administrativa</option>
							<option value="Operativa">Operativa</option>
						</select>
					</div>
					<div className="col-md-3">
						<label htmlFor="numeroExtintor">N° Extintor</label>
						<input
							type="text" id="numeroExtintor"
							className="form-control w-full" placeholder="N° Extintor"
							onChange={(e) => setFiltroNumeroExtintor(e.target.value)} />
					</div>
					<div className="col-md-3">
						<label htmlFor="ubicacion">Ubicación</label>
						<input
							type="text" id="ubicacion"
							className="form-control w-full" placeholder="Ubicación"
							onChange={(e) => setFiltroUbicacion(e.target.value)} />
					</div>
					<div className="col-md-3">
						<label htmlFor="tipoExtintor">Tipo de Extintor</label>
						<select
							id="tipoExtintor" className="form-select w-full"
							onChange={(e) => setFiltroTipoExtintor(e.target.value)}>
							<option value="">Tipo de Extintor</option>
							<option value="ABC">ABC</option>
							<option value="CO2">CO2</option>
						</select>
					</div>
					<div className="col-md-3">
						<label htmlFor="peso">Peso</label>
						<input
							type="text" id="peso"
							className="form-control w-full" placeholder="Peso"
							onChange={(e) => setFiltroPeso(e.target.value)} />
					</div>
					<div className="col-md-3">
						<label htmlFor="certificacion">Certificación</label>
						<select
							id="certificacion" className="form-select w-full"
							onChange={(e) => setFiltroCertificacion(e.target.value)}>
							<option value="">Certificación</option>
							<option value="Sí">Sí</option>
							<option value="No">No</option>
						</select>
					</div>
				</div>
			</div>

			<hr />

			<div className="d-flex justify-content-between align-items-center">
				<p>Coincidencias: {filteredExtintores.length}</p>
				<div>
					<button className="btn btn-primary me-2" onClick={() => setIsModalOpen(true)}>
						Nuevo Extintor
					</button>
					<button className="btn btn-primary" onClick={() => setIsOpen(true)}>Nuevo Tipo de Extintor</button>
					{isOpen && (
						<>
							<div
								className="modal-backdrop"
								style={{
									position: 'fixed',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: isConfirmOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
									zIndex: 1040,
								}}
							/>
							<div className="modal show" style={{ display: 'block', zIndex: 1050, opacity: isConfirmOpen ? 0.5 : 1 }}>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Tipo de Extintor</h5>
											<button
												type="button" className="btn-close"
												onClick={() => setIsOpen(false)} aria-label="Close" />
										</div>
										<div className="modal-body">
											<div className="mb-3">
												<input
													type="text"
													className="form-control"
													id="name"
													value={name}
													onChange={(e) => setName(e.target.value)}
													placeholder="Nombre"
												/>
											</div>
											<div className="mb-3">
												<select
													className="form-select"
													value={unit}
													onChange={(e) => setUnit(e.target.value as 'Kg' | 'L')}
												>
													<option value="Kg">Kg</option>
													<option value="L">L</option>
												</select>
											</div>
											<div className="d-flex justify-content-end">
												<button className="btn btn-primary" onClick={handleAdd}>Guardar</button>
											</div>
											<div className="mt-3">
												<table className="table">
													<thead className="bg-secondary">
														<tr>
															<th style={{ fontWeight: 600, paddingLeft: '10px' }}>Nombre</th>
															<th style={{ fontWeight: 600, paddingLeft: '10px' }}>Unidad</th>
															<th style={{ fontWeight: 600, paddingLeft: '10px' }}>Acción</th>
														</tr>
													</thead>
													<tbody>
														{extinguishers.map((extinguisher) => (
															<tr key={extinguisher.id}>
																<td style={{ fontWeight: 600, paddingLeft: '10px' }}>{extinguisher.name}</td>
																<td style={{ fontWeight: 600, paddingLeft: '10px' }}>{extinguisher.unit}</td>
																<td style={{ fontWeight: 600, paddingLeft: '10px' }}>
																	<button
																		className="btn btn-danger btn-sm"
																		style={{ padding: '4px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
																		onClick={() => handleDeleteRequest(extinguisher.id)}
																	>
																		<Trash2 className="h-4 w-4" style={{ width: '18px', height: '18px' }} />
																	</button>
																</td>
															</tr>
														))}
													</tbody>
												</table>
												<div className="d-flex justify-content-end">
													<button className="btn btn-secondary me-2" onClick={() => setIsOpen(false)}>Cancelar</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
					<ConfirmDeleteModal
						isOpen={isConfirmOpen}
						onClose={() => setIsConfirmOpen(false)}
						onConfirm={handleDeleteConfirm}
					/>
				</div>
			</div>

			<AddExtintorModal />

			<div className="pt-4 overflow-auto">
				<table className="table" style={{ width: '100%' }}>
					<thead>
						<tr>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>N° Extintor</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Sede</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Área</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Ubicación</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Tipo de Extintor</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Peso</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Fecha de Fabricación</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Fecha de Prueba Hidrostática</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Fecha de Recarga</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Fecha de Ingreso</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Certificación</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>PDF</th>
							<th className="text-center" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Opciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredExtintores.map((extintor) => (
							<tr key={extintor.id} className="bg-white">
								<td className="text-center">{extintor.numeroExtintor}</td>
								<td className="text-center">{extintor.sede}</td>
								<td className="text-center">{extintor.area}</td>
								<td className="text-center">{extintor.ubicacion}</td>
								<td className="text-center">{extintor.tipoExtintor}</td>
								<td className="text-center">{extintor.peso} kg</td>
								<td className="text-center">{extintor.fechaFabricacion}</td>
								<td className="text-center">{extintor.fechaPruebaHidrostatica}</td>
								<td className="text-center">{extintor.fechaRecarga}</td>
								<td className="text-center">{extintor.fechaIngreso}</td>
								<td className="text-center">{extintor.certificacion}</td>
								<td className="text-center">
									{extintor.file ? (
										<a
											href={URL.createObjectURL(extintor.file)}
											target="_blank"
											rel="noopener noreferrer"
										>
											{extintor.file.name}
										</a>
									) : (
										'No disponible'
									)}
								</td>
								<td className="text-center d-flex justify-content-center">
									<button
										className="btn btn-primary btn-sm me-2" title="Editar"
										onClick={() => handleOpenEditModal(extintor)}>
										<FontAwesomeIcon icon={faEdit} className="w-2 h-2" />
									</button>
									<button
										className="btn btn-warning btn-sm me-2" title="Reemplazar"
										onClick={() => handleOpenEditModal(extintor)}>
										<FontAwesomeIcon icon={faRedo} className="w-2 h-2" />
									</button>
									<button
										className="btn btn-danger btn-sm"
										title="Eliminar"
										onClick={() => handleOpenConfirmDeleteModal(extintor.id)}>
										<FontAwesomeIcon icon={faTrash} className="w-2 h-2" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{editModalOpen && <EditExtintorModal />}
			<ConfirmDeleteModal
				isOpen={confirmDeleteModalOpen}
				onClose={() => setConfirmDeleteModalOpen(false)}
				onConfirm={handleDeleteExtintor}
			/>
		</div>
	)
}
