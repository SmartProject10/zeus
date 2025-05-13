import { useState } from "react";
import { Modal, Input, Button, Table } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";

function AcademicDataTable({
	data,
	onEdit,
	onDelete,
	selectedRowKeys,
	setSelectedRowKeys,
}: any) {
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value.toLowerCase());
	};

	const filteredData = data.filter((item: any) =>
		Object.values(item).some((value) =>
			String(value).toLowerCase().includes(searchText)
		)
	);

	const columns = [
		{ title: "Instituto", dataIndex: "instute", key: "instute" },
		{ title: "Titulo", dataIndex: "title", key: "title" },
		{ title: "Nivel", dataIndex: "level", key: "level" },
		{ title: "Estado", dataIndex: "state", key: "state" },
		{ title: "Año de graduación", dataIndex: "year", key: "year" },
		{
			title: "Acciones",
			key: "actions",
			render: (_: any, item: any) => (
				<>
					<Button
						type="default"
						style={{ marginRight: 8, fontSize: "14px", padding: "6px 12px" }}
						onClick={() => onEdit(item)}
					>
						<KTIcon iconName="file" iconType="duotone" />
					</Button>
					<Button
						type="default"
						style={{ fontSize: "14px", padding: "6px 12px" }}
						onClick={() => onDelete(item.id)}
					>
						<KTIcon iconName="trash" iconType="duotone" />
					</Button>
				</>
			),
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
	};

	return (
		<div>
			<div style={{ marginBottom: "16px" }}>
				<Input
					placeholder="Buscar..."
					value={searchText}
					onChange={handleSearch}
					style={{ width: "300px" }}
				/>
			</div>
			<Table
				columns={columns}
				dataSource={filteredData}
				rowKey="id"
				rowSelection={rowSelection}
			/>
		</div>
	);
}

export function AcademicDataSection() {
	const [data, setData] = useState([
		{
			id: 1,
			instute: "Instituto",
			title: "Titulo",
			level: "Nivel",
			state: "Estado",
			year: "Año de graduación",
		},
	]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<any>(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const handleAdd = () => {
		setEditingItem(null);
		setIsModalOpen(true);
	};

	const handleEdit = (item: any) => {
		setEditingItem(item);
		setIsModalOpen(true);
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
	};

	const handleSave = (item: any) => {
		if (item.id) {
			// Edit existing item
			setData(data.map((d) => (d.id === item.id ? { ...d, ...item } : d)));
		} else {
			// Add new item
			setData([
				...data,
				{ ...item, id: data.length ? data[data.length - 1].id + 1 : 1 },
			]);
		}
		setIsModalOpen(false);
	};

	return (
		<div className="card mb-8" id="academic-data">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">
					Datos académicos
				</h5>
				<button
					className="btn btn-primary btn-sm"
					onClick={handleAdd}
					style={{
						padding: "8px 16px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<KTIcon iconName="add-item" iconType="duotone" />
					Agregar
				</button>
			</div>
			<div className="card-body">
				<div className="card-content">
					<AcademicDataTable
						data={data}
						onEdit={handleEdit}
						onDelete={handleDelete}
						selectedRowKeys={selectedRowKeys}
						setSelectedRowKeys={setSelectedRowKeys}
					/>
				</div>
			</div>

			<Modal
				title={editingItem ? "Editar registro" : "Agregar registro"}
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				width={500}
				bodyStyle={{ padding: "24px 40px" }}
			>
				<form
					id="academic-data-form"
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const newItem = {
							id: editingItem?.id || null,
							instute: formData.get("instute"),
							title: formData.get("title"),
							level: formData.get("level"),
							state: formData.get("state"),
							year: formData.get("year"),
						};
						handleSave(newItem);
						e.currentTarget.reset();
					}}
					style={{
						display: "grid",
						gap: "24px",
					}}
				>
					{[
						{
							label: "Instituto",
							id: "instute",
							name: "instute",
							type: "text",
							defaultValue: editingItem?.instute || "",
						},
						{
							label: "Titulo",
							id: "title",
							name: "title",
							type: "text",
							defaultValue: editingItem?.title || "",
						},
						{
							label: "Nivel",
							id: "level",
							name: "level",
							type: "text",
							defaultValue: editingItem?.level || "",
						},
						{
							label: "Estado",
							id: "state",
							name: "state",
							type: "text",
							defaultValue: editingItem?.state || "",
						},
						{
							label: "Año de graduación",
							id: "year",
							name: "year",
							type: "text",
							defaultValue: editingItem?.year || "",
						},
					].map(({ label, id, name, type, defaultValue }) => (
						<div className="form-group" key={id}>
							<label htmlFor={id} className="required form-label">
								{label}
							</label>
							<Input
								id={id}
								name={name}
								type={type}
								defaultValue={defaultValue}
								className="form-control"
								style={{ width: "100%" }}
							/>
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
							onClick={() => setIsModalOpen(false)}
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
