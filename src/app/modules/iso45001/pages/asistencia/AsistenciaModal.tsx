/* eslint-disable max-len */
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as Yup from 'yup'

const estadisticaValidation = Yup.object().shape({
	sede: Yup.string().required('Sede requerida'),
	opcion1: Yup.string(),
	opcion2: Yup.string(),
	opcion3: Yup.string(),
	opcion: Yup.string().test(
		'opcion-check',
		'Debes seleccionar al menos una opción',
		function () {
			const { opcion1, opcion2, opcion3 } = this.parent
			return opcion1 || opcion2 || opcion3
		},
	),
	otro: Yup.string().required('Otro requerido'),
	capacitador: Yup.string().required('Capacitador requerido'),
	cargo: Yup.string().required('Cargo requerido'),
	trabajadores: Yup.string().required('Trabajadores requerido'),
	fecha: Yup.string().required('Fecha requerida'),
	horaInicio: Yup.string().required('Hora Inicio requerida'),
	horaFinal: Yup.string().required('Hora Final requerida'),
	area: Yup.string().required('Área requerida'),
})

const optionsData = {
	opcion1: [
		{ value: 'Objetivo General 1', label: 'Objetivo General 1' },
		{ value: 'Objetivo General 2', label: 'Objetivo General 2' },
	],
	opcion2: [
		{ value: 'Programa Capacitación 1', label: 'Programa Capacitación 1' },
		{ value: 'Programa Capacitación 2', label: 'Programa Capacitación 2' },
	],
	opcion3: [
		{ value: 'Programa Charla 1', label: 'Programa Charla 1' },
		{ value: 'Programa Charla 2', label: 'Programa Charla 2' },
	],
	sede: [
		{ value: 'Sede 1 ', label: 'Sede 1' },
		{ value: 'Sede 2', label: 'Sede 2' },
	],
	area: [
		{ value: 'Area 1 ', label: 'Area 1' },
		{ value: 'Area 2 ', label: 'Area 2' },
	],
	cargo: [
		{ value: 'Cargo 1 ', label: 'Cargo 1' },
		{ value: 'Cargo 2 ', label: 'Cargo 2' },
	],
}

