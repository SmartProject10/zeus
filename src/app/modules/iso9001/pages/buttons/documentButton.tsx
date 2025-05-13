import React, { useState } from 'react';

interface DocumentButtonProps {
    onOpen: () => void;
}

const DocumentButton: React.FC<DocumentButtonProps> = ({ onOpen }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="position-relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button
                className="btn btn-primary btn-sm"
                onClick={onOpen}
            >
                <i className="bi bi-file-earmark-text"></i> Nuevo Documento
            </button>

            {showTooltip && (
                <div
                    className="position-absolute bg-dark text-white p-2 rounded"
                    style={{
                        zIndex: 100,
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: '5px',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Registrar un nuevo documento
                </div>
            )}
        </div>
    );
};

export default DocumentButton;
