import { forwardRef, useState } from 'react'

interface ModalProps {
	id: string
	onSuccess: () => void
	onError: () => void
}

function CheckboxField ({
	label,
	name,
	checked = false,
	onChange = () => {},
}: {
	label: string
	name: string
	checked?: boolean
	onChange?: (isChecked: boolean) => void
}) {
	return (
		<div className="form-check form-check-solid my-4">
			<label>
				<input
					className="form-check-input"
					type="checkbox"
					name={name}
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
				/>
				<span className="form-check-label">
					{label}
				</span>
			</label>
		</div>
	)
}

interface SelectOption {
	value: string
	content: string
}

type FieldProps = 
	| {
			label: string 
			type: 'text' | 'number' | 'textarea'
			placeholder: string
			name: string
		}
	| {
			label: string
			type: 'select'
			placeholder: string
			name: string
			options: SelectOption[]
		}

function RenderField (props: FieldProps){
	if (props.type === 'select'){
		return (
			<select className="form-select" name={props.name}>
				<option value="">{props.placeholder}</option>
				{props.options.map((option, index) => (
					<option value={option.value} key={index}>
						{option.content}
					</option>
				))}
			</select>
		)
	}

	return (
		<input
			type={props.type}
			className="form-control"
			placeholder={props.placeholder}
			name={props.name}
		/>
	)
}

function Field (props: FieldProps): JSX.Element {
	return (
		<div className="form-group row my-4">
			<label className="col-form-label col-lg-6 col-sm-12 required">
				{props.label}
			</label>
			<div className="col-lg-6 col-md-9 col-sm-12">
				<RenderField {...props} />
			</div>
		</div>
	)
}

function AvancedSearch ({
	fields,
}: {
	fields: FieldProps[]
}) {
	return fields.map((field, index) => (
		<Field key={index} {...field} />
	))
}

const options: FieldProps[] = [
	{
		label: 'Area',
		type: 'select',
		placeholder: 'Seleccione un area',
		name: 'area',
		options: [
			{
				value: 'hello',
				content: 'Hello world',
			},
		],
	},
	{
		label: 'Cargo',
		type: 'select',
		placeholder: 'Seleccione un cargo',
		name: 'cargo',
		options: [
			{
				value: 'hello',
				content: 'Hello world',
			},
		],
	},
	{
		label: 'Tipo de trabajo',
		type: 'select',
		placeholder: 'Seleccione un tipo de trabajo',
		name: 'typeOfWork',
		options: [
			{
				value: 'hello',
				content: 'Hello world',
			},
		],
	},
]

function SearchEmployee () {
	const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)

	const handleClick = () => {
		console.log('submit')
	}

	return (
		<>
			<CheckboxField 
				label="Busqueda avanzada"
				name="searchAdvanced"
				checked={isAdvancedSearch}
				onChange={(isChecked) => {
					setIsAdvancedSearch(isChecked)
				}}
			/>

			{isAdvancedSearch ? (
				<AvancedSearch fields={options} />
			) : (
				<Field 
					label="DNI del trabajador"
					type="number"
					placeholder="DNI del trabajador"
					name="dni"
				/>
			)}

			<div className="text-end my-6">
				<button
					type="submit" className="btn btn-primary btn-sm"
					onClick={handleClick}
				>
					Buscar
				</button>
			</div>

			<Field
				label="Razon"
				type="select"
				placeholder="Seleccione una razón"
				name="reason"
				options={[
					{
						value: 'wear',
						content: 'Desgaste',
					},
					{
						content: 'Perdida',
						value: 'loss',
					},
					{
						content: 'Robo',
						value: 'robbery',
					},
					{
						content: 'Nueva dotación',
						value: 'new-bond',
					},
				]}
			/>
		</>
	)
}

function SecondTable() {
	return (
		<div className="card my-6">
			<div className="card-header">
				<h2 className="card-title">EPPS disponibles</h2>
			</div>
			<div className="card-body">
				<div className="card-content overflow-auto">
					<Field
						label="Buscar producto"
						type="text"
						placeholder="Codigo del producto"
						name="productCode"
					/>

					<table className="table table-bordered table-row-gray-300 align-middle gs-7 my-6">
						<thead>
							<tr>
								<th className="text-left fw-bold text-gray-800 border-bottom-2 border-gray-200 w-100px">Nombre</th>
								<th className="text-left fw-bold text-gray-800 border-bottom-2 border-gray-200">Stock</th>
								<th className="text-left fw-bold text-gray-800 border-bottom-2 border-gray-200">Tipo</th>
								<th className="text-left fw-bold text-gray-800 border-bottom-2 border-gray-200">Marca</th>
								<th className="text-left fw-bold text-gray-800 border-bottom-2 border-gray-200">Cantidad</th>
								<th className="text-left fw-bold text-gray-800 border-bottom-2 border-gray-200">Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Nombre</td>
								<td>Unidad</td>
								<td>Cantidad</td>
								<td>
									<select className="form-select" name="brand">
										<option value="">Seleccione un marca</option>
										<option value="hello">Hello world</option>
									</select>
								</td>
								<td>
									<select className="form-select" name="quantity">
										<option value="">Seleccione una cantidad</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select>
								</td>
								<td>
									<div className="d-flex gap-2">
										<button
											type="button" 
											className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
											data-bs-toggle="tooltip" 
											title="Eliminar"
										>
											<i className="fas fa-trash fs-4"></i>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
		</div>
	)
}

function AditionalInfo() {
	return (
		<div className="card my-6">
			<div className="card-header">
				<h2 className="card-title">Información adicional</h2>
			</div>
			<div className="card-body">
				<div className="card-content">
					<div className="form-group row">
						<label className="col-form-label required">
							Observaciones
						</label>
						<textarea
							className="form-control"
							placeholder="Observaciones"
							name="description"
						/>

						<div className="input-group my-3 px-0">
							<label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
							<input 
								type="file" 
								className="form-control" 
								id="inputGroupFile01" 
							/>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export const Modal = forwardRef<HTMLFormElement, ModalProps>((props, ref) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div id={props.id} className="modal fade">
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
				<form
					className="modal-content"
					ref={ref}
					onSubmit={handleSubmit}
				>
					<div className="modal-header">
						<h2 className="modal-title">
							Agregar base de datos
						</h2>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						/>
					</div>
					<div className="modal-body">

						<div className="card">
							<div className="card-header">
								<h2 className="card-title">Buscar trabajador</h2>
							</div>
							<div className="card-body">
								<SearchEmployee />
							</div>
						</div>

						<SecondTable />
						<AditionalInfo />

					</div>
					<div className="modal-footer">
						<button 
							type="button" 
							className="btn btn-secondary" data-bs-dismiss="modal"
						>
							Cancelar
						</button>

						<button type="submit" className="btn btn-primary">
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
})

Modal.displayName = 'Modal'
