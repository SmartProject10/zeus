import { useState } from "react";
import Swal from "sweetalert2";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import {
	EmergencyLightsRequest,
	EmployeeRequest,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_models";
import {
	registerEmergencyLight,
	registerEmployee,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_requests";
// import { EmployeeRequest } from "../../core/_models";
// import { registerEmployee } from "../../core/_requests";
import { ModalInspectionEmergencyLightsForm } from './ModalInspectionEmergencyLightsForm';

export interface EmergencyLightsForm {
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

export const InspectionEmergencyLightsButton = () => {
	const [form, setForm] = useState<EmergencyLightsForm>({
		numero: "",
		sede: "",
		area: "",
		ubicacionEspecifica: "",
		codigo: "",
		marca: "",
		fechaIngresoEmpresa: "",
	});

	const [showModal, setShowModal] = useState(false);

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
			const resp = await registerEmergencyLight(newEmployee);
			console.log(resp);
			if (resp.status == 201) {
				appStateService.setEmployeeSubject(resp.data);

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
					title: "Trabajador creado correctamente",
				});

				const closeButton = document.getElementById("closeButton");
				if (closeButton) {
					closeButton.click();
				}
			} else {
				console.log(resp);
			}
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	};

	return (
		<KTCardBody>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<button
					className="btn btn-primary btn-sm"
					type="button"
					onClick={() => setShowModal(true)}
				>
					<i className="bi bi-plus-circle-fill"></i>
					Nueva inspección
				</button>
			</div>

			{/* Modal */}
			{showModal && (
				<ModalInspectionEmergencyLightsForm
					idEmployee={form.numero}
					children={null}
					onClose={() => setShowModal(false)}
				/>
			)}
		</KTCardBody>
	);
};
