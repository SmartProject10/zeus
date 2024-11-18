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
import { validateForm } from "../core/_models";
import { accionValidacionGuardar } from "@zeus/app/utils/mensajesPredeterminados";
import { ModalEmergencyLightsForm } from "./ModalEmergencyLightsForm";
// import { EmployeeRequest } from "../../core/_models";
// import { registerEmployee } from "../../core/_requests";

interface EmergencyLightsButtonProps {
	onSubmit: (newData: any, mode: 'create' | 'edit') => void;
}

export interface EmergencyLightsForm {
	id?: string;
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

export const EmergencyLightsButton: React.FC<EmergencyLightsButtonProps> = ({ onSubmit }) => {
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
	const [mode, setMode] = useState<"create" | "edit" | "view">("create");
	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	// Manejo del envío de datos desde el modal
	const handleModalSubmit = (newData: EmergencyLightsForm) => {
		console.log("handleModalSubmit - Datos recibidos del modal:", newData, "Modo:", mode);
		// Manejo la lista de datos
		if (mode === "create" || mode === "edit") {
			onSubmit(newData, mode);
		}
		console.log("Datos recibidos del modal:", newData);
		setShowModal(false);
	};

	const handleActionClick = (action: "create" | "edit" | "view", data: any) => {
		setMode(action);
		setForm(data);
		setShowModal(true);
	};

	return (
		<KTCardBody>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<button
					className="btn btn-primary btn-sm"
					type="button"
					onClick={() => handleActionClick('create', {})}
				>
					<i className="bi bi-plus-circle-fill"></i>
					Nueva Luz de emergencia
				</button>
			</div>

			{/* Modal */}
			{showModal && (
				<ModalEmergencyLightsForm
					idEmployee={''}
					children={null}
					onClose={() => setShowModal(false)}
					onSubmit={handleModalSubmit}
					mode={mode} // Pasar el mode al modal
					formData={form} // Pasar los datos al modal
				></ModalEmergencyLightsForm>
			)}

		</KTCardBody>
	);
};
