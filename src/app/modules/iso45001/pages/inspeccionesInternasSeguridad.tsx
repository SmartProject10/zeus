import { useState } from 'react'
import { TitleBar } from '@zeus/@components/titleBar'
import { useNavigate } from 'react-router-dom'

export function InspeccionesInternasSeguridad(): JSX.Element {
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()

	const items = [
		{ label: 'Inspección de superficie y subterráneo', path: '/inspeccion-superficie' },
		{ label: 'Inspección de talleres', path: '/inspeccion-talleres' },
		{ label: 'Inspección de campamentos', path: '/inspeccion-campamentos' },
		{ label: 'Inspección de polvorín y explosivos', path: '/inspeccion-polvorin' },
		{ label: 'Inspección de almacenes', path: '/inspeccion-almacenes' },
		{ label: 'Inspección de oficinas', path: '/inspeccion-oficinas' },
		{ label: 'Inspección general de vehículos y equipos', path: '/inspeccion-vehiculos' },
		{ label: 'Inspección de grúas', path: '/inspeccion-gruas' },
		{ label: 'Inspección cisterna de combustible', path: '/inspeccion-cisterna' },
		{ label: 'Inspección de grupo electrógeno/generador eléctrico', path: '/inspeccion-generador' },
		{ label: 'Inspección de luminarias y torre de iluminación', path: '/inspeccion-luminarias' },
		{ label: 'Inspección luces de emergencia', path: '/iso45001/inspeccion-luces-de-emergencia' },
		{ label: 'Inspección de tableros eléctricos e instalaciones eléctricas', path: '/inspeccion-tableros' },
		{ label: 'Inspección de herramientas manuales y eléctricas', path: '/inspeccion-herramientas' },
		{ label: 'Inspección de escaleras portátiles', path: '/inspeccion-escaleras' },
		{ label: 'Inspección bombas sumergibles', path: '/inspeccion-bombas' },
		{ label: 'Inspección de andamios', path: '/inspeccion-andamios' },
		{ label: 'Inspecciones de EPPS', path: '/inspeccion-epps' },
		{ label: 'Inspecciones de arneses y líneas de vida', path: '/inspeccion-arneses' },
		{ label: 'Inspección de sistema de izaje/dispositivo de izaje/cables de izaje', path: '/inspeccion-izaje' },
		{ label: 'Inspección de extintores', path: '/iso45001/inspeccion-extintores' },
		{ label: 'Inspección de sistemas de protección contra incendios', path: '/inspeccion-incendios' },
		{ label: 'Monitoreo de velocidad de vehículos', path: '/monitoreo-velocidad' },
		{ label: 'Monitoreo de control de iluminación', path: '/monitoreo-iluminacion' },
		{
			label: 'Monitoreo de control de gases de vehículos y equipos que ingresan a labores subterráneas',
			path: '/monitoreo-gases',
		},
		{ label: 'Monitoreo de velocidad de viento en labores subterráneas', path: '/monitoreo-viento' },
	]

	const filteredItems = items.filter(item =>
		item.label.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	return (
		<div className="p-4">
			<TitleBar label="Inspecciones internas de seguridad" />
			<input
				type="text"
				placeholder="Filtrar..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mt-4 mb-4 p-3 border border-gray-300 rounded-lg w-full text-lg rounded"
				style={{ width: '600px' }}
			/>
			<div className="list-none p-0">
				{filteredItems.map((item, index) => (
					<div key={index} className="py-2">
						<div className="flex items-center">
							<button
								onClick={() => navigate(item.path)}
								className="block p-2 hover:bg-blue-200 rounded-lg transition duration-300 flex-1"
								style={{
									color: 'black', fontSize: '16px', fontWeight: '400',
									border: 'none', background: 'none',
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
	)
}
