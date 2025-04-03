// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { AreasResponse } from './core/_models'
//import { BASE_URL } from 'src/@services/api/requests/accident.requests'

const AreasModal = () => {
    // const initialValues: AreasResponse = {
    //     sistemaGestion: '',
    //     nomenclatura: '',
    //     area: '',
    // }

    //const apiUrl = `${BASE_URL}/api/control-documentos`
    const apiUrl = `/api/control-documentos`

    // const [formData, setFormData] = useState(initialValues)
    const [dataSourceAreas, setDataSourceAreas] = useState<AreasResponse[]>([]) // Datos del backend
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({}) // Estado para ver qué fila está en modo edición
    const [_, setIsLoading] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false) // Estado para el modal

    const closeModalButtonRef = React.createRef<HTMLButtonElement>()

    // Obtener las áreas desde el backend
    const fetchAreas = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${apiUrl}/getAreas`)
            const data = await response.json()

            if (Array.isArray(data)) {
                setDataSourceAreas(data) // Guardar los datos del backend
            } else {
                setDataSourceAreas([])
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las áreas.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, areaId: string) => {
        const { name, value } = e.target
        setDataSourceAreas((prevAreas) =>
            prevAreas.map((area) => (area._id === areaId ? { ...area, [name]: value } : area)),
        )
    }

    const handleEditToggle = (e: React.MouseEvent, areaId: string) => {
        e.preventDefault() // Evitar el comportamiento por defecto del botón dentro del formulario
        setIsEditing((prevEditing) => ({
            ...prevEditing,
            [areaId]: !prevEditing[areaId], // Alterna entre editar o no la fila seleccionada
        }))
    }

    const handleSave = async (e: React.MouseEvent, areaId: string) => {
        e.preventDefault() // Evitar que se recargue la página al hacer clic en Guardar
        const areaToSave = dataSourceAreas.find((area) => area._id === areaId)
        if (!areaToSave) return

        try {
            const response = await fetch(`${apiUrl}/updateArea/${areaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(areaToSave),
            })

            if (!response.ok) {
                throw new Error('Error al guardar el área')
            }

            setIsEditing((prevEditing) => ({
                ...prevEditing,
                [areaId]: false, // Salir del modo edición tras guardar
            }))
            Swal.fire('Éxito', 'Área actualizada correctamente', 'success')
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar el área', 'error')
        }
    }

    useEffect(() => {
        const modal = document.getElementById('staticBackdropArea')

        const handleModalOpen = () => {
            setModalOpen(true)
        }

        const handleModalClose = () => {
            setModalOpen(false)
        }

        modal?.addEventListener('shown.bs.modal', handleModalOpen)
        modal?.addEventListener('hidden.bs.modal', handleModalClose)

        return () => {
            modal?.removeEventListener('shown.bs.modal', handleModalOpen)
            modal?.removeEventListener('hidden.bs.modal', handleModalClose)
        }
    }, [])

    // Ejecutar fetchAreas cuando el modal se abre
    useEffect(() => {
        if (modalOpen) {
            fetchAreas()
        }
    }, [modalOpen])

    return (
        <div
className="modal fade" id="staticBackdropArea"
data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <form className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">Lista de Áreas</h1>
                        <button
ref={closeModalButtonRef} type="button"
className="btn-close" id="closeModalButton"
data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card shadow-none mb-0">
                            <div className="card-body bg-secondary">
                                <div className="table-responsive">
                                    <table className="table table-secondary table-row-gray-300 align-middle gs-7">
                                        <thead>
                                            <tr className="fw-bold border-bottom-2 border-gray-200">
                                                <th>Áreas</th>
                                                <th>Sistema de Gestión</th>
                                                <th>Nomenclatura</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSourceAreas.length > 0 ? (
                                                dataSourceAreas.map((area) => (
                                                    <tr key={area._id}>
                                                        <td>{area.area}</td>
                                                        <td>
                                                            {isEditing[area._id] ? (
                                                                <input
                                                                    type="text"
                                                                    name="sistemaGestion"
                                                                    value={area.sistemaGestion}
                                                                    onChange={(e) => handleInputChange(e, area._id)}
                                                                />
                                                            ) : (
                                                                area.sistemaGestion || ''
                                                            )}
                                                        </td>
                                                        <td>
                                                            {isEditing[area._id] ? (
                                                                <input
                                                                    type="text"
                                                                    name="nomenclatura"
                                                                    value={area.nomenclatura}
                                                                    onChange={(e) => handleInputChange(e, area._id)}
                                                                />
                                                            ) : (
                                                                area.nomenclatura || ''
                                                            )}
                                                        </td>
                                                        <td>
                                                            {isEditing[area._id] ? (
                                                                <button
                                                                    className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                                    onClick={(e) => handleSave(e, area._id)}
                                                                >
                                                                    <i className="bi bi-floppy2"></i>
                                                                </button>
                                                            ) : (
                                                                // <button
                                                                //     className="btn btn-sm btn-warning"
                                                                //     onClick={(e) => handleEditToggle(e, area._id)}
                                                                // >
                                                                //     <i className="fas fa-edit fs-4"></i>
                                                                // </button>
                                                                <button
                                                                    className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                                    onClick={(e) => handleEditToggle(e, area._id)}
                                                                >
                                                                    <i className="fas fa-edit fs-4"></i>
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="text-center">
                                                    <td colSpan={4}>Sin datos</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
type="button" className="btn btn-success"
data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AreasModal
