import { useState } from "react";

const data = [
	{
		title: "DNI",
		type: "text",
		value: "12345678",
		disabled: true,
		name: "dni",
	},
	{
		title: "Nombres",
		type: "text",
		value: "Jhunior",
		disabled: true,
		name: "name",
	},
	{
		title: "Apellido Paterno",
		type: "text",
		value: "Chavez Cruz",
		disabled: true,
		name: "apellidoPaterno",
	},
	{
		title: "Apellido Materno",
		type: "text",
		value: "Chavez Cruz",
		disabled: true,
		name: "apellidoMaterno",
	},
	{
		title: "Fecha de Nacimiento",
		type: "date",
		value: "01/01/1990",
		disabled: true,
		name: "birthdate",
	},
	{
		title: "Género",
		type: "select",
		value: "Masculino",
		disabled: true,
		name: "genero",
	},
	{
		title: "Correo personal",
		type: "email",
		value: "jhunior@gmail.com",
		disabled: true,
		name: "email",
	},
	{
		title: "Dirección",
		type: "text",
		value: "Calle 123, 123 123",
		disabled: true,
		name: "direccion",
	},
	{
		title: "Distrito",
		type: "text",
		value: "Estado de México",
		disabled: true,
		name: "distrito",
	},
	{
		title: "Telefono personal",
		type: "tel",
		value: "+52 (123) 4567-8910",
		disabled: true,
		name: "indicativoTel",
	},
	{
		title: "Telefono Laboral",
		type: "tel",
		value: "+52 (123) 4567-8910",
		disabled: true,
		name: "indicativoTelLaboral",
	},
];

export function PersonalDataSection() {
	return (
		<div className="card mb-8" id="personal-data">
			<div className="card-header">
				<h2 className="card-title">Datos personales</h2>
			</div>
			<div className="card-body">
				<div className="card-content">
					<form action="">
						{data.map((item) => (
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
										disabled={true}
										defaultValue={item.value}
									/>
								</div>
							</div>
						))}
					</form>
				</div>
			</div>
		</div>
	);
}
