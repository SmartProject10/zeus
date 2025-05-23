import { useId } from 'react'

import { Content } from '@zeus/app/_zeus/layout/components/content'
import { Modal } from './modal'

export const DatabasePage = (): JSX.Element => {
	const modalId = useId()

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
