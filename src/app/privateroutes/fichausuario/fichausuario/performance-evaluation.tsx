import { useState, ChangeEvent } from "react";
import { Modal, Input, Button } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";

function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	return (
		<ul className="pagination">
			<li
				className={`page-item previous ${currentPage === 1 ? "disabled" : ""}`}
			>
				<a
					href="#"
					className="page-link"
					onClick={() => onPageChange(currentPage - 1)}
				>
					<i className="previous"></i>
				</a>
			</li>
			{Array.from({ length: totalPages }, (_, index) => (
				<li
					key={index}
					className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
				>
					<a
						href="#"
						className="page-link"
						onClick={() => onPageChange(index + 1)}
					>
						{index + 1}
					</a>
				</li>
			))}
			<li
				className={`page-item next ${
					currentPage === totalPages ? "disabled" : ""
				}`}
			>
				<a
					href="#"
					className="page-link"
					onClick={() => onPageChange(currentPage + 1)}
				>
					<i className="next"></i>
				</a>
			</li>
		</ul>
	);
}
function PerformanceEvaluationTable({
	data,
	onEdit,
	onDelete,
	selectedRows,
	onRowSelect,
}: any) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = data.filter((item: any) =>
		Object.values(item).some((value) =>
			String(value).toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<div className="table-response my-16">
			<div className="d-flex justify-content-end mb-4">
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
						<th>Periodo</th>
						<th>Proceso</th>
						<th>Resultado final</th>
						<th>Reporte</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((item: any) => (
						<tr key={item.id}>
							<td>
								<input
									type="checkbox"
									checked={selectedRows.includes(item.id)}
									onChange={() => onRowSelect(item.id)}
								/>
							</td>
							<td>{item.period}</td>
							<td>{item.process}</td>
							<td
								style={{
									color:
										item.result.toLowerCase() === "aprobado"
											? "green"
											: "inherit",
								}}
							>
								{item.result}
							</td>
							<td>
								<Button
									type="link"
									onClick={() => {
										const link = document.createElement("a");
										link.href = item.report;
										link.download = `Reporte_${item.period}.pdf`;
										link.click();
									}}
								>
									Descargar
								</Button>
							</td>
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
					))}
				</tbody>
			</table>
		</div>
	);
}

export function PerformanceEvaluation() {
	const [data, setData] = useState([
		{
			id: 1,
			period: "2022",
			process: "Proceso de evaluación de desempeño",
			result: "Aprobado",
			report: "Reporte de evaluación de desempeño",
		},
	]);
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<any>(null);
	const [formData, setFormData] = useState<any>({
		period: "",
		process: "",
		result: "",
		report: "",
	});
	const [errors, setErrors] = useState<any>({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

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

	const validateForm = (formData: any) => {
		const newErrors: any = {};
		if (!formData.period) newErrors.period = "Periodo es obligatorio";
		if (!formData.process) newErrors.process = "Proceso es obligatorio";
		if (!formData.result) newErrors.result = "Resultado es obligatorio";
		return newErrors;
	};

	const handleAdd = () => {
		setEditingItem(null);
		setFormData({
			period: "",
			process: "",
			result: "",
			report: "",
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

	const filteredData = data;
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

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
				<PerformanceEvaluationTable
					data={paginatedData}
					onEdit={handleEdit}
					onDelete={handleDelete}
					selectedRows={selectedRows}
					onRowSelect={handleRowSelect}
				/>
				<div className="d-flex justify-content-end mt-16">
					<div className="flex-1"></div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
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
						{ label: "Periodo", id: "period", name: "period", type: "text" },
						{ label: "Proceso", id: "process", name: "process", type: "text" },
						{ label: "Resultado", id: "result", name: "result", type: "text" },
						{ label: "Reporte", id: "report", name: "report", type: "file" },
					].map(({ label, id, name, type }) => (
						<div className="form-group" key={id}>
							<label htmlFor={id} className="required form-label">
								{label}
							</label>
							{type === "file" ? (
								<Input
									id={id}
									name={name}
									type={type}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										if (e.target.files && e.target.files[0]) {
											setFormData({ ...formData, [name]: e.target.files[0] });
										}
									}}
									className="form-control"
									style={{ width: "100%" }}
								/>
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
