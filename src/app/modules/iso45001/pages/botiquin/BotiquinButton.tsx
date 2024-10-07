import React from 'react'

function BotiquinButton() {
    return (
        <div
            className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
            <button
                className="btn btn-primary btn-sm"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <i
                    className="bi bi-plus-circle-fill"></i>
                Nuevo botiquin
            </button>
        </div>
    )
}

export default BotiquinButton