import { useFormik } from 'formik' // Asegúrate de importar useFormik si lo estás usando para manejar formularios
import clsx from 'clsx' // Asegúrate de que clsx esté instalado para manejar clases condicionalmente

function AsistenciaModal({ item }: any) {
	// Puedes utilizar `item` para mostrar los datos en el modal
	const { getFieldProps, touched, errors, handleSubmit } = useFormik({
		initialValues: {
			objetivoGeneral: '',
			objetivoEspecifico: '',
			actividad: '',
			programaCapacitacion: '',
			programaCharla: '',
			otro: '',
			sede: '',
			capacitador: '',
			area: '',
			cargo: '',
			trabajadores: '',
			fecha: '',
			horaInicio: '',
			horaFinal: '',
		},
		// Aquí van tus validaciones y onSubmit
	})

	return (
		<div className="modal-body">
			<div className="card shadow-none mb-10">
				<div className="card-body bg-secondary card-blank">
					<div className="row gy-4">
						{/* Campos del formulario */}
						<div className="col-sm-6">
							<label htmlFor="objetivoGeneral" className="required form-label">Objetivo General</label>
							<select
								id="objetivoGeneral"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.objetivoGeneral && errors.objetivoGeneral },
									{ 'is-valid': touched.objetivoGeneral && !errors.objetivoGeneral },
								)}
								{...getFieldProps('objetivoGeneral')}
							>
								<option value="">Seleccione</option>
								<option value="Objetivo 1">Objetivo 1</option>
								<option value="Objetivo 2">Objetivo 2</option>
							</select>
							{touched.objetivoGeneral && errors.objetivoGeneral && (
								<div className="text-danger small">
									<span role="alert">{errors.objetivoGeneral}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="objetivoEspecifico" className="required form-label">Objetivo Específico</label>
							<select
								id="objetivoEspecifico"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.objetivoEspecifico && errors.objetivoEspecifico },
									{ 'is-valid': touched.objetivoEspecifico && !errors.objetivoEspecifico },
								)}
								{...getFieldProps('objetivoEspecifico')}
							>
								<option value="">Seleccione</option>
								<option value="Especifico 1">Especifico 1</option>
								<option value="Especifico 2">Especifico 2</option>
							</select>
							{touched.objetivoEspecifico && errors.objetivoEspecifico && (
								<div className="text-danger small">
									<span role="alert">{errors.objetivoEspecifico}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="actividad" className="required form-label">Actividad</label>
							<select
								id="actividad"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.actividad && errors.actividad },
									{ 'is-valid': touched.actividad && !errors.actividad },
								)}
								{...getFieldProps('actividad')}
							>
								<option value="">Seleccione</option>
								<option value="Actividad 1">Actividad 1</option>
								<option value="Actividad 2">Actividad 2</option>
							</select>
							{touched.actividad && errors.actividad && (
								<div className="text-danger small">
									<span role="alert">{errors.actividad}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="programaCapacitacion" className="required form-label">Programa Capacitación</label>
							<select
								id="programaCapacitacion"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.programaCapacitacion && errors.programaCapacitacion },
									{ 'is-valid': touched.programaCapacitacion && !errors.programaCapacitacion },
								)}
								{...getFieldProps('programaCapacitacion')}
							>
								<option value="">Seleccione</option>
								<option value="Programa 1">Programa 1</option>
								<option value="Programa 2">Programa 2</option>
							</select>
							{touched.programaCapacitacion && errors.programaCapacitacion && (
								<div className="text-danger small">
									<span role="alert">{errors.programaCapacitacion}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="programaCharla" className="required form-label">Programa Charla</label>
							<select
								id="programaCharla"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.programaCharla && errors.programaCharla },
									{ 'is-valid': touched.programaCharla && !errors.programaCharla },
								)}
								{...getFieldProps('programaCharla')}
							>
								<option value="">Seleccione</option>
								<option value="Charla 1">Charla 1</option>
								<option value="Charla 2">Charla 2</option>
							</select>
							{touched.programaCharla && errors.programaCharla && (
								<div className="text-danger small">
									<span role="alert">{errors.programaCharla}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="otro" className="required form-label">Otro</label>
							<input
								type="text"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.otro && errors.otro },
									{ 'is-valid': touched.otro && !errors.otro },
								)}
								placeholder="Otro"
								id="otro"
								{...getFieldProps('otro')}
							/>
							{touched.otro && errors.otro && (
								<div className="text-danger small">
									<span role="alert">{errors.otro}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="sede" className="required form-label">Sede</label>
							<select
								id="sede"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.sede && errors.sede },
									{ 'is-valid': touched.sede && !errors.sede },
								)}
								{...getFieldProps('sede')}
							>
								<option value="">Seleccione</option>
								<option value="Sede 1">Sede 1</option>
								<option value="Sede 2">Sede 2</option>
							</select>
							{touched.sede && errors.sede && (
								<div className="text-danger small">
									<span role="alert">{errors.sede}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="capacitador" className="required form-label">Capacitador</label>
							<input
								type="text"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.capacitador && errors.capacitador },
									{ 'is-valid': touched.capacitador && !errors.capacitador },
								)}
								placeholder="Capacitador"
								id="capacitador"
								{...getFieldProps('capacitador')}
							/>
							{touched.capacitador && errors.capacitador && (
								<div className="text-danger small">
									<span role="alert">{errors.capacitador}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="area" className="required form-label">Área</label>
							<select
								id="area"
								className={clsx(
									'form-select',
									{ 'is-invalid': touched.area && errors.area },
									{ 'is-valid': touched.area && !errors.area },
								)}
								{...getFieldProps('area')}
							>
								<option value="">Seleccione</option>
								<option value="Área 1">Área 1</option>
								<option value="Área 2">Área 2</option>
							</select>
							{touched.area && errors.area && (
								<div className="text-danger small">
									<span role="alert">{errors.area}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="cargo" className="required form-label">Cargo</label>
							<input
								type="text"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.cargo && errors.cargo },
									{ 'is-valid': touched.cargo && !errors.cargo },
								)}
								placeholder="Cargo"
								id="cargo"
								{...getFieldProps('cargo')}
							/>
							{touched.cargo && errors.cargo && (
								<div className="text-danger small">
									<span role="alert">{errors.cargo}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="trabajadores" className="required form-label">Trabajadores</label>
							<input
								type="number"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.trabajadores && errors.trabajadores },
									{ 'is-valid': touched.trabajadores && !errors.trabajadores },
								)}
								placeholder="Cantidad de Trabajadores"
								id="trabajadores"
								{...getFieldProps('trabajadores')}
							/>
							{touched.trabajadores && errors.trabajadores && (
								<div className="text-danger small">
									<span role="alert">{errors.trabajadores}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="fecha" className="required form-label">Fecha</label>
							<input
								type="date"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.fecha && errors.fecha },
									{ 'is-valid': touched.fecha && !errors.fecha },
								)}
								id="fecha"
								{...getFieldProps('fecha')}
							/>
							{touched.fecha && errors.fecha && (
								<div className="text-danger small">
									<span role="alert">{errors.fecha}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="horaInicio" className="required form-label">Hora de Inicio</label>
							<input
								type="time"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.horaInicio && errors.horaInicio },
									{ 'is-valid': touched.horaInicio && !errors.horaInicio },
								)}
								id="horaInicio"
								{...getFieldProps('horaInicio')}
							/>
							{touched.horaInicio && errors.horaInicio && (
								<div className="text-danger small">
									<span role="alert">{errors.horaInicio}</span>
								</div>
							)}
						</div>

						<div className="col-sm-6">
							<label htmlFor="horaFinal" className="required form-label">Hora Final</label>
							<input
								type="time"
								className={clsx(
									'form-control',
									{ 'is-invalid': touched.horaFinal && errors.horaFinal },
									{ 'is-valid': touched.horaFinal && !errors.horaFinal },
								)}
								id="horaFinal"
								{...getFieldProps('horaFinal')}
							/>
							{touched.horaFinal && errors.horaFinal && (
								<div className="text-danger small">
									<span role="alert">{errors.horaFinal}</span>
								</div>
							)}
						</div>

						{/* Botón para enviar el formulario */}
						<div className="col-12">
							<button
type="button" className="btn btn-primary"
onClick={handleSubmit}>
								Enviar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AsistenciaModal
