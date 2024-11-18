// ConditionalFields.tsx
import React from 'react';
import './InspectionEmergencyStyle.scss';

interface ConditionalFieldsProps {
    visible: boolean;
    children: React.ReactNode;
}

const ConditionalFields: React.FC<ConditionalFieldsProps> = ({ visible, children }) => {
    if (!visible) return null;
    return <div className="conditional-fields">{children}</div>;
};

export default ConditionalFields;
