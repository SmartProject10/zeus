import React from 'react';

interface CheckboxSwitchProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	mode: string;
}

const CheckboxSwitch: React.FC<CheckboxSwitchProps> = ({ label, checked, onChange, mode }) => {
	return (
		<div className="col-6">
			<div className="form-check form-switch form-check-custom form-check-solid">
				<input
					className="form-check-input h-20px w-30px"
					type="checkbox"
					id="statusSwitch1"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					disabled={mode === "view"}
				/>
				<label className="form-label-sm ms-2" htmlFor="statusSwitch1">
					{checked ? "Si" : "No"}
				</label>
			</div>
		</div>
	);
};

export default CheckboxSwitch;
