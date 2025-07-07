import React from "react";

function NewPasstButton() {
	return (
		<div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
			<button
				className="btn btn-primary btn-sm"
				type="button"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"
			>
				<i className="bi bi-plus-circle-fill"></i>
				Nuevo Objetivo General
			</button>
			<button
				className="btn btn-primary btn-sm"
				type="button"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop2"
			>
				<i className="bi bi-plus-circle-fill"></i>
				Nueva Sede
			</button>
		</div>
	);
}

export default NewPasstButton;
