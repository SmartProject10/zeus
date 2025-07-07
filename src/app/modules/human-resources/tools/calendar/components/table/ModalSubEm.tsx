import React, { useState } from 'react';

interface ModalSubEmProps {
    onClose: () => void; // Función para cerrar el modal
    fechaIngreso?: string;
}

interface SubEmForm {
    ruc: string;
    razonSocial: string;
    pais: string;
    provincia: string;
    ciudad: string;
    direccion: string;
    actividadEconomica: string;
    sectorEconomico: string;
    tamanoEmpresa: string;
    fechaIngreso?: string;
    fechaTermino?: string;
}

const ModalSubEm: React.FC<ModalSubEmProps> = ({ onClose }) => {
    const [form, setForm] = useState<SubEmForm>({
        ruc: '',
        razonSocial: '',
        pais: 'Perú',
        provincia: '',
        ciudad: '',
        direccion: '',
        actividadEconomica: '',
        sectorEconomico: '',
        tamanoEmpresa: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validación de campos
        if (
            !form.ruc ||
            !form.razonSocial ||
            !form.provincia ||
            !form.ciudad ||
            !form.direccion ||
            !form.actividadEconomica ||
            !form.sectorEconomico ||
            !form.tamanoEmpresa
        ) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            // Simulación de una llamada a la API para registrar la subempresa
            const newSubEm = { ...form };

            console.log('Nueva subempresa registrada:', newSubEm);

            // Aquí puedes realizar una llamada a la API para guardar la subempresa
            // Ejemplo:
            // await api.registerSubEm(newSubEm);

            alert('Subempresa registrada exitosamente.');
            onClose(); // Cierra el modal después de registrar la subempresa
        } catch (error) {
            console.error('Error al registrar la subempresa:', error);
            alert('Ocurrió un error al registrar la subempresa.');
        }
    };

    return (
        <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            tabIndex={-1}
            role="dialog"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Nueva Subempresa</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="ruc" className="required col-form-label">
                                        RUC
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="ruc"
                                        name="ruc"
                                        value={form.ruc}
                                        onChange={handleChange}
                                        placeholder="Ingrese el RUC"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="razonSocial" className="required col-form-label">
                                        Razón Social
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="razonSocial"
                                        name="razonSocial"
                                        value={form.razonSocial}
                                        onChange={handleChange}
                                        placeholder="Ingrese la razón social"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="pais" className="required col-form-label">
                                        País
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="pais"
                                        name="pais"
                                        value={form.pais}
                                        onChange={handleChange}
                                        placeholder="Ingrese el país"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="provincia" className="required col-form-label">
                                        Provincia
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="provincia"
                                        name="provincia"
                                        value={form.provincia}
                                        onChange={handleChange}
                                        placeholder="Ingrese la provincia"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="ciudad" className="required col-form-label">
                                        Ciudad
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="ciudad"
                                        name="ciudad"
                                        value={form.ciudad}
                                        onChange={handleChange}
                                        placeholder="Ingrese la ciudad"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="direccion" className="required col-form-label">
                                        Dirección
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        value={form.direccion}
                                        onChange={handleChange}
                                        placeholder="Ingrese la dirección"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="actividadEconomica" className="required col-form-label">
                                        Actividad Económica
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="actividadEconomica"
                                        name="actividadEconomica"
                                        value={form.actividadEconomica}
                                        onChange={handleChange}
                                        placeholder="Ingrese la actividad económica"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="sectorEconomico" className="required col-form-label">
                                        Sector Económico
                                    </label>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="sectorEconomico"
                                        name="sectorEconomico"
                                        value={form.sectorEconomico}
                                        onChange={handleChange}
                                        placeholder="Ingrese el sector económico"
                                        className="form-control input-sm"
                                    />
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="tamanoEmpresa" className="required col-form-label">
                                        Tamaño Empresa
                                    </label>
                                </div>
                                <div className="col-6">
                                    <select
                                        id="tamanoEmpresa"
                                        name="tamanoEmpresa"
                                        value={form.tamanoEmpresa}
                                        onChange={handleChange}
                                        className="form-select input-sm"
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Pequeña">Pequeña</option>
                                        <option value="Mediana">Mediana</option>
                                        <option value="Grande">Grande</option>
                                    </select>
                                </div>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="fechaIngreso" className="required col-form-label">
                                            Fecha de Ingreso
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="date"
                                            id="fechaIngreso"
                                            name="fechaIngreso"
                                            value={form.fechaIngreso || ''}
                                            onChange={handleChange}
                                            className="form-control input-sm"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="fechaTermino" className="col-form-label">
                                            Fecha de Término de Contrato
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="date"
                                            id="fechaTermino"
                                            name="fechaTermino"
                                            value={form.fechaTermino || ''}
                                            onChange={handleChange}
                                            className="form-control input-sm"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="logo" className="required col-form-label">
                                            Logo
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="file"
                                            id="logo"
                                            name="logo"
                                            accept="image/*"
                                            className="form-control input-sm"
                                            required
                                            onChange={(event) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    console.log('Logo seleccionado:', file);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="contrato" className="col-form-label">
                                            Contrato (PDF)
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="file"
                                            id="contrato"
                                            name="contrato"
                                            accept=".pdf,.doc,.docx"
                                            className="form-control input-sm"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    console.log('Contrato seleccionado:', file);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-4">
                                <div className="col-6">
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSubEm;