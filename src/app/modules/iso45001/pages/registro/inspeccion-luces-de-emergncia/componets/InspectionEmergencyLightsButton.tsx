import { useState } from "react";
import Swal from "sweetalert2";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { ModalInspectionEmergencyLightsForm } from './ModalInspectionEmergencyLightsForm';
import { EmergencyLightsForm } from "../core/_models";

interface InspectionEmergencyLightsButtonProps {
	onSubmit: (newData: any, mode: 'create' | 'edit') => void;
}

export const InspectionEmergencyLightsButton: React.FC<InspectionEmergencyLightsButtonProps> = ({ onSubmit }) => {
	const [form, setForm] = useState<EmergencyLightsForm>(
		{
			id: "",
			fechaInspeccion: "",
			inspeccionadoPor: "",
			cargo: "",
			trabajador: "",
			sede: "",
			luzEmergencia: "",
			//Enumerado
			enumerado: false,
			areaEnumerado: "",
			fechaVencimientoEnumerado: "",
			observacionEnumerado: "",
			recomendacionEnumerado: "",
			//UbicacionAdecuada
			ubicacionAdecuada: false,
			areaUbicacionAdecuada: "",
			fechaVencimientoUbicacionAdecuada: "",
			observacionUbicacionAdecuada: "",
			recomendacionUbicacionAdecuada: "",
			//EnSuLugar
			enSuLugar: false,
			areaEnSuLugar: "",
			fechaVencimientoEnSuLugar: "",
			observacionEnSuLugar: "",
			recomendacionEnSuLugar: "",
			//LibreDeObstaculos
			libreDeObstaculos: false,
			areaLibreDeObstaculos: "",
			fechaVencimientoLibreDeObstaculos: "",
			observacionLibreDeObstaculos: "",
			recomendacionLibreDeObstaculos: "",
			//ConectadoTomacorriente
			conectadoTomacorriente: false,
			areaConectadoTomacorriente: "",
			fechaVencimientoConectadoTomacorriente: "",
			observacionConectadoTomacorriente: "",
			recomendacionConectadoTomacorriente: "",
			//EnciendeSwitchPrueba
			enciendeSwitchPrueba: false,
			areaEnciendeSwitchPrueba: "",
			fechaVencimientoEnciendeSwitchPrueba: "",
			observacionEnciendeSwitchPrueba: "",
			recomendacionEnciendeSwitchPrueba: "",
			//BuenaIluminacion
			buenaIluminacion: false,
			areaBuenaIluminacion: "",
			fechaVencimientoBuenaIluminacion: "",
			observacionBuenaIluminacion: "",
			recomendacionBuenaIluminacion: "",
			//BuenaEstado
			buenaEstado: false,
			areaBuenaEstado: "",
			fechaVencimientoBuenaEstado: "",
			observacionBuenaEstado: "",
			recomendacionBuenaEstado: "",
			//EncendidoQuinceMin
			encendidoQuinceMin: false,
			areaEncendidoQuinceMin: "",
			fechaVencimientoEncendidoQuinceMin: "",
			observacionEncendidoQuinceMin: "",
			recomendacionEncendidoQuinceMin: "",

			observacion: "",
			recomendacion: "",
			foto: "",
			nuevoEquipo: false,
			PDF: "",
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

	const handleSubmit = async (event: any) => {
		event.preventDefault();
	};

	// Manejo del envío de datos desde el modal
	const handleModalSubmit = (newData: EmergencyLightsForm) => {
		console.log("handleModalSubmit - Datos recibidos del modal:", newData, "Modo:", mode);
		// Manejo la lista de datos
		if (mode === "create" || mode === "edit") {
			onSubmit(newData, mode); // Pasar solo 'create' o 'edit'
		}
		console.log("Datos recibidos del modal:", newData);
		setShowModal(false);
	};

	// Función para manejar la acción seleccionada
	const handleActionClick = (action: "create" | "edit" | "view", data: any) => {
		setMode(action);
		setForm(data); // Pasar los datos si es necesario para editar o ver
		setShowModal(true); // Mostrar el modal
	};
	console.log("Datos recibidos del modal:", form);

	return (
		<KTCardBody>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<button
					className="btn btn-primary btn-sm"
					type="button"
					onClick={() => handleActionClick('create', {})}
				>
					<i className="bi bi-plus-circle-fill"></i>
					Nueva inspección
				</button>
			</div>

			{/* Modal */}
			{showModal && (
				<ModalInspectionEmergencyLightsForm
					idEmployee={''}
					children={null}
					onClose={() => setShowModal(false)}
					onSubmit={handleModalSubmit}
					mode={mode} // Pasar el mode al modal
					formData={form} // Pasar los datos al modal
				/>
			)}
		</KTCardBody>
	);
};
