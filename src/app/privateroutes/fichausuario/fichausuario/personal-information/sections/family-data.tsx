import { useState } from "react";
import { Select, Modal, Input, Button, Table } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";

function FamilyDataTable({ data, onEdit, onDelete, rowSelection }: any) {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter((item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "Nombre completo",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Parentezco",
            dataIndex: "relationship",
            key: "relationship",
        },
        {
            title: "Fecha de nacimiento",
            dataIndex: "birthdate",
            key: "birthdate",
        },
        {
            title: "Sexo",
            dataIndex: "sex",
            key: "sex",
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

    return (
        <div>
            <div
                style={{
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Input
                    placeholder="Buscar por nombre"
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: "300px" }}
                />
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
            />
        </div>
    );
}

export function FamilyDataSection() {
    const [data, setData] = useState([
        {
            id: 1,
            name: "Nombre completo",
            relationship: "Padre",
            birthdate: "19/09/1990",
            sex: "Masculino",
        },
    ]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[]) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

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
        <div className="card mb-8" id="family-data">
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">
                    Datos familiares
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
                    <FamilyDataTable
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        rowSelection={rowSelection}
                    />

                    <div className="d-flex justify-content-end mt-16">
                        <div className="flex-1"></div>
                        {/* Add Pagination component or import it */}
                        {/* <Pagination /> */}
                    </div>
                </div>
            </div>

            <Modal
                title={editingItem ? "Editar registro" : "Agregar registro"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={500}
                styles={{ body: { padding: "24px 40px" } }}
            >
                <form
                    id="family-data-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newItem = {
                            id: editingItem?.id || null,
                            name: formData.get("name"),
                            relationship: formData.get("relationship"),
                            birthdate: formData.get("birthdate"),
                            sex: formData.get("sex") || "",
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
                            label: "Nombre completo",
                            id: "name",
                            name: "name",
                            type: "text",
                            defaultValue: editingItem?.name || "",
                        },
                        {
                            label: "Parentezco",
                            id: "relationship",
                            name: "relationship",
                            type: "text",
                            defaultValue: editingItem?.relationship || "",
                        },
                        {
                            label: "Fecha de nacimiento",
                            id: "birthdate",
                            name: "birthdate",
                            type: "date",
                            defaultValue: editingItem?.birthdate || "",
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

                    <div className="form-group">
                        <label htmlFor="sex" className="required form-label">
                            Sexo
                        </label>
                        <Select
                            id="sex"
                            defaultValue={editingItem?.sex || ""}
                            style={{ width: "100%" }}
                            dropdownStyle={{ zIndex: 1050 }}
                        >
                            <Select.Option value="">Seleccione</Select.Option>
                            <Select.Option value="Masculino">Masculino</Select.Option>
                            <Select.Option value="Femenino">Femenino</Select.Option>
                        </Select>
                    </div>

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

export default FamilyDataSection;
