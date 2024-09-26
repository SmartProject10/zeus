import { useId } from 'react'

import { Content } from '@zeus/_zeus/layout/components/content'
import { z } from 'zod'
import { Modal } from './modal'
// import { Table } from '../table'

export const DatabasePage = (): JSX.Element => {
	const modalId = useId()
	// const [items, setItems] = useState([])

	const handleSuccess = () => {}

	const handleError = () => {}

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
					{/* <Table items={items} /> */}
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
