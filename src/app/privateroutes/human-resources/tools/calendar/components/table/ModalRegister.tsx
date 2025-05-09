import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { KTCardBody } from '../../../../../../../_zeus/helpers';
import { CompanyForm } from '../../core/_models';
import { registerCompany } from '../../core/_requests';

interface ModalRegisterProps {
    onClose: () => void;
}

const ModalRegister: React.FC<ModalRegisterProps> = ({ onClose }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState<CompanyForm>({
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
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

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
            Swal.fire({
                icon: 'error',
                title: 'Por favor rellene todos los campos',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        try {
            const response = await registerCompany(form);
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Empresa registrada correctamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                navigate('/table/RegisterTable');
                onClose();
            }
        } catch (error) {
            console.error('Error al registrar la empresa:', error);
        }
    };

    return (
        <KTCardBody>
            <div
                className="modal fade show"
                id="registerCompanyModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="registerCompanyModalLabel"
                aria-hidden="true"
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        {/*<div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerCompanyModalLabel">
                                Nueva Empresa
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>*/}
                        <div className="modal-body">
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
            </div>
        </KTCardBody>
    );
};

export default ModalRegister;
