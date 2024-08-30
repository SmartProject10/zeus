import { KTCardBody } from "../../../../../../../_zeus/helpers";
const CalendarButton = () => {
    return (
        <KTCardBody>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-success btn-sm" type="button">
                <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                Importar a Excel
                </button>
                <button className="btn btn-success btn-sm" type="button">
                <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                Exportar a Excel
                </button>
                <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="bi bi-plus-circle-fill"></i>
                Nuevo Trabajador
                </button>
            </div>

            
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Nuevo Trabajador
                    </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                        <form>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">DNI(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">Nombres(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">Ape. Materno(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">Ape. Paterno(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="text" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>
                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">Fecha de cumpleaños(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="date" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>

                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="selecttext" className="col-form-label">Cargo(*)</label>
                                </div>
                                <div className="col-6">
                                    {/* <input type="text" id="inputtext" className="form-control input-sm"/> */}
                                    <select className="form-select select-sm" id="selecttext" aria-label="Default select example">
                                        <option selected>Seleccione una opción</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="selecttext" className="col-form-label">Área(*)</label>
                                </div>
                                <div className="col-6">
                                    {/* <input type="text" id="inputtext" className="form-control input-sm"/> */}
                                    <select className="form-select select-sm" id="selecttext" aria-label="Default select example">
                                        <option selected>Seleccione una opción</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">Fecha de ingreso a la empresa(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="date" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>

                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                <div className="col-6">
                                    <label htmlFor="inputtext" className="col-form-label">Fecha de ingreso al área(*)</label>
                                </div>
                                <div className="col-6">
                                    <input type="date" id="inputtext" className="form-control input-sm"/>
                                </div>
                            </div>
                        </form>
                        </div>
                        
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-success">Guardar</button>
                </div>
                </div>
            </div>
            </div>
        </KTCardBody>
    )
}

export {CalendarButton}