import { ReactElement, forwardRef } from 'react'

interface SelectOption {
	value: string
	content: string
}

type Field = 
	| { 
		type: 'component'
		Component: ReactElement
	}
	| {
		key: string
		label: string
		type: 'select'
		options: SelectOption[]
		placeholder: string
		required: boolean
	}
	| {
		key: string
		label: string
		type: 'text' | 'number' | 'date'
		placeholder: string
		required: boolean
	}

export interface FieldSchema {
	title: string
	fields: Field[]
}

const RenderField = ({
	field,
}: {
	field: Field
}): JSX.Element => {
	if (field.type === 'component') {
		const { Component } = field 

		return (
			<>
				{Component}
			</>
		)
	}

	if (field.type === 'select') {
		return (
			<select className="form-select" name={field.key}>
				{field.options.map((option, index) => (
					<option value={option.value} key={index}>
						{option.content}
					</option>
				))}
			</select>
		)
	}

	return (
		<input
			type={field.type}
			className="form-control"
			placeholder={field.placeholder}
			name={field.key}
		/>
	)
}

export interface FormProps {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	handleCancel: () => void
	schema: FieldSchema[]
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({
	handleSubmit,
	handleCancel,
	schema,
}, ref) => {
	return (
		<form
			className="modal-content h-100"
			ref={ref}
			onSubmit={handleSubmit}
		>
			<div className="modal-header">
				<h2 className="modal-title">
					Nuevo Equipo de Protección Personal
				</h2>
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
				/>
			</div>
			<div className="modal-body">
				{schema.map((opt, index) => (
					<div className="card mb-6" key={index}>
						<div className="card-header">
							<h3 className="card-title">{opt.title}</h3>
						</div>
						<div className="card-body">
							{opt.fields.map((field, index) => (
								<div key={index}>
									{field.type === 'component' ? (
										<RenderField field={field} />
									) : (
										<div className="form-group row my-4">
											<label className="col-form-label col-lg-6 col-sm-12 required">
												{field.label}
											</label>
											<div className="col-lg-6 col-md-9 col-sm-12">
												<RenderField field={field} />
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="modal-footer">
				<button 
					type="button" 
					className="btn btn-secondary" data-bs-dismiss="modal"
					onClick={handleCancel}
				>
					Cancelar
				</button>

				<button type="submit" className="btn btn-primary">
					Guardar
				</button>
			</div>
		</form>
	)
})

Form.displayName = 'Form'
