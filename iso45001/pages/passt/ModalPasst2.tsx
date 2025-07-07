import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";

const passtSchema = Yup.object().shape({
	sede: Yup.string().required("Sede requerida"),
	anio: Yup.string().required("Año requerido"),
});

const initialValues = {
	sede: "",
	anio: "",
};

const ModalPasst2: React.FC = () => {
	const { handleSubmit, getFieldProps, touched, errors } = useFormik({
		initialValues,
		validationSchema: passtSchema,
		onSubmit: (values) => {
			console.log("Form submitted:", values);
		},
	});

	return (
		<div
			className="modal fade"
			id="staticBackdrop2"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-scrollable modal-lg">
				<form onSubmit={handleSubmit} className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title" id="staticBackdropLabel">
							Formulario
						</h1>
						<button
							type="button"
							id="closeButton"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<div className="row gy-4">
							<div className="col-sm-6">
								<label htmlFor="sede" className="required form-label">
									Sede
								</label>
								<select
									className={clsx(
										"form-control",
										{ "is-invalid": touched.sede && errors.sede },
										{ "is-valid": touched.sede && !errors.sede }
									)}
									id="sede"
									{...getFieldProps("sede")}
									required
								>
									<option value="" disabled>
										Seleccione una sede
									</option>
									<option value="sede1">Sede 1</option>
									<option value="sede2">Sede 2</option>
									<option value="sede3">Sede 3</option>
								</select>
								{touched.sede && errors.sede && (
									<div className="text-danger small">
										<span role="alert">{errors.sede}</span>
									</div>
								)}
							</div>
							<div className="col-sm-6">
								<label htmlFor="anio" className="required form-label">
									Año
								</label>
								<select
									className={clsx(
										"form-control",
										{ "is-invalid": touched.anio && errors.anio },
										{ "is-valid": touched.anio && !errors.anio }
									)}
									id="anio"
									{...getFieldProps("anio")}
									required
								>
									<option value="" disabled>
										Seleccione un año
									</option>
									{Array.from({ length: 31 }, (_, i) => (
										<option key={2000 + i} value={2000 + i}>
											{2000 + i}
										</option>
									))}
								</select>
								{touched.anio && errors.anio && (
									<div className="text-danger small">
										<span role="alert">{errors.anio}</span>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							id="closeButton"
							data-bs-dismiss="modal"
						>
							Cerrar
						</button>
						<button type="submit" className="btn btn-success">
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalPasst2;
