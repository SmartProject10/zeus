import { useState } from "react";
import { TitleBar } from "@zeus/@components/titleBar";
import { useNavigate } from "react-router-dom";

export function RegistroBaseDeDatos(): JSX.Element {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const items = [
		{
			label: "Registro de luces de emergencia",
			path: "/registro-luces-emergencia",
		},
		{
			label: "Registro de kit anti-derrame",
			path: "/iso45001/kit",
		},
		{
			label: "Registro de botiquín",
			path: "/iso45001/botiquin",
		},
		{
			label: "Exámenes médicos ocupacionales",
			path: "/examenes-medicos",
		},
		{
			label: "Accidentes/Enfermedades de trabajo",
			path: "/iso45001/accidentes-enfermedades-trabajo",
		},
		{
			label: "Monitoreos ocupacionales",
			path: "/monitoreos-ocupacionales",
		},
		{
			label: "Registro de inducciones",
			path: "/registro-inducciones",
		},
		{
			label: "Registro de simulacros",
			path: "/registro-simulacros",
		},
		{
			label: "Auditorías",
			path: "/auditorias",
		},
		{
			label: "Compromisos de alta gerencia",
			path: "/iso45001/compromisos-alta-generencia",
		},
		{
			label: "Registro de capacitaciones",
			path: "/registro-capacitaciones",
		},
		{
			label: "Registro de superficie y subterráneo",
			path: "/registro-superficie",
		},
		{ label: "Registro de talleres", path: "/registro-talleres" },
		{ label: "Registro de campamentos", path: "/registro-campamentos" },
		{ label: "Registro de polvorín y explosivos", path: "/registro-polvorin" },
		{ label: "Registro de almacenes", path: "/registro-almacenes" },
		{ label: "Registro de oficinas", path: "/registro-oficinas" },
		{
			label: "Registro general de vehículos y equipos",
			path: "/registro-vehiculos",
		},
		{ label: "Registro de grúas", path: "/registro-gruas" },
		{ label: "Registro cisterna de combustible", path: "/registro-cisterna" },
		{
			label: "Registro de grupo electrógeno/generador eléctrico",
			path: "/registro-generador",
		},
		{
			label: "Registro de luminarias y torre de iluminación",
			path: "/registro-luminarias",
		},
		{
			label: "Registro de tableros eléctricos e instalaciones eléctricas",
			path: "/registro-tableros",
		},
		{
			label: "Registro de herramientas manuales y eléctricas",
			path: "/registro-herramientas",
		},
		{ label: "Registro de escaleras portátiles", path: "/registro-escaleras" },
		{ label: "Registro bombas sumergibles", path: "/registro-bombas" },
		{ label: "Registro de andamios", path: "/registro-andamios" },
		{ label: "Registros de EPPS", path: "/registro-epps" },
		{
			label: "Registros de arneses y líneas de vida",
			path: "/registro-arneses",
		},
		{
			label:
				"Registro de sistema de izaje/dispositivo de izaje/cables de izaje",
			path: "/registro-izaje",
		},
		{ label: "Registro de extintores", path: "/iso45001/registro-extintores" },
		{
			label: "Registro de sistemas de protección contra incendios",
			path: "/registro-incendios",
		},
		{
			label: "Monitoreo de velocidad de vehículos",
			path: "/monitoreo-velocidad",
		},
		{
			label: "Monitoreo de control de iluminación",
			path: "/monitoreo-iluminacion",
		},
		{
			label:
				"Monitoreo de control de gases de vehículos y equipos que ingresan a labores subterráneas",
			path: "/monitoreo-gases",
		},
		{
			label: "Monitoreo de velocidad de viento en labores subterráneas",
			path: "/monitoreo-viento",
		},
	];

	const filteredItems = items.filter((item) =>
		item.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="p-4">
			<TitleBar label="Registros internos de seguridad" />
			<input
				type="text"
				placeholder="Filtrar..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mt-4 mb-4 p-3 border border-gray-300 rounded-lg w-full text-lg rounded"
				style={{ width: "600px" }}
			/>
			<div className="list-none p-0">
				{filteredItems.map((item, index) => (
					<div key={index} className="py-2">
						<div className="flex items-center">
							<button
								onClick={() => navigate(item.path)}
								className="block p-2 hover:bg-blue-200 rounded-lg transition duration-300 flex-1"
								style={{
									color: "black",
									fontSize: "16px",
									fontWeight: "400",
									border: "none",
									background: "none",
								}}
							>
								{item.label}
							</button>
							<div className="border-l border-gray-300 h-6 mx-2"></div>
						</div>
					</div>
				))}
				{filteredItems.length === 0 && (
					<div className="py-2">
						<p>No se encontraron resultados.</p>
					</div>
				)}
			</div>
		</div>
	);
}