function AsistenciaModal({ item }: any) {
	const formik = useFormik({
		validationSchema: estadisticaValidation,
		initialValues: {
			sede: '',
			opcion: '',
			opcion1: '',
			opcion2: '',
			opcion3: '',
			otro: '',
			capacitador: '',
			area: '',
			cargo: '',
			trabajadores: '',
			fecha: '',
			horaInicio: '',
			horaFinal: '',
		},
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const handleSelectChange = (e) => {
		const { id, value } = e.target

		// Limpiar las otras opciones cuando una es seleccionada
		formik.setValues({
			...formik.values,
			opcion1: id === 'opcion1' ? value : '' ,
			opcion2: id === 'opcion2' ? value : '',
			opcion3: id === 'opcion3' ? value : '',
		})
	}
	const renderSelect = (id, label, options, touched, errors, getFieldProps) => (
		<div className="col-sm-6">
			<label htmlFor={id} className="required form-label">{label}</label>
			<select
				id={id}
				className={clsx(
					'form-select',
					{ 'is-invalid': touched && errors },
					{ 'is-valid': touched && !errors },
				)}
				{...getFieldProps(id)}
				onChange={handleSelectChange}
			>
				<option value="">Seleccione</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
			{touched && errors && (
				<div className="text-danger small"><span role="alert">{errors}</span></div>
			)}
		</div>
	)

	return (
		<div className="modal-body">
			<form onSubmit={formik.handleSubmit}>
				<div className="card shadow-none mb-10">
					<div className="card-body bg-secondary card-blank">
						<div className="row gy-4">
							{renderSelect('opcion1', 'Opción 1', optionsData.opcion1, formik.touched.opcion, formik.errors.opcion, formik.getFieldProps)}
							{renderSelect('opcion2', 'Opción 2', optionsData.opcion2, formik.touched.opcion, formik.errors.opcion, formik.getFieldProps)}
							{renderSelect('opcion3', 'Opción 3', optionsData.opcion3, formik.touched.opcion, formik.errors.opcion, formik.getFieldProps)}
							{renderSelect('sede', 'Sede', optionsData.sede, formik.touched.sede, formik.errors.sede, formik.getFieldProps)}
							{renderSelect('area', 'Área', optionsData.area, formik.touched.area, formik.errors.area, formik.getFieldProps)}
							{renderSelect('cargo', 'Cargo', optionsData.cargo, formik.touched.cargo, formik.errors.cargo, formik.getFieldProps)}

							{/* Input fields */}
							{['otro', 'capacitador'].map(field => (
								<div className="col-sm-6" key={field}>
									<label htmlFor={field} className="required form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
									<input
										type="text"
										className={clsx(
											'form-control',
											{ 'is-invalid': formik.touched[field] && formik.errors[field] },
											{ 'is-valid': formik.touched[field] && !formik.errors[field] },
										)}
										id={field}
										{...formik.getFieldProps(field)}
									/>
									{formik.touched[field] && formik.errors[field] && (
										<div className="text-danger small"><span role="alert">{formik.errors[field]}</span></div>
									)}
								</div>
							))}

							<div className="col-sm-6">
								<label htmlFor="trabajadores" className="required form-label">Trabajadores</label>
								<input
									type="number"
									placeholder="Cantidad de Trabajadores"
									id="trabajadores"
									{...formik.getFieldProps('trabajadores')}
									className={clsx(
										'form-control',
										{ 'is-invalid': formik.touched.trabajadores && formik.errors.trabajadores },
										{ 'is-valid': formik.touched.trabajadores && !formik.errors.trabajadores },
									)}
								/>
							</div>

							<div className="col-sm-6">
								<label htmlFor="fecha" className="required form-label">Fecha</label>
								<input
									type="date"
									className={clsx(
										'form-control',
										{ 'is-invalid': formik.touched.fecha && formik.errors.fecha },
										{ 'is-valid': formik.touched.fecha && !formik.errors.fecha },
									)}
									id="fecha"
									{...formik.getFieldProps('fecha')}
								/>
								{formik.touched.fecha && formik.errors.fecha && (
									<div className="text-danger small"><span role="alert">{formik.errors.fecha}</span></div>
								)}
							</div>

							<div className="col-sm-6">
								<label htmlFor="horaInicio" className="required form-label">Hora de Inicio</label>
								<input
									type="time"
									className={clsx(
										'form-control',
										{ 'is-invalid': formik.touched.horaInicio && formik.errors.horaInicio },
										{ 'is-valid': formik.touched.horaInicio && !formik.errors.horaInicio },
									)}
									id="horaInicio"
									{...formik.getFieldProps('horaInicio')}
								/>
								{formik.touched.horaInicio && formik.errors.horaInicio && (
									<div className="text-danger small"><span role="alert">{formik.errors.horaInicio}</span></div>
								)}
							</div>

							<div className="col-sm-6">
								<label htmlFor="horaFinal" className="required form-label">Hora Final</label>
								<input
									type="time"
									className={clsx(
										'form-control',
										{ 'is-invalid': formik.touched.horaFinal && formik.errors.horaFinal },
										{ 'is-valid': formik.touched.horaFinal && !formik.errors.horaFinal },
									)}
									id="horaFinal"
									{...formik.getFieldProps('horaFinal')}
								/>
								{formik.touched.horaFinal && formik.errors.horaFinal && (
									<div className="text-danger small"><span role="alert">{formik.errors.horaFinal}</span></div>
								)}
							</div>

							{/* Submit button */}
							<div className="col-sm-12">
								<button type="submit" className="btn btn-primary">Guardar</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AsistenciaModal
