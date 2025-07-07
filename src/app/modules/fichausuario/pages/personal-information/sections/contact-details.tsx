import { useState } from "react";
import { Modal, Input, Button, Table } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";

function ContactDetailsTable({
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

	const filteredData = data.filter(
		(item: any) =>
			item.address.toLowerCase().includes(searchText) ||
			item.person.toLowerCase().includes(searchText) ||
			item.occupation.toLowerCase().includes(searchText) ||
			item.phone.toLowerCase().includes(searchText)
	);

	const columns = [
		{
			title: "Dirección actualizada",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Persona de contacto",
			dataIndex: "person",
			key: "person",
		},
		{
			title: "Ocupación",
			dataIndex: "occupation",
			key: "occupation",
		},
		{
			title: "Celular",
			dataIndex: "phone",
			key: "phone",
		},
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
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		},
	};

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Input
					placeholder="Buscar..."
					value={searchText}
					onChange={handleSearch}
					style={{ width: 300 }}
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

export function ContactDetailsSection() {
	const [data, setData] = useState([
		{
			id: 1,
			address: "Calle 123, 123 123, 123 123",
			person: "Persona de contacto",
			occupation: "Ocupación",
			phone: "+56 987654321",
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
		<div className="card mb-8" id="contact-details">
			<div className="card-header align-items-center">
				<h5 className="card-title flex-1 align-items-center">
					Datos de contacto
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
					<ContactDetailsTable
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
					id="contact-details-form"
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const newItem = {
							id: editingItem?.id || null,
							address: formData.get("address"),
							person: formData.get("person"),
							occupation: formData.get("occupation"),
							phone: formData.get("phone"),
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
							label: "Dirección actualizada",
							id: "address",
							name: "address",
							type: "text",
							defaultValue: editingItem?.address || "",
						},
						{
							label: "Persona de contacto",
							id: "person",
							name: "person",
							type: "text",
							defaultValue: editingItem?.person || "",
						},
						{
							label: "Ocupación",
							id: "occupation",
							name: "occupation",
							type: "text",
							defaultValue: editingItem?.occupation || "",
						},
						{
							label: "Celular",
							id: "phone",
							name: "phone",
							type: "text",
							defaultValue: editingItem?.phone || "",
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
