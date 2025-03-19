import { useRef, useState } from 'react'
import { ChainedSelects } from './chained-selects'
import { configs, typeOfWork } from './mock'
import { FieldSchema, Form } from './form'
import { schema } from './schemas'
import { PersonalProtectiveEquipment } from './types'

const TypeOfWork = () => {
	const [isOtherWork, setIsOtherWork] = useState(false)

	return (
		<>
			{!isOtherWork ? typeOfWork.map((work) => (
				<div key={work.id} className="form-check form-check-solid my-4">
					<label>
						<input
							className="form-check-input"
							type="checkbox"
							name="work"
						/>
						<span className="form-check-label">
							{work.name}
						</span>
					</label>
				</div>
			)) : null}

			<div className="form-check form-check-solid my-4">
				<label>
					<input
						className="form-check-input"
						type="checkbox"
						checked={isOtherWork}
						onChange={(e) => setIsOtherWork(e.target.checked)}
					/>
					<span className="form-check-label">
						Otro
					</span>
				</label>
			</div>

			{isOtherWork ? (
				<div className="form-group row">
					<label className="col-form-label col-lg-6 col-sm-12 required">
						Otro
					</label>
					<div className="col-lg-6 col-md-9 col-sm-12">
						<input
							type="text"
							name="work"
							className="form-control"
							placeholder="Otro trabajo"
						/>
					</div>
				</div>
			) : null}
		</>
	)
}

const fieldSchema: FieldSchema[] = [
	{
		title: 'Equipo',
		fields: [
			{
				type: 'component',
				Component: (
					<ChainedSelects
						configs={configs}
					/>
				),
			},
			{
				type: 'select',
				label: 'Tipo de EPP',
				key: 'eppType',
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
				placeholder: 'Seleccione una opción',
				required: true,
			},
			{
				type: 'date',
				label: 'Fecha de ingreso',
				key: 'dateOfEntry',
				placeholder: 'Fecha de ingreso',
				required: true,
			},
			{
				type: 'date',
				label: 'Fecha de vencimiento',
				key: 'dateOfExit',
				placeholder: 'Fecha de vencimiento',
				required: true,
			},
			{
				type: 'text',
				label: 'Codigo',
				key: 'code',
				placeholder: 'Codigo',
				required: true,
			},
			{
				type: 'select',
				label: 'Proveedor',
				key: 'provider',
				placeholder: 'Proveedor',
				required: true,
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
			},
			{
				type: 'select',
				label: 'Dotación',
				key: 'distribution',
				placeholder: 'Dotación',
				required: true,
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
			},
			{
				type: 'number',
				label: 'Numero de dotación',
				key: 'numberOfDotation',
				placeholder: 'Numero de dotación',
				required: true,
			},
		],
	},
	{
		title: 'Tipo de trabajador',
		fields: [
			{
				type: 'select',
				key: 'typeOfEmployee',
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
				label: 'Area logistica',
				placeholder: 'Seleccione una opción',
				required: true,
			},
			{
				type: 'select',
				key: 'employeeSite',
				label: 'Sede',
				placeholder: 'Seleccione una opción',
				required: true,
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
			},
			{
				type: 'select',
				key: 'employeeJob',
				label: 'Cargo',
				placeholder: 'Seleccione una opción',
				required: true,
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
			},
		],
	},
	{
		title: 'Almacenamiento',
		fields: [
			{
				type: 'select',
				label: 'Sede de almacenamiento',
				key: 'storageSite',
				placeholder: 'Seleccione una opción',
				required: true,
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
			},
			{
				type: 'select',
				key: 'areaOfStorage',
				options: [
					{ value: '', content: 'Seleccione una opción' },
					{ value: 'Area 1', content: 'Area 1' },
					{ value: 'Area 2', content: 'Area 2' },
					{ value: 'Area 3', content: 'Area 3' },
				],
				label: 'Area de almacenamiento',
				placeholder: 'Seleccione una opción',
				required: true,
			},
			{
				type: 'number',
				label: 'Cantidad',
				key: 'amount',
				placeholder: 'Cantidad',
				required: true,
			},
		],
	},
	{
		title: 'Tipo de trabajo',
		fields: [
			{
				type: 'component',
				Component: <TypeOfWork />,
			},
		],
	},
	{
		title: 'Costo unitario',
		fields: [
			{
				key: 'typeOfMoney',
				label: 'Tipo de moneda',
				type: 'text',
				placeholder: 'Seleccione una opción',
				required: true,
			},
			{
				key: 'unitaryCost',
				label: 'Precio unitario',
				placeholder: 'Precio unitario',
				type: 'number',
				required: true,
			},
		],
	},
]

function validateForm (formData: FormData) {
	const values = Object.fromEntries(formData.entries())

	const result = schema.safeParse(values)

	if (result.success) {
		return result.data
	} else {
		return null
	}
}

export const Modal = ({
	id,
	onSuccess,
	onError,
}: {
	id: string
	onSuccess: (data: PersonalProtectiveEquipment) => void
	onError: (error: Error) => void
}): JSX.Element => {
	const formRef = useRef<HTMLFormElement>(null)

	const handleResetForm = () => {
		formRef.current?.reset()
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const data = validateForm(formData)

		if (data == null) {
			onError(new Error('Formulario no válido'))
		} else {
			onSuccess(data)
		}
	}

	return (
		<div
			className="modal fade"
			id={id}
		>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<Form
					ref={formRef} 
					handleSubmit={handleSubmit} 
					handleCancel={handleResetForm}
					schema={fieldSchema}
				/>
			</div>
		</div>
	)
}
