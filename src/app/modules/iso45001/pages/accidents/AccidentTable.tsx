// @ts-nocheck
import { KTCard, KTCardBody } from '@zeus/_zeus/helpers'
import { AccidentsResponse } from '../../../../@services/api/dtos/AccidentModel'
import { useState, useEffect } from 'react'
//import { BASE_URL } from '../../../../../@services/api/requests/accident.requests'

function AccidentsTable({ 
	dataSource, 
	handleDeleteData, 
	handleDeleteRegistroData, 
	handleOpenModal, 
	handleOpenRegistroModal,
}: any) {
    const [estadosRegistro, setEstadosRegistro] = useState<{ [key: string]: string }>({})

    // Función para obtener el estado del registro
    const obtenerEstadoRegistro = async (registroAccidenteId: string | null) => {
        if (!registroAccidenteId) {
            return <span className="text-danger">No realizado</span>  // Si no existe el ID, regresamos "No realizado"
        }

        //const apiUrl = `${BASE_URL}/api/accidents`
        const apiUrl = `/api/accidents`

        try {
            const response = await fetch(`${apiUrl}/getRegistroAccidenteById/${registroAccidenteId}`)
            if (!response.ok) {
                throw new Error('Error fetching registro')
            }
            const selectedRegistro = await response.json()

            const {
                noRegistro,
                razonSocialEmpleadorPrincipal,
                sedeEmpleadorPrincipal,
                rucEmpleadorPrincipal,
                noTrabajadoresEmpleadorPrincipal,
                tipoActividadEconomicaEmpleadorPrincipal,
                direccionEmpleadorPrincipal,
                distritoEmpleadorPrincipal,
                departamentoEmpleadorPrincipal,
                provinciaEmpleadorPrincipal,
                noTrabajadoresAfiliadosSCTREmpleadorPrincipal,
                noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal,
                nombreAseguradoraEmpleadorPrincipal,

                razonSocialEmpleadorIntermediacion,
                sedeEmpleadorIntermediacion,
                rucEmpleadorIntermediacion,
                noTrabajadoresEmpleadorIntermediacion,
                tipoActividadEconomicaEmpleadorIntermediacion,
                direccionEmpleadorIntermediacion,
                distritoEmpleadorIntermediacion,
                departamentoEmpleadorIntermediacion,
                provinciaEmpleadorIntermediacion,
                noTrabajadoresAfiliadosSCTREmpleadorIntermediacion,
                noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion,
                nombreAseguradoraEmpleadorIntermediacion,

                nombreTrabajador,
                apPatTrabajador,
                apMatTrabajador,
                dniTrabajador,
                edadTrabajador,
                sexoTrabajador,
                areaTrabajador,
                cargoTrabajador,
                trabajador,
                antiguedadPuestoTrabajador,
                tipoContratoTrabajador,
                tiempoExperienciaTrabajador,
                capacitadoTareaTrabajador,
                noHorasTrabajadasJornadaLabTrabajador,

                fechaOcurrenciaAccidente,
                horaOcurrenciaAccidente,
                fechaInicioInvestigacionAccidente,
                lugarExactoAccidente,
                areaAccidente,
                gravedadAccidenteTrabajo,
                centroSalud,
                medicoTratante,
                diagnosticoMedico,
                fechaDescansoMedico,
                diasDescansoMedico,
            } = selectedRegistro

            // Validaciones simplificadas
            const hasDataNoRegistro = !!(noRegistro)

            const hasDataPrincipal = !!(razonSocialEmpleadorPrincipal && sedeEmpleadorPrincipal && rucEmpleadorPrincipal &&
                noTrabajadoresEmpleadorPrincipal > 0 && tipoActividadEconomicaEmpleadorPrincipal &&
                direccionEmpleadorPrincipal && distritoEmpleadorPrincipal && departamentoEmpleadorPrincipal &&
                provinciaEmpleadorPrincipal && noTrabajadoresAfiliadosSCTREmpleadorPrincipal > 0 &&
                noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal > 0 && nombreAseguradoraEmpleadorPrincipal)

            const hasDataIntermediacion = !!(
								razonSocialEmpleadorIntermediacion && 
								sedeEmpleadorIntermediacion && 
								rucEmpleadorIntermediacion &&
                noTrabajadoresEmpleadorIntermediacion > 0 && tipoActividadEconomicaEmpleadorIntermediacion &&
                direccionEmpleadorIntermediacion && distritoEmpleadorIntermediacion && departamentoEmpleadorIntermediacion &&
                provinciaEmpleadorIntermediacion && noTrabajadoresAfiliadosSCTREmpleadorIntermediacion > 0 &&
                noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion > 0 && nombreAseguradoraEmpleadorIntermediacion)

            const hasTrabajadorData = !!(nombreTrabajador && apPatTrabajador && apMatTrabajador && dniTrabajador &&
                edadTrabajador > 0 && sexoTrabajador && areaTrabajador && cargoTrabajador &&
                trabajador && antiguedadPuestoTrabajador > 0 && tipoContratoTrabajador &&
                tiempoExperienciaTrabajador && capacitadoTareaTrabajador && noHorasTrabajadasJornadaLabTrabajador > 0)

            const hasAccidenteData = !!(
							fechaOcurrenciaAccidente && 
							horaOcurrenciaAccidente && 
							fechaInicioInvestigacionAccidente &&
                lugarExactoAccidente && areaAccidente && gravedadAccidenteTrabajo &&
                centroSalud && medicoTratante && diagnosticoMedico && fechaDescansoMedico && diasDescansoMedico > 0)

            if (hasDataNoRegistro && (hasDataPrincipal || hasDataIntermediacion) && hasTrabajadorData && hasAccidenteData) {
                return <span className="text-success">Terminado</span>
            } else if (
							hasDataNoRegistro || 
							hasDataPrincipal || 
							hasDataIntermediacion || 
							hasTrabajadorData || 
							hasAccidenteData
						) {
                return <span className="text-warning">En proceso</span>
            } else {
                return <span className="text-danger">No realizado</span>
            }
        } catch (error) {
            console.error('Error al obtener el estado del registro:', error)
            return 'Error'
        }
    }

    useEffect(() => {
        const cargarEstados = async () => {
            const nuevosEstados: { [key: string]: string } = {}

            if (Array.isArray(dataSource)) {
                for (const reporte of dataSource) {
                    const registroId = reporte.registroAccidente.length > 0 ? reporte.registroAccidente[0] : null
                    const estado = await obtenerEstadoRegistro(registroId)

                    nuevosEstados[reporte._id] = estado
                }
            }

            setEstadosRegistro(nuevosEstados)
        }

        cargarEstados()
    }, [dataSource])

    return (
        <KTCard>
            <KTCardBody className="py-4 card card-grid min-w-full">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                        className="btn btn-primary btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropReporte"
                        onClick={() => handleOpenModal('create')}
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Nuevo reporte
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped align-middle gy-7 gs-7">
                        <thead>
                            <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                <th>Fecha</th>
                                <th>Área</th>
                                <th>Cargo</th>
                                <th>Trabajador</th>
                                <th>DNI</th>
                                <th>Descripción</th>
                                <th>Reportado por</th>
                                <th>Elaborado por</th>
                                <th>Estado Registro</th>
                                <th>Acción Reporte</th>
                                <th>Acción Registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSource.length > 0 ? (
                                dataSource.map((reporte: AccidentsResponse, index: number) => (
                                    <tr key={index}>
                                        <td>{reporte.fecha}</td>
                                        <td>{reporte.area}</td>
                                        <td>{reporte.cargo}</td>
                                        <td>{reporte.trabajador}</td>
                                        <td>{reporte.dni}</td>
                                        <td>{reporte.descripcion}</td>
                                        <td>{reporte.reportadoPor ? reporte.reportadoPor : ''}</td>
                                        <td>{reporte.elaboradoPor ? reporte.elaboradoPor : ''}</td>

                                        {/* Columna Estado Registro */}
                                        <td>{estadosRegistro[reporte._id] || 'No realizado'}</td>

                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdropReporte"
                                                    onClick={() => handleOpenModal('edit', reporte)}
                                                >
                                                    <i className="fas fa-edit fs-4"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdropReporte"
                                                    onClick={() => handleOpenModal('view', reporte)}
                                                >
                                                    <i className="fas fa-eye fs-4"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
                                                    onClick={() => handleDeleteData(reporte._id)}
                                                >
                                                    <i className="fas fa-trash fs-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                {reporte.registroAccidente.length > 0 ? (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdropRegistro"
                                                            onClick={() => handleOpenRegistroModal('edit', reporte)}
                                                        >
                                                            <i className="fas fa-edit fs-4"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdropRegistro"
                                                            onClick={() => handleOpenRegistroModal('view', reporte)}
                                                        >
                                                            <i className="fas fa-eye fs-4"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
                                                            onClick={() => handleDeleteRegistroData(reporte)}
                                                        >
                                                            <i className="fas fa-trash fs-4"></i>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#staticBackdropRegistro"
                                                        onClick={() => handleOpenRegistroModal('create', reporte)}
                                                    >
                                                        <i className="bi bi-plus-circle-fill"></i>
                                                        Nuevo Registro
                                                    </button>
                                                )}
                                            </div>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={7}>{dataSource.msg}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default AccidentsTable
