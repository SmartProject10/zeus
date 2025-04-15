import { KTCard, KTCardBody } from '@zeus/_zeus/helpers'
import React, { useState } from 'react'

const BotonesModales = ({ handleOpenModal }: any) => {

    return (
        <KTCard>
            <KTCardBody className="py-4 card card-grid min-w-full">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                        className="btn btn-primary btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropTipoDocumento"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Nuevo Tipo de Documento
                    </button>

                    <button
                        className="btn btn-primary btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropProyecto"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Nuevo Proyecto
                    </button>

                    <button
                        className="btn btn-primary btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropLogoCorporativo"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Nuevo Logo Corporativo
                    </button>

                    <button
                        className="btn btn-primary btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropArea"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Áreas
                    </button>

                    <button
                        className="btn btn-primary btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropSubArea"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Nueva Sub-Área
                    </button>

                    <button
                        className="btn btn-success btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropControlDocs"
                        onClick={() => handleOpenModal('create')}
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Nuevo Control de Documentos
                    </button>

                </div>
            </KTCardBody>
        </KTCard>
    )
}

export default BotonesModales