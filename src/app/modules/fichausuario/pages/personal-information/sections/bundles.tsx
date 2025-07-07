import { useState } from "react";
import { KTIcon } from "@zeus/_zeus/helpers";

export function BundleSection() {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setUploadedFile(file);
		}
	};

	const handleViewFile = () => {
		if (uploadedFile) {
			const fileURL = URL.createObjectURL(uploadedFile);
			window.open(fileURL, "_blank");
		}
	};

	return (
		<div className="card" id="bundles">
			<div className="card-header">
				<h5 className="card-title">Legajos</h5>
			</div>
			<div className="card-body">
				<div className="card-content">
					<div className="d-flex align-items-center">
						<div
							style={{
								flex: 1,
								marginRight: "2rem",
							}}
						>
							<div>
								<strong>Curriculum vitae</strong>{" "}
								<span className="text-muted">
									Formato PDF o JPG tamaño máximo de 5MB
								</span>
							</div>
							<div className="mt-2">
								{uploadedFile ? (
									<div>
										<span className="text-success">
											Archivo subido: {uploadedFile.name}
										</span>
										<button
											className="btn btn-link btn-sm"
											onClick={handleViewFile}
											style={{ marginLeft: "1rem" }}
										>
											Ver archivo
										</button>
									</div>
								) : (
									<span className="text-muted">Archivo no adjuntado</span>
								)}
							</div>
						</div>
						<div>
							<label className="btn btn-primary btn-sm">
								<KTIcon iconName="add-item" iconType="duotone" />
								Subir
								<input
									type="file"
									style={{ display: "none" }}
									onChange={handleFileChange}
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
