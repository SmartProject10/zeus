import { useState, ChangeEvent } from "react";
import { Modal, Input, Button, Table } from "antd";
import { KTIcon } from "@zeus/_zeus/helpers";
import { useNavigate } from "react-router-dom";

function ExternalTrainingTable({
    data,
    onEdit,
    onDelete,
    selectedRowKeys,
    setSelectedRowKeys,
}: any) {
    const [searchText, setSearchText] = useState("");

    const filteredData = data.filter((item: any) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const columns = [
        { title: "Institución", dataIndex: "institute", key: "institute" },
        { title: "Concepto", dataIndex: "concept", key: "concept" },
        {
            title: "Certificado / Constancia",
            dataIndex: "certificate",
            key: "certificate",
            render: (certificate: string) =>
                certificate ? (
                    <a href={certificate} target="_blank" rel="noopener noreferrer">
                        Ver archivo
                    </a>
                ) : (
                    "Sin archivo"
                ),
        },
        { title: "Año de capacitación", dataIndex: "year", key: "year" },
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
            <div
                style={{
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Input
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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

export function ExternalTrainingSection() {
    const [data, setData] = useState([
        {
            id: 1,
            institute: "Instituto",
            concept: "Concepto",
            certificate: "Certificado",
            year: "Año de capacitación",
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [errors, setErrors] = useState<any>({});

    const validateForm = (formData: any) => {
        const newErrors: any = {};
        if (!formData.institute) newErrors.institute = "Institución es obligatoria";
        if (!formData.concept) newErrors.concept = "Concepto es obligatorio";
        if (!formData.certificate)
            newErrors.certificate = "Certificado es obligatorio";
        if (!formData.year) newErrors.year = "Año de capacitación es obligatorio";
        return newErrors;
    };

    const handleAdd = () => {
        setEditingItem(null);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleSave = (item: any) => {
        const validationErrors = validateForm(item);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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

    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                console.log("File content:", reader.result); // You can handle the file content here
            };
            reader.readAsDataURL(file); // Read file as a data URL
        }
    }

    return (
        <div className="card mb-8" id="external-training">
            <div className="card-header align-items-center">
                <h5 className="card-title flex-1 align-items-center">
                    Capacitaciones externas
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
                    <ExternalTrainingTable
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
                zIndex={9999}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newItem = {
                            id: editingItem?.id || null,
                            institute: formData.get("institute"),
                            concept: formData.get("concept"),
                            certificate: formData.get("certificate"),
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
                            label: "Institución",
                            id: "institute",
                            name: "institute",
                            type: "text",
                            defaultValue: editingItem?.institute || "",
                        },
                        {
                            label: "Concepto",
                            id: "concept",
                            name: "concept",
                            type: "text",
                            defaultValue: editingItem?.concept || "",
                        },
                        {
                            label: "Certificado / Constancia",
                            id: "certificate",
                            name: "certificate",
                            type: "file",
                            defaultValue: "",
                        },
                        {
                            label: "Año de capacitación",
                            id: "year",
                            name: "year",
                            type: "text",
                            defaultValue: editingItem?.year || "",
                        },
                    ].map(({ label, id, name, type, defaultValue }) => (
                        <div className="form-group" key={id}>
                            <label htmlFor={id}>{label}</label>
                            {type === "file" ? (
                                <div>
                                    <label className="btn btn-primary btn-sm">
                                        <KTIcon iconName="add-item" iconType="duotone" />
                                        Subir
                                        <input
                                            id={id}
                                            name={name}
                                            type={type}
                                            style={{ display: "none" }}
                                            onChange={(event) => {
                                                handleFileChange(event);
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    const filePreview = document.getElementById(
                                                        `${id}-preview`
                                                    ) as HTMLAnchorElement;
                                                    filePreview.href = URL.createObjectURL(file);
                                                    filePreview.textContent = file.name;
                                                    filePreview.style.display = "inline";
                                                }
                                            }}
                                        />
                                    </label>
                                    <a
                                        id={`${id}-preview`}
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "none", marginLeft: "10px" }}
                                    >
                                        Ver archivo
                                    </a>
                                </div>
                            ) : (
                                <>
                                    <Input
                                        id={id}
                                        name={name}
                                        type={type}
                                        defaultValue={defaultValue}
                                        className="form-control"
                                        style={{ width: "100%" }}
                                    />
                                    {errors[id] && (
                                        <span style={{ color: "red", fontSize: "12px" }}>
                                            {errors[id]}
                                        </span>
                                    )}
                                </>
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
            <div className="card-footer">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                        const navigate = useNavigate();
                        navigate("/human-resources/tools/calendar/contact-data",);
                    }}
                    style={{
                        padding: "8px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Guardar y Continuar
                </button>
            </div>
        </div>
    );
}

export default ExternalTrainingSection;