import React, { useState } from 'react';

interface ModalAreaProps {
    onClose: () => void;
}

interface AreaForm {
    nombreArea: string;
    cargosArea: string[];
}

const ModalArea: React.FC<ModalAreaProps> = ({ onClose }) => {
    const [form, setForm] = useState<AreaForm>({
        nombreArea: '',
        cargosArea: [''],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const { name, value } = event.target;

        if (name === 'nombreArea') {
            setForm((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        } else if (index !== undefined) {
            const updatedCargos = [...form.cargosArea];
            updatedCargos[index] = value;
            setForm((prevState) => ({
                ...prevState,
                cargosArea: updatedCargos,
            }));
        }
    };

    const handleAddCargo = () => {
        setForm((prevState) => ({
            ...prevState,
            cargosArea: [...prevState.cargosArea, ''],
        }));
    };

    const handleRemoveCargo = (index: number) => {
        setForm((prevState) => ({
            ...prevState,
            cargosArea: prevState.cargosArea.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!form.nombreArea || form.cargosArea.some((cargo) => !cargo)) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const newArea = {
                nombreArea: form.nombreArea,
                cargosArea: form.cargosArea,
            };

            console.log('Nueva área registrada:', newArea);

            alert('Área registrada exitosamente.');
            onClose();
        } catch (error) {
            console.error('Error al registrar el área:', error);
            alert('Ocurrió un error al registrar el área.');
        }
    };

    return (
        <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            tabIndex={-1}
            role="dialog"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                style={{ maxWidth: '800px' }} // Extiende el ancho del modal
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Nueva Área</h5>
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
                                        <label htmlFor="nombreArea" className="required col-form-label">
                                            Nombre del Área
                                        </label>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            id="nombreArea"
                                            name="nombreArea"
                                            value={form.nombreArea}
                                            onChange={handleChange}
                                            placeholder="Ingrese el nombre del área"
                                            className="form-control input-sm"
                                        />
                                    </div>
                                </div>

                                {form.cargosArea.map((cargo, index) => (
                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2"
                                        key={index}
                                    >
                                        <div className="col-6">
                                            <label
                                                htmlFor={`cargosArea-${index}`}
                                                className="required col-form-label"
                                            >
                                                Cargo {index + 1}
                                            </label>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                id={`cargosArea-${index}`}
                                                name="cargosArea"
                                                value={cargo}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="Ingrese el cargo de mayor jerarquía"
                                                className="form-control input-sm"
                                            />
                                        </div>
                                        {index > 0 && ( // Mostrar el botón de eliminar solo desde el segundo cargo
                                            <div className="col-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleRemoveCargo(index)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                    <div className="col-12 text-end">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={handleAddCargo}
                                        >
                                            + Agregar Cargo
                                        </button>
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

export default ModalArea;