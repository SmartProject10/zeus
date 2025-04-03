import { useState } from "react";
import Swal from "sweetalert2";
import { KTCardBody } from "../../../../../../generalcomponents/helpers";
import { EmergencyLightsRequest } from "@zeus/models/apimodels/EmergencyLightsModel";

export interface EmergencyLightsForm {
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

export const EmergencyLightsButton = () => {
	const [form, setForm] = useState<EmergencyLightsForm>({
		numero: "",
		sede: "",
		area: "",
		ubicacionEspecifica: "",
		codigo: "",
		marca: "",
		fechaIngresoEmpresa: "",
	});

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (
			!form.numero ||
			!form.sede ||
			!form.area ||
			!form.ubicacionEspecifica ||
			!form.codigo ||
			!form.marca ||
			!form.fechaIngresoEmpresa
		) {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			});
			Toast.fire({
				icon: "error",
				title: "Porfavor rellene todos los campos",
			});

			return;
		}

		// const data = new FormData();

		// data.append('area', form.area);
		// data.append('cargo', form.cargo);
		// data.append('firmaDigital', form.firmaDigital);
		// if (form.recFacial) {
		//     data.append('recFacial', form.recFacial);
		// }
		// data.append('nacionalidad', form.nacionalidad);
		// data.append('estadoCivil', form.estadoCivil);
		// data.append('genero', form.genero);
		// data.append('dni', form.dni);
		// data.append('fechaNacimiento', form.fechaNacimiento);
		// data.append('nombres', form.nombres);
		// data.append('apellidoPaterno', form.apellidoPaterno);
		// data.append('apellidoMaterno', form.apellidoMaterno);
		// data.append('distrito', form.distrito);
		// data.append('direccion', form.direccion);
		// data.append('corpEmail', form.corpEmail);
		// data.append('perEmail', form.perEmail);
		// data.append('telefono', form.indicativoTel + "" + form.telefono);
		// data.append('fechaIngresoArea', form.fechaIngresoArea);
		// data.append('FechaIngresoEmp', form.FechaIngresoEmp);
		// data.append('tipoRol', form.tipoRol);
		// data.append('status', form.status);
		// data.append('sedeTrabajo', form.sedeTrabajo);

		const newEmployee: EmergencyLightsRequest = {
			numero: form.numero,
			sede: form.sede,
			area: form.area,
			ubicacionEspecifica: form.ubicacionEspecifica,
			codigo: form.codigo,
			marca: form.marca,
			fechaIngresoEmpresa: form.fechaIngresoEmpresa,
		};

		try {
			//actualizarlo con el endpoint correspondiente de "emergencyLights"
			//const resp = await backyService.emergencyLights.register(newEmployee);

			// if (resp.status == 201) {
			// 	//appStateService.setEmployeeSubject(resp.data);

			// 	const Toast = Swal.mixin({
			// 		toast: true,
			// 		position: "top-end",
			// 		showConfirmButton: false,
			// 		timer: 3000,
			// 		timerProgressBar: true,
			// 		didOpen: (toast) => {
			// 			toast.onmouseenter = Swal.stopTimer;
			// 			toast.onmouseleave = Swal.resumeTimer;
			// 		},
			// 	});
			// 	Toast.fire({
			// 		icon: "success",
			// 		title: "Trabajador creado correctamente",
			// 	});

			// 	const closeButton = document.getElementById("closeButton");
			// 	if (closeButton) {
			// 		closeButton.click();
			// 	}
			// } else {
			// 	console.log(resp);
			// }
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	};

	return (
		<KTCardBody>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				{/* <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                </button>
                <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Exportar a Excel
                </button> */}
				<button
					className="btn btn-primary btn-sm"
					type="button"
					data-bs-toggle="modal"
					data-bs-target="#staticBackdrop"
				>
					<i className="bi bi-plus-circle-fill"></i>
					Nueva Luz de emergencia
				</button>
			</div>

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Nueva Luz de emergencia
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="card">
								<div className="card-body">
									<form onSubmit={handleSubmit}>
										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="numeroInput"
													className="required col-form-label"
												>
													Numero
												</label>
											</div>
											<div className="col-6">
												<input
													type="text"
													id="numeroInput"
													name="numero"
													value={form.numero}
													onChange={handleChange}
													placeholder="Numero"
													className="form-control input-sm"
													required
												/>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="sedeInput"
													className="required col-form-label"
												>
													Sede
												</label>
											</div>
											<div className="col-6">
												<select
													className="form-select select-sm"
													id="sedeInput"
													name="sede"
													value={form.sede}
													onChange={handleChange}
													aria-label="Default select example"
													required
												>
													<option value="">Seleccione</option>
													<option value="Sede 1">Sede 1</option>
													<option value="Sede 2">Sede 2</option>
												</select>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="areaInput"
													className="required col-form-label"
												>
													Área
												</label>
											</div>
											<div className="col-6">
												<select
													className="form-select select-sm"
													id="areaInput"
													name="area"
													value={form.area}
													onChange={handleChange}
													aria-label="Default select example"
													required
												>
													<option value="">Seleccione</option>
													<option value="Área 1">Área 1</option>
													<option value="Área 2">Área 2</option>
												</select>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="ubicacionEspecificaInput"
													className="required col-form-label"
												>
													Ubicación especifica
												</label>
											</div>
											<div className="col-6">
												<input
													type="text"
													id="ubicacionEspecificaInput"
													name="ubicacionEspecifica"
													value={form.ubicacionEspecifica}
													onChange={handleChange}
													placeholder="Ubicación especifica"
													className="form-control input-sm"
													required
												/>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="codigoInput"
													className="required col-form-label"
												>
													Código
												</label>
											</div>
											<div className="col-6">
												<input
													type="text"
													pattern="[a-zA-Z0-9]+"
													id="codigoInput"
													name="codigo"
													value={form.codigo}
													onChange={handleChange}
													placeholder="Código"
													className="form-control input-sm"
													required
												/>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="marcaInput"
													className="required col-form-label"
												>
													Marca
												</label>
											</div>
											<div className="col-6">
												<input
													placeholder="Ej. Marca"
													name="marca"
													type="text"
													list="marcasExistentes"
													id="marcaInput"
													value={form.marca}
													onChange={handleChange}
													className="form-control input-sm"
													required
												/>
												<datalist id="marcasExistentes">
													<option value="Adidas">Adidas</option>
													<option value="Samsung">Samsung</option>
													<option value="LG">LG</option>
													<option value="Huawei">Huawei</option>
													<option value="Toyota">Toyota</option>
													<option value="Tesla">Tesla</option>
												</datalist>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="fechaIngresoInput"
													className="required col-form-label"
												>
													Fecha de ingreso a la empresa
												</label>
											</div>
											<div className="col-6">
												<input
													type="date"
													id="fechaIngresoInput"
													name="fechaIngreso"
													value={form.fechaIngresoEmpresa}
													onChange={handleChange}
													className="form-control input-sm"
													required
												/>
											</div>
										</div>

										<div className="d-flex justify-content-center gap-10 modal-footer">
											<button
												type="button"
												className="btn btn-secondary"
												id="closeButton"
												data-bs-dismiss="modal"
											>
												Cerrar
											</button>
											<button type="submit" className="btn btn-success">
												Guardar
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</KTCardBody>
	);
};
