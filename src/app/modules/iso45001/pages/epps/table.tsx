import { PersonalProtectiveEquipment } from './types'

interface TableProps {
	items: PersonalProtectiveEquipment[]
}

		// brand: 'Nike',
		// size: 'Talla',
		// gender: 'Masculino',
		// dateOfEntry: '2022-01-01',
		// dateOfExit: '2022-01-01',
		// areaOfStorage: 'Sede',
		// storageSite: 'Proveedor',
		// unitaryCost: '100',
const tableHeaders = [
	'#',
	'Marca',
	'Talla',
	'Genero',
	'Fecha de entrada',
	'Fecha de salida',
	'Area de almacenamiento',
	'Sitio de almacenamiento',
	'Costo unitario',
]

const TableItems = ({
	items,
}: {
	items: PersonalProtectiveEquipment[]
}): JSX.Element | JSX.Element[] => {
	if (items.length <= 0) {
		return (
			<tr>
				<td colSpan={tableHeaders.length}>No se encontraron EPPS</td>
			</tr>
		)
	}

	return items.map((item, index) => (
		<tr key={index}>
			<td>{index}</td>
			<td>{item.brand}</td>
			<td>{item.size}</td>
			<td>{item.gender}</td>
			<td>{item.dateOfEntry}</td>
			<td>{item.dateOfExit}</td>
			<td>{item.areaOfStorage}</td>
			<td>{item.storageSite}</td>
			<td>{item.unitaryCost}</td>
		</tr>
	))
}

export const Table = ({
	items,
}: TableProps): JSX.Element => {
	return (
		<div className="table-responsive">
			<table 
				className="table table-striped gy-7 gs-7"
			>
				<thead>
					<tr>
						{tableHeaders.map((header, index) => (
							<th 
								key={index} 
								className="min-w-200px text-left fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<TableItems items={items} />
				</tbody>
			</table>
		</div>
	)
}
