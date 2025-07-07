const data = [
	{
		title: 'Codigo del trabajador',
		type: 'text',
		value: '12345678',
		disabled: true,
		name: 'code',
	},
	{
		title: 'Puesto del trabajador',
		type: 'text',
		value: 'Jefe de departamento',
		disabled: true,
		name: 'position',
	},
	{
		title: 'Area del trabajador',
		type: 'text',
		value: 'Departamento de la empresa',
		disabled: true,
		name: 'area',
	},
	{
		title: 'Gerencia',
		type: 'text',
		value: 'Jefe de departamento',
		disabled: true,
		name: 'manager',
	},
	{
		title: 'Servicio',
		type: 'text',
		value: 'Jefe de departamento',
		disabled: true,
		name: 'service',
	},
	{
		title: 'Empresa',
		type: 'text',
		value: 'Jefe de departamento',
		disabled: true,
		name: 'company',
	},
	{
		title: 'Razón social',
		type: 'text',
		value: 'Jefe de departamento',
		disabled: true,
		name: 'reason',
	},
	{
		title: 'Lugar de trabajo',
		type: 'text',
		value: 'Jefe de departamento',
		disabled: true,
		name: 'place',
	},
	{
		title: 'Fecha de ingreso',
		type: 'date',
		value: '01/01/1990',
		disabled: true,
		name: 'startdate',
	},
]

export function EmploymentDataSection () {
	return (
		<div className="card mb-8" id="employment-data">
			<div className="card-header">
				<h2 className="card-title">Datos laborales</h2>
			</div>
			<div className="card-body">
				<div className="card-content">
					<form action="">
						{
							data.map((item) => (
								<div className="form-group row my-4" key={item.name}>
									<label className="col-form-label col-lg-4 col-sm-12">
										{item.title}
									</label>
									<div className="col-lg-8 col-md-9 col-sm-12">
										<input 
											name={item.name} 
											type={item.type} 
											className="form-control" 
											placeholder={item.value} 
											disabled={item.disabled} 
										/>
									</div>
								</div>
							))
						}
						<div className="d-flex justify-content-end mt-8">
							<button className="btn btn-primary">Guardar cambios</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
