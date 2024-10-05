const data = [
	{
		title: 'Nombres',
		type: 'text',
		value: 'Jhunior',
		disabled: true,
		name: 'name',
	},
	{
		title: 'Apellidos',
		type: 'text',
		value: 'Chavez Cruz',
		disabled: true,
		name: 'lastname',
	},
	{
		title: 'Fecha de nacimiento',
		type: 'date',
		value: '01/01/1990',
		disabled: true,
		name: 'birthdate',
	},
	{
		title: 'Sexo',
		type: 'select',
		value: 'Masculino',
		disabled: true,
		name: 'sex',
	},
	{
		title: 'Correo personal',
		type: 'email',
		value: 'jhunior@gmail.com',
		disabled: true,
		name: 'email',
	},
	{
		title: 'Dirección del domicilio',
		type: 'text',
		value: 'Calle 123, 123 123',
		disabled: true,
		name: 'address',
	},
	{
		title: 'Ciudad',
		type: 'text',
		value: 'Ciudad de México',
		disabled: true,
		name: 'city',
	},
	{
		title: 'Estado',
		type: 'text',
		value: 'Estado de México',
		disabled: true,
		name: 'state',
	},
	{
		title: 'Telefono personal',
		type: 'tel',
		value: '+52 (123) 4567-8910',
		disabled: true,
		name: 'phone',
	},
	{
		title: 'Telefono de casa',
		type: 'tel',
		value: '+52 (123) 4567-8910',
		disabled: true,
		name: 'phonehome',
	},
	{
		title: 'Telefono del trabajo',
		type: 'tel',
		value: '+52 (123) 4567-8910',
		disabled: true,
		name: 'phonework',
	},
]

export function PersonalDataSection () {
	return (
		<div className="card mb-8" id="personal-data">
			<div className="card-header">
				<h2 className="card-title">Datos personales</h2>
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
