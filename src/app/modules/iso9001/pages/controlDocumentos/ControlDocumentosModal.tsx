import React, { useEffect, useState } from 'react';
import { ControlDocsResponse, TipoDocumentoResponse } from './core/_models';
import Swal from 'sweetalert2';
import { BASE_URL } from '@zeus/app/modules/iso45001/pages/accidentes/core/_requests';

interface ControlDocsModalProps {
    saveControlDocumento: (controlDoc: ControlDocsResponse) => void; // Pasar arreglo completo
    controlDocumento: ControlDocsResponse | null;
    mode: 'create' | 'edit' | 'view';
    isCreatingNew: boolean;
}

const ControlDocumentosModal = ({ saveControlDocumento, controlDocumento, mode, isCreatingNew }: ControlDocsModalProps) => {
    const initialValues: ControlDocsResponse = {
        horizontal: false,
        vertical: false,
        tipoDocumento: '',
        corporativo: '',
        proyectos: '',
        todos: false,
        tipoLetra: '',
        tipoNomenclatura: [],
        datosHorizontal: [],
        datosVertical: []
    };

    let apiUrl = `${BASE_URL}/api/control-documentos`

    const [formData, setFormData] = useState(initialValues);
    // const [tableDataHorizontal, setTableDataHorizontal] = useState<ControlDocsResponse[]>([]); // Nuevos datos
    // const [tableDataVertical, setTableDataVertical] = useState<ControlDocsResponse[]>([]); // Nuevos datos
    const [tableDataHorizontal, setTableDataHorizontal] = useState<Array<{
        tipoHorizontal: string;
        noHojasHorizontal: string;
    }>>([]);
    const [tableDataVertical, setTableDataVertical] = useState<Array<{
        tipoVertical: string;
        noHojasVertical: string;
    }>>([]);
    const [tiposDocumentos, setTiposDocumentos] = useState<TipoDocumentoResponse[]>([]); // Datos del backend    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false); // Estado para el modal
    const [selectedNomenclaturas, setSelectedNomenclaturas] = useState<string[]>([]); // Arreglo para tipos de nomenclatura seleccionados
    const [tipoHorizontal, setTipoHorizontal] = useState<string>('');
    const [noHojasHorizontal, setNoHojasHorizontal] = useState<string>('');
    const [tipoVertical, setTipoVertical] = useState<string>('');
    const [noHojasVertical, setNoHojasVertical] = useState<string>('');

    const closeModalButtonRef = React.createRef<HTMLButtonElement>();

    useEffect(() => {
        if (controlDocumento && mode !== 'create') {

            setFormData({
                ...controlDocumento,
                horizontal: controlDocumento.horizontal || false,
                vertical: controlDocumento.vertical || false,
            });
            setSelectedNomenclaturas([...controlDocumento.tipoNomenclatura]);

            // Cargar datos en las tablas de Horizontal y Vertical
            setTableDataHorizontal(controlDocumento.datosHorizontal || []);
            setTableDataVertical(controlDocumento.datosVertical || []);
        } else {
            setFormData({ ...initialValues });
            setSelectedNomenclaturas([]);
            setTableDataHorizontal([]); // Limpiar tabla de Horizontal
            setTableDataVertical([]); // Limpiar tabla de Vertical
        }
    }, [controlDocumento, mode]);

    // Obtener los tipos de documentos desde el backend
    const fetchTiposDocumentos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/getTiposDocumento`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setTiposDocumentos(data); // Guardar los datos del backend
            } else {
                setTiposDocumentos([]);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los tipos de documentos.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;

            // Si es el checkbox de "todos", reiniciar corporativo y proyectos
            if (name === 'todos') {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: isChecked,
                    corporativo: isChecked ? '' : prevState.corporativo,
                    proyectos: isChecked ? '' : prevState.proyectos,
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: isChecked
                }));
            }
        } else {
            // Si selecciona "corporativo" o "proyectos" y el checkbox "todos" está marcado,
            // desmarcar el checkbox "todos" solo si la opción es distinta a "Seleccione"
            if (name === 'corporativo' || name === 'proyectos' && formData.todos) {
                setFormData((prevState) => ({
                    ...prevState,
                    todos: false,  // Desmarcar el checkbox
                    [name]: value   // Actualizar el valor del select
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value   // Actualizar otros valores normalmente
                }));
            }
        }
    };

    const handleAddTableDataHorizontal = () => {
        if (!tipoHorizontal || !noHojasHorizontal) {
            Swal.fire({
                icon: 'error',
                title: 'Por favor rellene todos los campos de Horizontal',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const newHorizontalData = {
            tipoHorizontal,
            noHojasHorizontal
        };

        setTableDataHorizontal((prevData) => [...prevData, newHorizontalData]);

        // Limpiar los campos de tipoHorizontal y noHojasHorizontal
        setTipoHorizontal('');
        setNoHojasHorizontal('');
    };

    const handleAddTableDataVertical = () => {
        if (!tipoVertical || !noHojasVertical) {
            Swal.fire({
                icon: 'error',
                title: 'Por favor rellene todos los campos de Vertical',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const newVerticalData = {
            tipoVertical,
            noHojasVertical
        };

        setTableDataVertical((prevData) => [...prevData, newVerticalData]);

        // Limpiar los campos de tipoVertical y noHojasVertical
        setTipoVertical('');
        setNoHojasVertical('');
    };


    // Función para manejar la selección de tipo de nomenclatura
    const handleAddNomenclatura = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value && !selectedNomenclaturas.includes(value)) {
            setSelectedNomenclaturas([...selectedNomenclaturas, value]); // Agregar al arreglo
            setFormData({
                ...formData,
                tipoNomenclatura: [...formData.tipoNomenclatura, value], // Actualizar formData
            });
        }
    };

    // Función para eliminar una nomenclatura seleccionada
    const handleRemoveNomenclatura = (nomenclatura: string) => {
        const updatedNomenclaturas = selectedNomenclaturas.filter((item) => item !== nomenclatura);
        setSelectedNomenclaturas(updatedNomenclaturas); // Actualizar el estado de las seleccionadas
        setFormData({
            ...formData,
            tipoNomenclatura: updatedNomenclaturas, // Actualizar formData
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { tipoDocumento, corporativo, proyectos, todos, tipoLetra, tipoNomenclatura } = formData;

        // Validación de formulario
        if (!tipoDocumento && (!corporativo || !proyectos || !todos) || !tipoLetra || tipoNomenclatura.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Por favor rellene todos los campos del formulario',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        // Crear el objeto actualizado con los datos de las tablas
        const updatedFormData: ControlDocsResponse = {
            ...formData,
            datosHorizontal: tableDataHorizontal,  // Asignar directamente
            datosVertical: tableDataVertical       // Asignar directamente
        };

        if (isCreatingNew) {
            delete updatedFormData._id; //Eliminar id si es un nuevo control de documento
        }

        try {
            saveControlDocumento(updatedFormData); // Guardar todos los datos
            closeModalButtonRef.current?.click(); // Cerrar modal si el guardado fue exitoso
            setTableDataHorizontal([]); // Limpiar los nuevos datos
            setTableDataVertical([]); // Limpiar los nuevos datos
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar la subárea', 'error');
        }
    };





    useEffect(() => {
        const modal = document.getElementById('staticBackdropControlDocs');

        const handleModalOpen = () => {
            setModalOpen(true);
        };

        const handleModalClose = () => {
            setModalOpen(false);
        };

        modal?.addEventListener('shown.bs.modal', handleModalOpen);
        modal?.addEventListener('hidden.bs.modal', handleModalClose);

        return () => {
            modal?.removeEventListener('shown.bs.modal', handleModalOpen);
            modal?.removeEventListener('hidden.bs.modal', handleModalClose);
        };
    }, []);

    useEffect(() => {
        if (modalOpen) {
            fetchTiposDocumentos();
        }
    }, [modalOpen]);


    // Combinar los datos de la base de datos con los datos del formulario
    const combinedTableDataHorizontal = [/*...dataSourceSubAreas,*/ ...tableDataHorizontal];
    const combinedTableDataVertical = [/*...dataSourceSubAreas,*/ ...tableDataVertical];

    return (
        <div className="modal fade" id="staticBackdropControlDocs" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">
                            {isCreatingNew ? 'Nuevo Control de documentos' : 'Editar Control de documentos'}
                        </h1>
                        <button ref={closeModalButtonRef} type="button" className="btn-close" id="closeModalButton" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card shadow-none mb-0">
                            <div className="card-body bg-secondary card-blank">
                                <div className="row gy-4 mb-10">
                                    <div className="col-sm-4">
                                        <label htmlFor="horizontal" style={styles.labelWithCheckbox}>Horizontal</label>
                                        <input type="checkbox" name='horizontal' checked={formData.horizontal} onChange={handleInputChange} style={styles.checkbox} />
                                    </div>
                                    <div className="col-sm-4">
                                        <label htmlFor="vertical" style={styles.labelWithCheckbox}>Vertical</label>
                                        <input type="checkbox" name='vertical' checked={formData.vertical} onChange={handleInputChange} style={styles.checkbox} />
                                    </div>
                                    <div className='col-sm-4' />

                                    <div className="col-sm-4">
                                        <label htmlFor="tipoDocumento" className="required form-label">Tipo de Documento</label>
                                        <select
                                            name="tipoDocumento"
                                            className="form-select"
                                            value={formData.tipoDocumento}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione</option>
                                            {tiposDocumentos.map((tipoDoc, index) => (
                                                <option key={index} value={tipoDoc.tipoDocumento}>{tipoDoc.tipoDocumento}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <label htmlFor="documentacion" className="required form-label">Documentación</label>
                                    <div className="col-sm-5">
                                        <label htmlFor="corporativo">Corporativo</label>
                                        <select
                                            name="corporativo"
                                            className="form-select"
                                            value={formData.corporativo}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="corporativo1">Corporativo 1</option>
                                            <option value="corporativo2">Corporativo 2</option>
                                            <option value="corporativo3">Corporativo 3</option>
                                            <option value="corporativo4">Corporativo 4</option>
                                            <option value="corporativo5">Corporativo 5</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-5">
                                        <label htmlFor="proyectos">Proyectos</label>
                                        <select
                                            name="proyectos"
                                            className="form-select"
                                            value={formData.proyectos}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="proyecto1">Proyecto 1</option>
                                            <option value="proyecto2">Proyecto 2</option>
                                            <option value="proyecto3">Proyecto 3</option>
                                            <option value="proyecto4">Proyecto 4</option>
                                            <option value="proyecto5">Proyecto 5</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-2 mt-10">
                                        <label htmlFor="proyectos" style={styles.labelWithCheckbox}>Todos</label>
                                        <input type="checkbox" name='todos' checked={formData.todos} onChange={handleInputChange} style={styles.checkbox} />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="tipoLetra" className="required form-label">Tipo de Letra</label>
                                        <select
                                            name="tipoLetra"
                                            className="form-select"
                                            value={formData.tipoLetra}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="arial">Arial</option>
                                            <option value="times new roman">Times New Roman</option>
                                        </select>
                                    </div>
                                    <div className='col-sm-8' />

                                    <div className="col-sm-4">
                                        <label htmlFor="tipoNomenclatura" className="required form-label">Tipo Nomenclatura</label>
                                        <select
                                            name="tipoNomenclatura"
                                            className="form-select"
                                            value=""
                                            onChange={handleAddNomenclatura}
                                        >
                                            <option value="">Seleccione</option>
                                            {["Tipo Documento", "Proyecto", "Logo Corporativo", "Area", "Sub-Area"].map((nomenclatura) => (
                                                !selectedNomenclaturas.includes(nomenclatura) && (
                                                    <option key={nomenclatura} value={nomenclatura}>{nomenclatura}</option>
                                                )
                                            ))}
                                        </select>
                                    </div>
                                    {/* Contenedor de Nomenclaturas seleccionadas */}
                                    <div className="col-sm-8">
                                        <div style={styles.nomenclaturaContainer}>
                                            {selectedNomenclaturas.map((nomenclatura, index) => (
                                                <div key={nomenclatura} style={styles.nomenclaturaItem}>
                                                    <span>{index + 1}. {nomenclatura}</span>  {/* Agregamos el índice para mostrar el número */}
                                                    <button type="button" onClick={() => handleRemoveNomenclatura(nomenclatura)} style={styles.removeButton}>
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección Horizontal */}
                        {formData.horizontal && (
                            <div className="card shadow-none mb-10">
                                <div className="card-body bg-secondary ">
                                    <h3 className='mb-5'>Horizontal</h3>
                                    <div className="row gy-4 mb-10">
                                        <div className="col-sm-6">
                                            <label className="required form-label">Tipo</label>
                                            <select
                                                value={tipoHorizontal}
                                                onChange={(e) => setTipoHorizontal(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="encabezado">Encabezado</option>
                                                <option value="pie de pagina">Pie de página</option>
                                            </select>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="subarea" className="required form-label"># de hojas</label>
                                            <select
                                                value={noHojasHorizontal}
                                                onChange={(e) => setNoHojasHorizontal(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="primera cara">Primera cara</option>
                                                <option value="todas las caras">Todas las caras</option>
                                                <option value="ultima hoja">Última hoja</option>
                                            </select>
                                        </div>
                                        <div className="col-12 text-end">
                                            <button
                                                onClick={handleAddTableDataHorizontal}
                                                type="button"
                                                className="btn btn-sm btn-primary">
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="table-responsive mt-10">
                                        <table className="table table-secondary table-row-gray-300 align-middle gs-7">
                                            <thead>
                                                <tr className="fw-bold border-bottom-2 border-gray-200">
                                                    <th>Tipo</th>
                                                    <th># De Hojas</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {combinedTableDataHorizontal?.length > 0 ? (
                                                    combinedTableDataHorizontal.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{data.tipoHorizontal}</td>
                                                            <td>{data.noHojasHorizontal}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        // onClick={() => handleDeleteTableDataHorizontal(data, index)}
                                                                        className="btn btn-sm btn-primary"
                                                                    >
                                                                        Dibujar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr className="text-center">
                                                        <td colSpan={6}>Sin datos</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sección Vertical */}
                        {formData.vertical && (
                            <div className="card shadow-none mb-0">
                                <div className="card-body bg-secondary ">
                                    <h3 className='mb-5'>Vertical</h3>
                                    <div className="row gy-4 mb-10">
                                        <div className="col-sm-6">
                                            <label className="required form-label">Tipo</label>
                                            <select
                                                value={tipoVertical}
                                                onChange={(e) => setTipoVertical(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="encabezado">Encabezado</option>
                                                <option value="pie de pagina">Pie de página</option>
                                            </select>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="subarea" className="required form-label"># de hojas</label>
                                            <select
                                                value={noHojasVertical}
                                                onChange={(e) => setNoHojasVertical(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="primera cara">Primera cara</option>
                                                <option value="todas las caras">Todas las caras</option>
                                                <option value="ultima hoja">Última hoja</option>
                                            </select>
                                        </div>
                                        <div className="col-12 text-end">
                                            <button
                                                onClick={handleAddTableDataVertical}
                                                type="button"
                                                className="btn btn-sm btn-primary">
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="table-responsive mt-10">
                                        <table className="table table-secondary table-row-gray-300 align-middle gs-7">
                                            <thead>
                                                <tr className="fw-bold border-bottom-2 border-gray-200">
                                                    <th>Tipo</th>
                                                    <th># De Hojas</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {combinedTableDataVertical?.length > 0 ? (
                                                    combinedTableDataVertical.map((data, index) => (
                                                        <tr key={index}>
                                                            <td>{data.tipoVertical}</td>
                                                            <td>{data.noHojasVertical}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        // onClick={() => handleDeleteTableDataVertical(data, index)}
                                                                        className="btn btn-sm btn-primary"
                                                                    >
                                                                        Dibujar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr className="text-center">
                                                        <td colSpan={6}>Sin datos</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success">{isCreatingNew ? 'Crear control de documento' : 'Guardar cambios'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Estilos en línea
const styles = {
    labelWithCheckbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',  // Espacio entre el checkbox y el texto
    },
    checkbox: {
        transform: 'scale(1.5)',  // Escalar el checkbox para hacerlo más grande
        marginRight: '10px',      // Margen a la derecha del checkbox
    },
    nomenclaturaContainer: {
        border: '1px solid #ddd',
        padding: '10px',
        minHeight: '50px',
        display: 'flex',
        flexWrap: 'wrap' as const,  // Cambiamos a 'wrap' y agregamos 'as const'
        gap: '10px',
    },
    nomenclaturaItem: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '5px',
    },
    removeButton: {
        marginLeft: '10px',
        background: 'transparent',
        border: 'none',
        color: 'red',
        cursor: 'pointer',
    },
};

export default ControlDocumentosModal;
