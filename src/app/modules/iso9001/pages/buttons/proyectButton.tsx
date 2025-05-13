import React, { useState } from 'react';

interface ProyectButtonProps {
    onOpen: () => void;
}

const ProyectButton: React.FC<ProyectButtonProps> = ({ onOpen }) => {
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
                <i className="bi bi-folder-plus"></i> Nuevo Proyecto
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
                    Registrar un nuevo proyecto
                </div>
            )}
        </div>
    );
};

export default ProyectButton;