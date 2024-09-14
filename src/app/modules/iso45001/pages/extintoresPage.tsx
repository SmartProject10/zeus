import { TitleBar } from '@zeus/@components/titleBar'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import { Document } from '../types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

interface Extintor {
	codigo: string
	nroExtintor: string
	sede: string
	area: string
	tipo: string
	peso: string
	fechaFabricacion: string
	fechaPruebaHidrostatica: string
	fechaRecarga: string
	fechaIngreso: string
	certificacion: string
	pdf: Document | null
}

export function ExtintoresPage(): JSX.Element {
	const navigate = useNavigate() // Definir 'navigate' aquí
	const [searchTerm, setSearchTerm] = useState('')
	const [extintores, setExtintores] = useState<Extintor[]>([])
	const [modal, setModal] = useState(false)
	const [nuevoTipo, setNuevoTipo] = useState('')
	const [unidadPeso, setUnidadPeso] = useState('')
	const [nuevoExtintor, setNuevoExtintor] = useState<Extintor>({
		codigo: '',
		nroExtintor: '',
		sede: '',
		area: '',
		tipo: '',
		peso: '',
		fechaFabricacion: '',
		fechaPruebaHidrostatica: '',
		fechaRecarga: '',
		fechaIngreso: '',
		certificacion: '',
		pdf: null,
	})

	const [isEditing, setIsEditing] = useState(false)
	const [editingIndex, setEditingIndex] = useState<number | null>(null)

	const [sedeDropdownOpen, setSedeDropdownOpen] = useState(false)
	const [areaDropdownOpen, setAreaDropdownOpen] = useState(false)
	const [tipoDropdownOpen, setTipoDropdownOpen] = useState(false)

	// Nuevo tipo de extintor
	const [tipoModal, setTipoModal] = useState(false)
	const [tiposExtintor, setTiposExtintor] = useState<{ tipo: string; unidad: string }[]>([])
	const [tipoEditingIndex, setTipoEditingIndex] = useState<number | null>(null)

	const handleNuevoExtintor = () => {
		setIsEditing(false)
		setModal(true)
	}

	const handleNuevoTipo = () => {
		setTipoModal(true)
	}

	const handleGuardarExtintor = () => {
		if (Object.values(nuevoExtintor).some(value => value === '')) {
			alert('Por favor, completa todos los campos.')
			return
		}

		if (isEditing && editingIndex !== null) {
			const updatedExtintores = extintores.map((extintor, index) =>
				index === editingIndex ? nuevoExtintor : extintor,
			)
			setExtintores(updatedExtintores)
		} else {
			setExtintores([...extintores, nuevoExtintor])
		}

		setModal(false)
		resetNuevoExtintor()
	}

	const handleEdit = (index: number) => {
		setIsEditing(true)
		setEditingIndex(index)
		setNuevoExtintor(extintores[index])
		setModal(true)
	}

	const handleDelete = (index: number) => {
		const updatedExtintores = extintores.filter((_, i) => i !== index)
		setExtintores(updatedExtintores)
	}

	const resetNuevoExtintor = () => {
		setNuevoExtintor({
			codigo: '',
			nroExtintor: '',
			sede: '',
			area: '',
			tipo: '',
			peso: '',
			fechaFabricacion: '',
			fechaPruebaHidrostatica: '',
			fechaRecarga: '',
			fechaIngreso: '',
			certificacion: '',
			pdf: null,
		})
	}

	const filteredExtintores = extintores.filter(extintor =>
		Object.values(extintor).some(value =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
		),
	)

	// Funciones para manejar tipos de extintor
	const handleGuardarTipo = () => {
		if (tipoEditingIndex !== null) {
			const updatedTipos = tiposExtintor.map((item, index) =>
				index === tipoEditingIndex ? { tipo: nuevoTipo, unidad: unidadPeso } : item,
			)
			setTiposExtintor(updatedTipos)
		} else {
			setTiposExtintor([...tiposExtintor, { tipo: nuevoTipo, unidad: unidadPeso }])
		}
		setNuevoTipo('')
		setUnidadPeso('')
		setTipoModal(false)
		setTipoEditingIndex(null) // Reiniciar la condición al cerrar el modal
	}

	const handleEditTipo = (index: number) => {
		setTipoEditingIndex(index)
		setNuevoTipo(tiposExtintor[index].tipo)
		setUnidadPeso(tiposExtintor[index].unidad)
		setTipoModal(true)
	}

	const handleDeleteTipo = (index: number) => {
		const nuevosTipos = tiposExtintor.filter((_, i) => i !== index)
		setTiposExtintor(nuevosTipos)
	}

	return (
		<div>
			<TitleBar label="Extintores" />
			<input
				type="text"
				placeholder="Buscar..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mt-4 mb-4 p-3 border border-gray-300 rounded-lg w-full text-lg"
			/>
			<div className="container-fluid">
				<header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
					<h1 className="h4 mb-0">Extintores, Luces, Botiquines, Kit Matpel</h1>
					<div>
						<button className="btn btn-primary btn-sm me-2" onClick={handleNuevoExtintor}>
							Subir Registro Extintor
						</button>
						<button className="btn btn-primary btn-sm" onClick={() => navigate('/iso45001/inspecciones-interna')}>
							Regresar
						</button>
					</div>
				</header>

				<ul className="nav nav-tabs mb-4">
					{/* Aquí puedes agregar tus elementos de navegación */}
				</ul>

				<div className="mb-4">
					<h2 className="h5 mb-3">Extintores</h2>
					<h3 className="h6 mb-3">Tipo de Extintores</h3>
					<div className="d-flex justify-content-end mb-3">
						<button className="btn btn-primary btn-sm me-2" onClick={handleNuevoExtintor}>
							Nuevo Extintor
						</button>
						<button className="btn btn-primary btn-sm me-2">Historial de Extintor</button>
						<button className="btn btn-primary btn-sm me-2" onClick={handleNuevoTipo}>
							Nuevo Tipo de Extintor
						</button>
						<button className="btn btn-primary btn-sm">Historial Tipo de Extintor</button>
					</div>
				</div>

				<div className="table-responsive">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Nro</th>
								<th>Código</th>
								<th>Nro Extintor</th>
								<th>Sede</th>
								<th>Área</th>
								<th>Tipo</th>
								<th>Peso</th>
								<th>Fecha Fabricación</th>
								<th>Fecha Prueba Hidrostática</th>
								<th>Fecha Recarga</th>
								<th>Fecha Ingreso</th>
								<th>Certificación</th>
								<th>PDF</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{filteredExtintores.map((extintor, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{extintor.codigo}</td>
									<td>{extintor.nroExtintor}</td>
									<td>{extintor.sede}</td>
									<td>{extintor.area}</td>
									<td>{extintor.tipo}</td>
									<td>{extintor.peso}</td>
									<td>{extintor.fechaFabricacion}</td>
									<td>{extintor.fechaPruebaHidrostatica}</td>
									<td>{extintor.fechaRecarga}</td>
									<td>{extintor.fechaIngreso}</td>
									<td>{extintor.certificacion}</td>
									<td>{extintor.pdf ? <a
										href={extintor.pdf.url} target="_blank"
										rel="noopener noreferrer">Ver PDF</a> : null}</td>
									<td>
										<div className="d-flex">
											<button className="btn btn-link p-0 me-2" onClick={() => handleEdit(index)}>
												<FontAwesomeIcon icon={faEdit} />
											</button>
											<button className="btn btn-link p-0" onClick={() => handleDelete(index)}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal para nuevo tipo de extintor */}
			<Modal isOpen={tipoModal} toggle={() => setTipoModal(!tipoModal)}>
				<ModalHeader toggle={() => setTipoModal(!tipoModal)}>
					{tipoEditingIndex !== null ? 'Editar Tipo de Extintor' : 'Nuevo Tipo de Extintor'}
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="tipo">Tipo de Extintor</Label>
							<Input
								type="text"
								id="tipo"
								value={nuevoTipo}
								onChange={(e) => setNuevoTipo(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="unidadPeso">Unidad de Peso</Label>
							<Dropdown isOpen={tipoDropdownOpen} toggle={() => setTipoDropdownOpen(!tipoDropdownOpen)}>
								<DropdownToggle caret>
									{!unidadPeso ? 'Seleccione una unidad de peso' : unidadPeso}
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={() => setUnidadPeso('KG')}>KG</DropdownItem>
									<DropdownItem onClick={() => setUnidadPeso('LT')}>LT</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</FormGroup>
					</Form>
					<h5>Lista de Tipos de Extintor</h5>
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Tipo</th>
								<th>Unidad de Peso</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{tiposExtintor.map((item, index) => (
								<tr key={index}>
									<td>{item.tipo}</td>
									<td>{item.unidad}</td>
									<td>
										<div className="d-flex">
											<button className="btn btn-link p-0 me-2" onClick={() => handleEditTipo(index)}>
												<FontAwesomeIcon icon={faEdit} />
											</button>
											<button className="btn btn-link p-0" onClick={() => handleDeleteTipo(index)}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleGuardarTipo}>
						{tipoEditingIndex !== null ? 'Actualizar' : 'Guardar'}
					</Button>
					<Button color="secondary" onClick={() => setTipoModal(!tipoModal)}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>

			{/* Modal para nuevo extintor */}
			<Modal isOpen={modal} toggle={() => setModal(!modal)}>
				<ModalHeader toggle={() => setModal(!modal)}>
					{isEditing ? 'Editar Extintor' : 'Nuevo Extintor'}
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="codigo">Código</Label>
							<Input
								type="text"
								id="codigo"
								value={nuevoExtintor.codigo}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, codigo: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="nroExtintor">Nro Extintor</Label>
							<Input
								type="text"
								id="nroExtintor"
								value={nuevoExtintor.nroExtintor}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, nroExtintor: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="sede">Sede</Label>
							<Dropdown isOpen={sedeDropdownOpen} toggle={() => setSedeDropdownOpen(!sedeDropdownOpen)}>
								<DropdownToggle caret>
									{!nuevoExtintor.sede ? 'Seleccione una sede' : nuevoExtintor.sede}
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={() => setNuevoExtintor({ ...nuevoExtintor, sede: 'Sede 1' })}>Sede 1</DropdownItem>
									<DropdownItem onClick={() => setNuevoExtintor({ ...nuevoExtintor, sede: 'Sede 2' })}>Sede 2</DropdownItem>
									<DropdownItem onClick={() => setNuevoExtintor({ ...nuevoExtintor, sede: 'Sede 3' })}>Sede 3</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</FormGroup>
						<FormGroup>
							<Label for="area">Área</Label>
							<Dropdown isOpen={areaDropdownOpen} toggle={() => setAreaDropdownOpen(!areaDropdownOpen)}>
								<DropdownToggle caret>
									{!nuevoExtintor.area ? 'Seleccione un área' : nuevoExtintor.area}
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={() => setNuevoExtintor({ ...nuevoExtintor, area: 'Área 1' })}>Área 1</DropdownItem>
									<DropdownItem onClick={() => setNuevoExtintor({ ...nuevoExtintor, area: 'Área 2' })}>Área 2</DropdownItem>
									<DropdownItem onClick={() => setNuevoExtintor({ ...nuevoExtintor, area: 'Área 3' })}>Área 3</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</FormGroup>
						<FormGroup>
							<Label for="tipo">Tipo</Label>
							<Dropdown isOpen={tipoDropdownOpen} toggle={() => setTipoDropdownOpen(!tipoDropdownOpen)}>
								<DropdownToggle caret>
									{!nuevoExtintor.tipo ? 'Seleccione un tipo' : nuevoExtintor.tipo}
								</DropdownToggle>
								<DropdownMenu>
									{tiposExtintor.map((item, index) => (
										<DropdownItem key={index} onClick={() => setNuevoExtintor({ ...nuevoExtintor, tipo: item.tipo })}>
											{item.tipo} {/* Cambié 'tipo' a 'item.tipo' para acceder correctamente al tipo */}
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</FormGroup>
						<FormGroup>
							<Label for="peso">Peso</Label>
							<Input
								type="text"
								id="peso"
								value={nuevoExtintor.peso}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, peso: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="fechaFabricacion">Fecha Fabricación</Label>
							<Input
								type="date"
								id="fechaFabricacion"
								value={nuevoExtintor.fechaFabricacion}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, fechaFabricacion: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="fechaPruebaHidrostatica">Fecha Prueba Hidrostática</Label>
							<Input
								type="date"
								id="fechaPruebaHidrostatica"
								value={nuevoExtintor.fechaPruebaHidrostatica}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, fechaPruebaHidrostatica: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="fechaRecarga">Fecha Recarga</Label>
							<Input
								type="date"
								id="fechaRecarga"
								value={nuevoExtintor.fechaRecarga}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, fechaRecarga: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="fechaIngreso">Fecha Ingreso</Label>
							<Input
								type="date"
								id="fechaIngreso"
								value={nuevoExtintor.fechaIngreso}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, fechaIngreso: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="certificacion">Certificación</Label>
							<Input
								type="text"
								id="certificacion"
								value={nuevoExtintor.certificacion}
								onChange={(e) => setNuevoExtintor({ ...nuevoExtintor, certificacion: e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="pdf">PDF</Label>
							<Input
								type="file"
								id="pdf"
								onChange={(e) => e.target.files && setNuevoExtintor({ ...nuevoExtintor, pdf: { url: URL.createObjectURL(e.target.files[0]), name: e.target.files[0].name } })}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleGuardarExtintor}>
						{isEditing ? 'Actualizar' : 'Guardar'}
					</Button>
					<Button color="secondary" onClick={() => setModal(!modal)}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}
