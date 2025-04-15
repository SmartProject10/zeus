import { useState } from "react";
import { Input, Button, Popconfirm } from "antd";

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

function InformativeDocumentsTable({
	data,
	selectedRows,
	onRowSelect,
	onDelete,
}: any) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = data.filter((item: any) =>
		Object.values(item).some((value) =>
			String(value).toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<div className="table-response my-4">
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
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Fecha</th>
						<th>Archivo</th>
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
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>{item.date}</td>
							<td>
								<Button
									type="link"
									onClick={() => {
										const link = document.createElement("a");
										link.href = item.file;
										link.download = item.name;
										link.click();
									}}
								>
									Descargar
								</Button>
							</td>
							<td>
								<Popconfirm
									title="¿Estás seguro de que deseas eliminar este documento?"
									onConfirm={() => onDelete(item.id)}
									okText="Sí"
									cancelText="No"
								>
									<Button type="link" danger>
										Eliminar
									</Button>
								</Popconfirm>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function InformativeDocuments() {
	const [data, setData] = useState([
		{
			id: 1,
			name: "Documento 1",
			description: "Descripción del documento 1",
			date: "2023-01-01",
			file: "/path/to/document1.pdf",
		},
	]);
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
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

	const handleDelete = (id: number) => {
		setData((prevData) => prevData.filter((item) => item.id !== id));
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
				<h5 className="card-title flex-1 align-items-center">
					Documentos Informativos
				</h5>
			</div>
			<div className="card-body">
				<InformativeDocumentsTable
					data={paginatedData}
					selectedRows={selectedRows}
					onRowSelect={handleRowSelect}
					onDelete={handleDelete}
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
		</div>
	);
}
