import { useState } from "react";

const data = [
	{
		title: "Codigo del trabajador",
		type: "text",
		value: "12345678",
		disabled: true,
		name: "codigoTrabajador",
	},
	{
		title: "Área ",
		type: "text",
		value: "Departamento de la empresa",
		disabled: true,
		name: "area",
	},
	{
		title: "Cargo",
		type: "text",
		value: "Jefe de departamento",
		disabled: true,
		name: "cargo",
	},
	{
		title: "Empresa",
		type: "text",
		value: "Jefe de departamento",
		disabled: true,
		name: "company",
	},
	{
		title: "Razón social",
		type: "text",
		value: "Jefe de departamento",
		disabled: true,
		name: "reason",
	},
	{
		title: "Sede de trabajo",
		type: "text",
		value: "Jefe de departamento",
		disabled: true,
		name: "sedeTrabajo",
	},
	{
		title: "Tipo de contrato",
		type: "text",
		value: "Indefinido",
		disabled: true,
		name: "tipoContrato",
	},
	{
		title: "Fecha de ingreso a la empresa",
		type: "date",
		value: "01/01/1990",
		disabled: true,
		name: "fechaIngresoEmpresa",
	},
	{
		title: "Fecha de ingeso Área",
		type: "date",
		value: "01/01/1990",
		disabled: true,
		name: "fechaIngresoArea",
	},
	{
		title: "Fecha de fin de contrato",
		type: "date",
		value: "01/01/1990",
		disabled: true,
		name: "fechaFinContrato",
	},
	{
		title: "Tipo de rol",
		type: "text",
		value: "Administrativo",
		disabled: true,
		name: "rollSistemaDigitalizado",
	},
	{
		title: "Brevete",
		type: "text",
		value: "A-I",
		disabled: true,
		name: "brevete",
	},
	{
		title: "Talla de camisa",
		type: "text",
		value: "M",
		disabled: true,
		name: "tallaCamisa",
	},
	{
		title: "Talla de pantalón",
		type: "text",
		value: "32",
		disabled: true,
		name: "tallaPantalon",
	},
	{
		title: "Talla de zapatos",
		type: "text",
		value: "42",
		disabled: true,
		name: "tallaZapatos",
	},
];

export function EmploymentDataSection() {
	return (
		<div className="card mb-8" id="employment-data">
			<div className="card-header">
				<h2 className="card-title">Datos laborales</h2>
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
