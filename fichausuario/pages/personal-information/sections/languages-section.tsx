import { useState } from "react";
import { Modal, Input, Button, Table } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";

function LanguageDataTable({
	data,
	onEdit,
	onDelete,
	selectedRowKeys,
	setSelectedRowKeys,
}: any) {
	const columns = [
		{ title: "Idioma", dataIndex: "language", key: "language" },
		{ title: "Nivel", dataIndex: "level", key: "level" },
		{ title: "Especificación / Detalle", dataIndex: "detail", key: "detail" },
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
		<Table
			columns={columns}
			dataSource={data}
			rowKey="id"
			rowSelection={rowSelection}
		/>
	);
}

export function LanguagesSection() {
	const [data, setData] = useState([
		{
			id: 1,
			language: "Español",
			level: "Nivel",
			detail: "Especificación / Detalle",
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
			setData(data.map((d) => (d.id === item.id ? { ...d, ...item } : d)));
		} else {
			setData([
				...data,
				{ ...item, id: data.length ? data[data.length - 1].id + 1 : 1 },
			]);
		}
		setIsModalOpen(false);
	};

	return (
		<div className="card mb-8" id="languages">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">Idiomas</h5>
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
					<LanguageDataTable
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
					id="language-data-form"
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const newItem = {
							id: editingItem?.id || null,
							language: formData.get("language"),
							level: formData.get("level"),
							detail: formData.get("detail"),
						};
						handleSave(newItem);
						e.currentTarget.reset();
					}}
					className="form-content"
					style={{
						display: "grid",
						gap: "24px",
					}}
				>
					{[
						{
							label: "Idioma",
							id: "language",
							name: "language",
							type: "text",
							defaultValue: editingItem?.language || "",
						},
						{
							label: "Nivel",
							id: "level",
							name: "level",
							type: "text",
							defaultValue: editingItem?.level || "",
						},
						{
							label: "Especificación / Detalle",
							id: "detail",
							name: "detail",
							type: "text",
							defaultValue: editingItem?.detail || "",
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
