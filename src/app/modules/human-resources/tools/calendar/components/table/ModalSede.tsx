import React, { useState } from 'react';

interface ModalSedeProps {
    onClose: () => void;
}

interface SedeForm {
    nombreSede: string;
    direccionSede: string;
    ciudad: string;
    provincia: string;
}

const ModalSede: React.FC<ModalSedeProps> = ({ onClose }) => {
    const [form, setForm] = useState<SedeForm>({
        nombreSede: '',
        direccionSede: '',
        ciudad: '',
        provincia: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!form.nombreSede || !form.direccionSede || !form.ciudad || !form.provincia) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const newSede = {
                nombreSede: form.nombreSede,
                direccionSede: form.direccionSede,
                ciudad: form.ciudad,
                provincia: form.provincia,
            };

            console.log('Nueva sede registrada:', newSede);
            alert('Sede registrada exitosamente.');
            onClose();
        } catch (error) {
            console.error('Error al registrar la sede:', error);
            alert('Ocurrió un error al registrar la sede.');
        }
    };

    return (
        <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            tabIndex={-1}
            role="dialog"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Nueva Sede</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="nombreSede" className="required col-form-label">
                                            Nombre de la Sede
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            id="nombreSede"
                                            name="nombreSede"
                                            value={form.nombreSede}
                                            onChange={handleChange}
                                            placeholder="Ingrese el nombre de la sede"
                                            className="form-control input-sm"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="direccionSede" className="required col-form-label">
                                            Dirección de la Sede
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            id="direccionSede"
                                            name="direccionSede"
                                            value={form.direccionSede}
                                            onChange={handleChange}
                                            placeholder="Ingrese la dirección de la sede"
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
                                <div className="modal-footer mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSede;