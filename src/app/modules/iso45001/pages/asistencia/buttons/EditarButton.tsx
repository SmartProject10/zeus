import React from 'react'

interface EditarButtonProps {
	item: any // any por ahora
	onClick: (item: any) => void // por ahora
}

const EditarButton: React.FC<EditarButtonProps> = ({ item, onClick }) => {
	return (
		<button
			className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
			type="button"
			data-bs-toggle="modal"
			data-bs-target="#staticBackdrop"
			onClick={() => onClick(item)}
			title="Editar">
			<i className="fas fa-edit fs-4"></i>
		</button>
	)
}

export default EditarButton
