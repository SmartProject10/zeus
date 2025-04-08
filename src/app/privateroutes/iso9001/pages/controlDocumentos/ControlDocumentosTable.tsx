import { KTCard,KTCardBody } from '../../../../generalcomponents/helpers'
import { ControlDocsResponse } from './core/_models';

const ControlDocumentosTable = ({ dataSource, handleOpenModal, handleDeleteData }: any) => {
    return (
        <KTCard>
            <KTCardBody className="py-4 card card-grid min-w-full">
                {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                      className="btn btn-primary btn-md"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdropReporte"
                      onClick={() => handleOpenModal('create')}
                  >
                      <i className="bi bi-plus-circle-fill"></i>
                      Nuevo reporte
                  </button>
              </div> */}

                <div className="table-responsive">
                    <table className="table table-striped align-middle gy-7 gs-7">
                        <thead>
                            <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                <th>Corporativo</th>
                                <th>Proyecto</th>
                                <th>Tipo Documento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSource.length > 0 ? (
                                dataSource.map((controlDoc: ControlDocsResponse, index: number) => (
                                    <tr key={index}>
                                        <td>{controlDoc.corporativo}</td>
                                        <td>{controlDoc.proyectos}</td>
                                        <td>{controlDoc.tipoDocumento}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdropControlDocs"
                                                    onClick={() => handleOpenModal('edit', controlDoc)}
                                                >
                                                    <i className="fas fa-edit fs-4"></i>
                                                </button>
                                                {/* <button
                                                    className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdropReporte"
                                                    onClick={() => handleOpenModal('view', controlDoc)}
                                                >
                                                    <i className="fas fa-eye fs-4"></i>
                                                </button> */}
                                                <button
                                                    className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
                                                    onClick={() => handleDeleteData(controlDoc._id)}
                                                >
                                                    <i className="fas fa-trash fs-4"></i>
                                                </button>
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

export default ControlDocumentosTable