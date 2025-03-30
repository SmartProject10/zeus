import { ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { appStateService } from "../../../../../../services/appState.service";
import { dateInput } from "../../../../../../generalcomponents/utils/dateformat/dateFormat";
import { EmergencyLightsResponse,EmergencyLightsRequest } from "@zeus/app/@services/api/dtos/EmergencyLightsModel";
import { backyService } from "@zeus/app/@services/api";

interface MyComponentProps {
	idEmployee: string;
	children?: ReactNode;
}

export interface EmergencyLightsForm {
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
export const ModalEmergencyLightsForm: React.FC<MyComponentProps> = ({
	idEmployee,
	children,
}) => {
	const [form, setForm] = useState<EmergencyLightsForm>({
		numero: "",
		sede: "",
		area: "",
		ubicacionEspecifica: "",
		codigo: "",
		marca: "",
		fechaIngresoEmpresa: "",
	});

	useEffect(() => {
		const initEmployee = async () => {
			try {
				const response = await backyService.emergencyLights.getById(idEmployee);

				if (response.status == 200) {
					const Employee: EmergencyLightsResponse = response.data;

					setForm({
						numero: Employee.area,
						sede: Employee.sede,
						area: Employee.area,
						ubicacionEspecifica: Employee.ubicacionEspecifica,
						codigo: Employee.codigo,
						marca: Employee.marca,
						fechaIngresoEmpresa: dateInput(Employee.fechaIngresoEmpresa),
					});
				}
			} catch (error: any) {
				console.error(error);
			}
		};

		initEmployee();
	}, []);

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	function deleteEmployee(id: string) {
		Swal.fire({
			icon: "question",
			title: "¿Estas segur@ de realizar esta acción?",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Si",
			confirmButtonColor: "#1b84ff",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					const deleteEmployee = async () => {
						const response = await backyService.emergencyLights.delete(id);

						if (response.status == 200) {
							// nesesario agregar estado global para estas entidades (luces de emergencia)
							// appStateService.deleteEmployeeSubject(id);
							// appStateService.setActiveModalSubject();

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
								icon: "success",
								title: "luz de emergencia eliminada correctamente",
							});
						}
					};

					deleteEmployee();
				} catch (e: any) {
					console.error(e);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info')
			}
		});
	}

	function putEmployee(id: string) {
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
				title: "Porfavor, rellenar todos los campos.",
			});

			return;
		}

		Swal.fire({
			icon: "question",
			title: "¿Estas segur@ de realizar esta acción?",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Si",
			confirmButtonColor: "#1b84ff",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					const editEmployee = async () => {
						const request: EmergencyLightsRequest = {
							numero: form.numero,
							sede: form.sede,
							area: form.area,
							ubicacionEspecifica: form.ubicacionEspecifica,
							codigo: form.codigo,
							marca: form.marca,
							fechaIngresoEmpresa: form.fechaIngresoEmpresa,
						};

						const response = await backyService.emergencyLights.put(id, request);

						if (response.status == 200) {
							// nesesario agregar estado global para estas entidades (luces de emergencia)
							// appStateService.putEmployeeSubject(id, request);
							// appStateService.setActiveModalSubject();

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
								icon: "success",
								title: "Luz de emergencia editada correctamente",
							});
						}
					};

					editEmployee();
				} catch (e: any) {
					console.error(e);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info')
			}
		});
	}

	function closeModal() {
		appStateService.setActiveModalSubject();
	}

	return (
		<div
			className="modal fade show"
			id="modal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
			style={{
				display: "block",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				backdropFilter: "blur(1px)",
			}}
		>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">
							Luz de emergencia
						</h1>
						<button
							type="button"
							onClick={closeModal}
							className="btn-close"
						></button>
					</div>
					<div className="modal-body">
						<div className="card">
							<div className="card-body">
								<form>
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
											/>
										</div>
									</div>

									<div className="d-flex justify-content-center gap-10 modal-footer">
										<button
											type="button"
											onClick={() => putEmployee(idEmployee)}
											className="btn btn-primary"
										>
											Editar
										</button>
										<button
											type="button"
											onClick={() => deleteEmployee(idEmployee)}
											className="btn btn-danger"
										>
											Eliminar
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
