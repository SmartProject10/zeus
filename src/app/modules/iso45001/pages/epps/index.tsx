import { useEffect, useId, useState } from 'react'

import { Content } from '@zeus/_zeus/layout/components/content'
import { Modal } from './modal'
import { Table } from './table'
import { PersonalProtectiveEquipment } from './types'
import { getPPS } from './mock'

export const EPPS = (): JSX.Element => {
	const modalId = useId()
	const [items, setItems] = useState<PersonalProtectiveEquipment[]>([])

	useEffect(() => {
		getPPS().then(setItems)
	}, [])

	const handleSuccess = (data: PersonalProtectiveEquipment) => {
		setItems([...items, data])
	}

	const handleError = (error: Error) => {
		console.error(error)
	}

	return (
		<Content>
			<div className="d-flex justify-content-end mb-6">
				<button
					className="btn btn-primary btn-sm"
					type="button"
					data-bs-toggle="modal"
					data-bs-target={`#${modalId}`}
				>
					<i className="bi bi-plus-circle-fill"></i>
					Agregar nuevo EPP 
				</button>
			</div>

			<div className="card">
				<div className="card-header">
					<div className="card-toolbar">
						<h2 className="card-title">
							EPPs disponibles
						</h2>
					</div>
				</div>
				<div className="card-body">
					<Table items={items} />
					<Modal 
						id={modalId} 
						onSuccess={handleSuccess} 
						onError={handleError}
					/>
				</div>
			</div>
		</Content>
	)
}
