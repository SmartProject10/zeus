import React, { useState } from 'react';

interface ModalSubSedeProps {
    onClose: () => void;
}

interface SubSedeForm {
    nombreSubSede: string;
    direccionSubSede: string;
    ciudad: string;
    provincia: string;
}

const ModalSubSede: React.FC<ModalSubSedeProps> = ({ onClose }) => {
    const [form, setForm] = useState<SubSedeForm>({
        nombreSubSede: '',
        direccionSubSede: '',
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

        if (!form.nombreSubSede || !form.direccionSubSede || !form.ciudad || !form.provincia) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const newSubSede = {
                nombreSubSede: form.nombreSubSede,
                direccionSubSede: form.direccionSubSede,
                ciudad: form.ciudad,
                provincia: form.provincia,
            };

            console.log('Nueva subsede registrada:', newSubSede);
            alert('SubSede registrada exitosamente.');
            onClose();
        } catch (error) {
            console.error('Error al registrar la subsede:', error);
            alert('Ocurrió un error al registrar la subsede.');
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
                        <h5 className="modal-title">Registrar Nueva SubSede</h5>
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
                                        <label htmlFor="nombreSubSede" className="required col-form-label">
                                            Nombre de la SubSede
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            id="nombreSubSede"
                                            name="nombreSubSede"
                                            value={form.nombreSubSede}
                                            onChange={handleChange}
                                            placeholder="Ingrese el nombre de la subsede"
                                            className="form-control input-sm"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-6">
                                        <label htmlFor="direccionSubSede" className="required col-form-label">
                                            Dirección de la SubSede
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            id="direccionSubSede"
                                            name="direccionSubSede"
                                            value={form.direccionSubSede}
                                            onChange={handleChange}
                                            placeholder="Ingrese la dirección de la subsede"
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

export default ModalSubSede;