/* eslint-disable max-len */
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as Yup from 'yup'

// Validación con Yup
const estadisticaValidation = Yup.object().shape({
	sede: Yup.string().required('Sede requerida'),
	opcion1: Yup.object(),
	opcion2: Yup.string(),
	opcion3: Yup.string(),
	otro: Yup.string(),
	capacitador: Yup.string().required('Capacitador requerido'),
	cargo: Yup.string().required('Cargo requerido'),
	trabajadores: Yup.string().required('Trabajadores requerido'),
	fecha: Yup.string().required('Fecha requerida'),
	horaInicio: Yup.string().required('Hora Inicio requerida'),
	horaFinal: Yup.string().required('Hora Final requerida'),
	area: Yup.string().required('Área requerida'),
})

// Opciones para los select
const optionsData = {
	opcion1: [
		{ value: 'Opcion 1', label: 'Opcion 1' },
		{ value: 'Opcion 2', label: 'Opcion 2' },
		{ value: 'Opcion 3', label: 'Opcion 3' },
	],
	opcion2: [
		{ value: 'PROGRAMA CAPACITACION', label: 'PROGRAMA CAPACITACION' },
	],
	opcion3: [
		{ value: 'PROGRAMA CHARLA', label: 'PROGRAMA CHARLA' },
	],
	sede: [
		{ value: 'Sede 1 ', label: 'Sede 1' },
		{ value: 'Sede 2 ', label: 'Sede 2' },
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
			opcion1: { general: '', especifico: '', actividad: '' },
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
		const { id, value } = e.target;

		// Marca el campo como tocado
		formik.setFieldTouched(id, true);

		// Resetear las demás opciones cuando se elige una
		if (['opcion1.general', 'opcion1.especifico', 'opcion1.actividad', 'opcion2', 'opcion3', 'otro'].includes(id)) {
			formik.setValues({
				...formik.values,
				opcion1: id.startsWith('opcion1') ? { ...formik.values.opcion1, [id.split('.')[1]]: value } : { general: '', especifico: '', actividad: '' },
				opcion2: id === 'opcion2' ? value : '',
				opcion3: id === 'opcion3' ? value : '',
				otro: id === 'otro' ? value : '',
			});
		} else {
			formik.setFieldValue(id, value);
		}
	};

	// Deshabilitar las opciones si alguna otra opción está seleccionada
	const isDisabled = (field) => formik.values.opcion1.general || formik.values.opcion1.especifico || formik.values.opcion1.actividad || formik.values.opcion2 || formik.values.opcion3 || formik.values.otro;

	// Renderizar los desplegables
	const renderSelect = (id, label, options, disabled) => (
		<div className="col-sm-6">
			<label htmlFor={id} className="required form-label">{label}</label>
			<select
				id={id}
				className={clsx(
					'form-select',
					{ 'is-invalid': formik.touched[id] && formik.errors[id] },
					{ 'is-valid': formik.touched[id] && !formik.errors[id] }
				)}
				{...formik.getFieldProps(id)}
				onChange={handleSelectChange}
				disabled={disabled}
			>
				<option value="">Seleccione</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
			{formik.touched[id] && formik.errors[id] && (
				<div className="text-danger small"><span role="alert">{formik.errors[id]}</span></div>
			)}
		</div>
	)

	return (
		<div className="modal-body">
			<form onSubmit={formik.handleSubmit}>
				<div className="card shadow-none mb-10">
					<div className="card-body bg-secondary card-blank">
						<div className="row gy-4">
							{/* Opción 1 */}
							<h5 className="mb-3">Opción 1</h5>
							{renderSelect('opcion1.general', 'Objetivo General', optionsData.opcion1, isDisabled('opcion1.general'))}
							{renderSelect('opcion1.especifico', 'Objetivo Específico', optionsData.opcion1, isDisabled('opcion1.especifico'))}
							{renderSelect('opcion1.actividad', 'Actividad', optionsData.opcion1, isDisabled('opcion1.actividad'))}

							{/* Opción 2 */}
							<h5 className="mb-3">Opción 2</h5>
							{renderSelect('opcion2', 'Programa Capacitación', optionsData.opcion2, isDisabled('opcion2'))}

							{/* Opción 3 */}
							<h5 className="mb-3">Opción 3</h5>
							{renderSelect('opcion3', 'Programa Charla', optionsData.opcion3, isDisabled('opcion3'))}

							{/* Opción 4 - Otros */}
							<h5 className="mb-3">Opción 4</h5>
							<div className="col-sm-6">
								<label htmlFor="otro" className="required form-label">Otros</label>
								<input
									type="text"
									className={clsx(
										'form-control',
										{ 'is-invalid': formik.touched.otro && formik.errors.otro },
										{ 'is-valid': formik.touched.otro && !formik.errors.otro }
									)}
									id="otro"
									{...formik.getFieldProps('otro')}
									onChange={handleSelectChange}
									disabled={isDisabled('otro')}
								/>
								{formik.touched.otro && formik.errors.otro && (
									<div className="text-danger small"><span role="alert">{formik.errors.otro}</span></div>
								)}
							</div>

							{/* Otros campos */}
							{renderSelect('sede', 'Sede', optionsData.sede, false)}
							{renderSelect('area', 'Área', optionsData.area, false)}
							{renderSelect('cargo', 'Cargo', optionsData.cargo, false)}

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

							{/* Fecha y Hora */}
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
							</div>

							{/* Botón de enviar */}
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
