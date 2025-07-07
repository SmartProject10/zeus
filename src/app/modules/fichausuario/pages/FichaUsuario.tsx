import { useState } from "react";
import { KTIcon } from "@zeus/_zeus/helpers";
import "./FichaUsuario.scss";

import { CourseHistory } from "./course-history";
import { PersonalInformation } from "./personal-information";
import { PerformanceEvaluation } from "./performance-evaluation";
import { InformativeDocuments } from "./informative-documents";

export function FichaUsuario() {
	const [showOptions, setShowOptions] = useState(false);

	const handleImageClick = () => {
		setShowOptions(!showOptions);
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = () => {
				console.log("Imagen cargada:", reader.result);
			};
			reader.readAsDataURL(file);
			console.log("Imagen subida:", file);
		} else {
			alert("Por favor, selecciona un archivo de imagen válido.");
		}
	};

	return (
		<div className="ficha-usuario w-100">
			<div className="d-flex flex-column align-items-center w-100 position-relative">
				<div className="position-relative">
					<img
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300&q=80"
						alt="User profile"
						className="rounded-circle border border-info border-4 shadow-lg"
						style={{
							objectFit: "cover",
							aspectRatio: "1/1",
							borderRadius: "50%",
							cursor: "pointer",
						}}
						onClick={handleImageClick}
					/>

					{showOptions && (
						<div
							className="image-options position-absolute"
							style={{
								top: "50%",
								left: "310px",
								transform: "translateY(-50%)",
							}}
						>
							<div className="d-flex flex-column bg-light p-3 border rounded shadow">
								<label className="btn btn-outline-info mb-2">
									Subir foto
									<input
										type="file"
										accept="image/*"
										style={{ display: "none" }}
										onChange={handleFileUpload}
									/>
								</label>
								<label className="btn btn-outline-info mb-2">
									Cambiar foto
									<input
										type="file"
										accept="image/*"
										style={{ display: "none" }}
										onChange={handleFileUpload}
									/>
								</label>
								<button
									className="btn btn-outline-danger"
									onClick={() => {
										console.log("Imagen eliminada");
									}}
								>
									Eliminar
								</button>
							</div>
						</div>
					)}
				</div>

				<p className="fw-bold fs-1 mt-5 mb-2">Jhunior Chavez Cruz</p>
				<p className="fw-bold fs-4 text-muted">
					Tecnologico medico de post procesamiento
				</p>

				{/*<button className="btn btn-outline btn-outline-info btn-active-light-info">
					<KTIcon iconName="add-item" iconType="duotone" />
					Organigrama
				</button>*/}
			</div>

			<ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
				<li className="nav-item">
					<a
						className="nav-link active btn-active-light-secondary"
						data-bs-toggle="tab"
						href="#kt_tab_pane_1"
					>
						Información laboral y personal
					</a>
				</li>

				<li className="nav-item">
					<a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_2">
						Historial de cursos
					</a>
				</li>

				<li className="nav-item">
					<a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_3">
						Historial de evaluación de desempeño
					</a>
				</li>

				<li className="nav-item">
					<a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_4">
						Documentos informativos
					</a>
				</li>
			</ul>

			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade active show"
					id="kt_tab_pane_1"
					role="tabpanel"
				>
					<PersonalInformation />
				</div>
				<div className="tab-pane fade" id="kt_tab_pane_2" role="tabpanel">
					<CourseHistory />
				</div>
				<div className="tab-pane fade" id="kt_tab_pane_3" role="tabpanel">
					<PerformanceEvaluation />
				</div>
				<div className="tab-pane fade" id="kt_tab_pane_4" role="tabpanel">
					<InformativeDocuments />
				</div>
			</div>
		</div>
	);
}
