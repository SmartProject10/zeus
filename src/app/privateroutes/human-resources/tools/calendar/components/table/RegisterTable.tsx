import { useState } from 'react';

const initialData = [
    {
        title: 'Logo de la Empresa',
        type: 'file',
        value: '',
        disabled: true,
        name: 'logo',
    },
    {
        title: 'RUC',
        type: 'text',
        value: '12345678901',
        disabled: true,
        name: 'ruc',
    },
    {
        title: 'Razón Social',
        type: 'text',
        value: 'Empresa S.A.C.',
        disabled: true,
        name: 'razonSocial',
    },
    {
        title: 'País',
        type: 'text',
        value: 'Perú',
        disabled: true,
        name: 'pais',
    },
    {
        title: 'Provincia',
        type: 'text',
        value: 'Lima',
        disabled: true,
        name: 'provincia',
    },
    {
        title: 'Ciudad',
        type: 'text',
        value: 'Lima',
        disabled: true,
        name: 'ciudad',
    },
    {
        title: 'Dirección',
        type: 'text',
        value: 'Av. Principal 123',
        disabled: true,
        name: 'direccion',
    },
    {
        title: 'Actividad Económica',
        type: 'text',
        value: 'Comercio',
        disabled: true,
        name: 'actividadEconomica',
    },
    {
        title: 'Sector Económico',
        type: 'text',
        value: 'Privado',
        disabled: true,
        name: 'sectorEconomico',
    },
    {
        title: 'Tamaño Empresa',
        type: 'select',
        value: 'Mediana',
        disabled: true,
        name: 'tamanoEmpresa',
        options: ['Micro', 'Pequeña', 'Mediana', 'Grande'], // Opciones para el select
    },
];

export function RegisterTable() {
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleEditToggle = () => {
        setIsEditable(!isEditable);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const files = e.target instanceof HTMLInputElement && e.target.type === 'file' ? e.target.files : null;
        setFormData((prevData) =>
            prevData.map((item) =>
                item.name === name
                    ? {
                        ...item,
                        value: name === 'logo' && files?.[0]
                            ? URL.createObjectURL(files[0])
                            : value,
                    }
                    : item
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos guardados:', formData);
        setIsEditable(false);
    };

    const sortTable = (columnIndex: number, order: 'asc' | 'desc') => {
        const table = document.querySelector<HTMLTableElement>("#historyTable");
        const rows = Array.from(table?.querySelectorAll("tbody tr") || []);
        rows.sort((a, b) => {
            const cellA = a.children[columnIndex].textContent?.toLowerCase() || '';
            const cellB = b.children[columnIndex].textContent?.toLowerCase() || '';
            if (order === 'asc') return cellA.localeCompare(cellB);
            return cellB.localeCompare(cellA);
        });
        rows.forEach((row) => table?.querySelector("tbody")?.appendChild(row));
    };

    return (
        <div className="card mb-8" id="register-form">
            <div className="card-header">
                <button
                    className="btn btn-info btn-sm"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#historyModal"
                >
                    Ver Historial
                </button>
                <h2 className="card-title">Empresa Registrada</h2>
                {/* Modal for viewing history */}
                <div
                    className="modal fade"
                    id="historyModal"
                    tabIndex={-1}
                    aria-labelledby="historyModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="historyModalLabel">
                                    Historial de cambios
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar en el historial..."
                                        onChange={(e) => {
                                            const searchValue = e.target.value.toLowerCase();
                                            const rows = document.querySelectorAll<HTMLTableRowElement>("#historyTable tbody tr");
                                            rows.forEach((row) => {
                                                const cells = Array.from(row.children);
                                                const matches = cells.some((cell) =>
                                                    cell.textContent?.toLowerCase().includes(searchValue)
                                                );
                                                (row as HTMLElement).style.display = matches ? "" : "none";
                                            });
                                        }}
                                    />
                                </div>
                                <table className="table table-striped" id="historyTable">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>Fecha</div>
                                                <div className="d-flex justify-content-between align-items-center mt-1">
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(0, 'asc')}><i className="bi bi-sort-up"></i></button>
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(0, 'desc')}><i className="bi bi-sort-down"></i></button>
                                                </div>
                                            </th>
                                            <th>
                                                <div>Hora</div>
                                                <div className="d-flex justify-content-between align-items-center mt-1">
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(1, 'asc')}><i className="bi bi-sort-up"></i></button>
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(1, 'desc')}><i className="bi bi-sort-down"></i></button>
                                                </div>
                                            </th>
                                            <th>
                                                <div>Trabajador</div>
                                                <div className="d-flex justify-content-between align-items-center mt-1">
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(2, 'asc')}><i className="bi bi-sort-up"></i></button>
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(2, 'desc')}><i className="bi bi-sort-down"></i></button>
                                                </div>
                                            </th>
                                            <th>
                                                <div>Área</div>
                                                <div className="d-flex justify-content-between align-items-center mt-1">
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(3, 'asc')}><i className="bi bi-sort-up"></i></button>
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(3, 'desc')}><i className="bi bi-sort-down"></i></button>
                                                </div>
                                            </th>
                                            <th>
                                                <div>Cargo</div>
                                                <div className="d-flex justify-content-between align-items-center mt-1">
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(4, 'asc')}><i className="bi bi-sort-up"></i></button>
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(4, 'desc')}><i className="bi bi-sort-down"></i></button>
                                                </div>
                                            </th>
                                            <th>
                                                <div>Acciones</div>
                                                <div className="d-flex justify-content-between align-items-center mt-1">
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(5, 'asc')}><i className="bi bi-sort-up"></i></button>
                                                    <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(5, 'desc')}><i className="bi bi-sort-down"></i></button>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2023-10-01</td>
                                            <td>08:00</td>
                                            <td>Juan Pérez</td>
                                            <td>Recursos Humanos</td>
                                            <td>Gerente</td>
                                            <td>Creación de cuenta</td>
                                        </tr>
                                        <tr>
                                            <td>2023-10-02</td>
                                            <td>09:00</td>
                                            <td>Ana Gómez</td>
                                            <td>Finanzas</td>
                                            <td>Analista</td>
                                            <td>Actualización de datos</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-secondary ml-4" onClick={handleEditToggle}>
                    {isEditable ? 'Cancelar edición' : 'Editar'}
                </button>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {formData.map((item) => (
                        <div className="form-group row my-4" key={item.name}>
                            <label className="col-form-label col-lg-4 col-sm-12">
                                {item.title}
                            </label>
                            <div className="col-lg-8 col-md-9 col-sm-12">
                                {item.type === 'file' ? (
                                    <div className="d-flex align-items-center">
                                        {item.value && (
                                            <img
                                                src={item.value}
                                                alt="Logo"
                                                className="img-thumbnail me-3"
                                                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                            />
                                        )}
                                        <input
                                            name={item.name}
                                            type={item.type}
                                            className="form-control"
                                            disabled={!isEditable}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                ) : item.type === 'select' ? (
                                    <select
                                        name={item.name}
                                        className="form-control"
                                        disabled={!isEditable}
                                        value={item.value}
                                        onChange={handleInputChange}
                                    >
                                        {item.options?.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        name={item.name}
                                        type={item.type}
                                        className="form-control"
                                        placeholder={item.value}
                                        disabled={!isEditable}
                                        defaultValue={item.value}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-end mt-8">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isEditable}
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterTable;
