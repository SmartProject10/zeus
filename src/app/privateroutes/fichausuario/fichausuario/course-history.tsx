import { useState, ChangeEvent } from "react";
import { Modal, Input, Button } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";

function Pagination() {
	return (
		<ul className="pagination">
			<li className="page-item previous disabled">
				<a href="#" className="page-link">
					<i className="previous"></i>
				</a>
			</li>

			<li className="page-item ">
				<a href="#" className="page-link">
					1
				</a>
			</li>
			<li className="page-item active">
				<a href="#" className="page-link">
					2
				</a>
			</li>
			<li className="page-item ">
				<a href="#" className="page-link">
					3
				</a>
			</li>
			<li className="page-item ">
				<a href="#" className="page-link">
					4
				</a>
			</li>
			<li className="page-item next">
				<a href="#" className="page-link">
					<i className="next"></i>
				</a>
			</li>
		</ul>
	);
}

function CourseHistoryTable({
	data,
	onEdit,
	onDelete,
	selectedRows,
	onRowSelect,
}: any) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = data.filter((item: any) =>
		Object.values(item)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	return (
		<div className="table-response my-16">
			<div
				style={{
					marginBottom: "16px",
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<Input
					placeholder="Buscar..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ width: "300px" }}
				/>
			</div>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>
							<input
								type="checkbox"
								checked={selectedRows.length === filteredData.length}
								onChange={(e) => {
									if (e.target.checked) {
										onRowSelect(filteredData.map((item: any) => item.id));
									} else {
										onRowSelect([]);
									}
								}}
							/>
						</th>
						<th>Curso</th>
						<th>Programa</th>
						<th>Duración</th>
						<th>Estado</th>
						<th>Asistencia</th>
						<th>Nota</th>
						<th>Certificado</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((item: any) => {
						return (
							<tr key={item.id}>
								<td>
									<input
										type="checkbox"
										checked={selectedRows.includes(item.id)}
										onChange={() => onRowSelect(item.id)}
									/>
								</td>
								<td>{item.course}</td>
								<td>{item.program}</td>
								<td>{item.duration}</td>
								<td>{item.status}</td>
								<td>{item.assistance}</td>
								<td>{item.note}</td>
								<td>{item.certificate}</td>
								<td>
									<Button
										type="default"
										style={{ marginRight: 8 }}
										onClick={(e) => {
											e.stopPropagation();
											onEdit(item);
										}}
									>
										<KTIcon iconName="file" iconType="duotone" />
									</Button>
									<Button
										type="default"
										onClick={(e) => {
											e.stopPropagation();
											onDelete(item.id);
										}}
									>
										<KTIcon iconName="trash" iconType="duotone" />
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
export function CourseHistory() {
	const [data, setData] = useState([
		{
			id: 1,
			course: "Curso de Ingeniería Informática",
			program: "Programa de Ingeniería Informática",
			duration: "2 años",
			status: "Completado",
			assistance: "Asistencia",
			note: "4.0",
			certificate: "",
		},
	]);

	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const handleRowSelect = (idOrIds: number | number[]) => {
		if (Array.isArray(idOrIds)) {
			setSelectedRows(idOrIds);
		} else {
			setSelectedRows((prevSelected) =>
				prevSelected.includes(idOrIds)
					? prevSelected.filter((rowId) => rowId !== idOrIds)
					: [...prevSelected, idOrIds]
			);
		}
	};

	const handleFileUpload = (id: number, file: File) => {
		const fileURL = URL.createObjectURL(file);
		setData((prevData) =>
			prevData.map((item) =>
				item.id === id ? { ...item, certificate: fileURL } : item
			)
		);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<any>(null);
	const [formData, setFormData] = useState<any>({
		course: "",
		program: "",
		duration: "",
		status: "",
		assistance: "",
		note: "",
		certificate: "",
	});
	const [errors, setErrors] = useState<any>({});

	const validateForm = (formData: any) => {
		const newErrors: any = {};
		if (!formData.course) newErrors.course = "Curso es obligatorio";
		if (!formData.program) newErrors.program = "Programa es obligatorio";
		if (!formData.duration) newErrors.duration = "Duración es obligatoria";
		if (!formData.status) newErrors.status = "Estado es obligatorio";
		return newErrors;
	};

	const handleAdd = () => {
		setEditingItem(null);
		setFormData({
			course: "",
			program: "",
			duration: "",
			status: "",
			assistance: "",
			note: "",
			certificate: "",
		});
		setErrors({});
		setIsModalOpen(true);
	};

	const handleEdit = (item: any) => {
		setEditingItem(item);
		setFormData(item);
		setErrors({});
		setIsModalOpen(true);
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
	};

	const handleSave = () => {
		const validationErrors = validateForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		if (editingItem) {
			setData(
				data.map((d) => (d.id === editingItem.id ? { ...d, ...formData } : d))
			);
		} else {
			setData([
				...data,
				{ ...formData, id: data.length ? data[data.length - 1].id + 1 : 1 },
			]);
		}
		setIsModalOpen(false);
	};

	return (
		<div className="card">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">Historial</h5>
				<button className="btn btn-primary btn-sm" onClick={handleAdd}>
					<KTIcon iconName="add-item" iconType="duotone" />
					Agregar
				</button>
			</div>
			<div className="card-body">
				<div className="card-content">
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
						ea quis eum voluptatibus, quisquam dolor perferendis recusandae
						laudantium aliquid temporibus impedit placeat dolorum, fugit illum
						quidem maiores, sint blanditiis unde.
					</p>
				</div>
				<CourseHistoryTable
					data={data}
					onEdit={handleEdit}
					onDelete={handleDelete}
					selectedRows={selectedRows}
					onRowSelect={handleRowSelect}
				/>
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination />
				</div>
			</div>

			<Modal
				title={editingItem ? "Editar registro" : "Agregar registro"}
				open={isModalOpen}
				onCancel={() => {
					setIsModalOpen(false);
					setEditingItem(null);
					setErrors({});
				}}
				footer={null}
				width={500}
				bodyStyle={{ padding: "24px 40px" }}
			>
				<form
					id="contact-details-form"
					onSubmit={(e) => {
						e.preventDefault();
						handleSave();
					}}
					className="form-content"
					style={{
						display: "grid",
						gap: "24px",
					}}
				>
					{[
						{ label: "Curso", id: "course", name: "course", type: "text" },
						{ label: "Programa", id: "program", name: "program", type: "text" },
						{
							label: "Duración",
							id: "duration",
							name: "duration",
							type: "text",
						},
						{ label: "Estado", id: "status", name: "status", type: "text" },
						{
							label: "Asistencia",
							id: "assistance",
							name: "assistance",
							type: "text",
						},
						{ label: "Nota", id: "note", name: "note", type: "text" },
						{
							label: "Certificado",
							id: "certificate",
							name: "certificate",
							type: "file",
						},
					].map(({ label, id, name, type }) => (
						<div className="form-group" key={id}>
							<label htmlFor={id} className="required form-label">
								{label}
							</label>
							{type === "file" ? (
								<div>
									<label className="btn btn-primary btn-sm">
										<KTIcon iconName="add-item" iconType="duotone" />
										Subir
										<input
											id={id}
											name={name}
											type="file"
											style={{ display: "none" }}
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) {
													const fileURL = URL.createObjectURL(file);
													setFormData({
														...formData,
														[name]: fileURL,
													});
												}
											}}
										/>
									</label>
									{formData[name] && (
										<div style={{ marginTop: "8px" }}>
											<a
												href={formData[name]}
												target="_blank"
												rel="noopener noreferrer"
												style={{ color: "#1890ff" }}
											>
												Ver archivo cargado
											</a>
										</div>
									)}
								</div>
							) : (
								<Input
									id={id}
									name={name}
									type={type}
									value={formData[name] || ""}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setFormData({ ...formData, [name]: e.target.value })
									}
									className="form-control"
									style={{ width: "100%" }}
								/>
							)}
							{errors[id] && (
								<span style={{ color: "red", fontSize: "12px" }}>
									{errors[id]}
								</span>
							)}
						</div>
					))}

					<div
						className="modal-footer"
						style={{
							gridColumn: "1 / -1",
							marginTop: "14px",
						}}
					>
						<Button
							type="default"
							onClick={() => {
								setIsModalOpen(false);
								setEditingItem(null);
								setErrors({});
							}}
							style={{ marginRight: "16px" }}
						>
							Cerrar
						</Button>
						<Button htmlType="submit" type="primary">
							{editingItem ? "Guardar cambios" : "Agregar"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
