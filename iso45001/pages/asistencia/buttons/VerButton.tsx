import React from 'react'

interface VerButtonProps {
	item: any // any por ahora 
	onClick: (item: any) => void // por ahora
}

const VerButton: React.FC<VerButtonProps> = ({ item, onClick }) => {
	return (
		<button
			className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary me-2"
			onClick={() => onClick(item)}
			title="Ver">
			<i className="fas fa-eye fs-4"></i>
		</button>
	)
}

export default VerButton
