import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEmployee } from '../../../EmployeeContext';
import { useIntl } from 'react-intl';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .matches(/@gmail\.com$/, 'El email debe ser de Gmail')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('La contraseña es obligatoria'),
});

const initialValues = {
  email: '',
  password: '',
};

export function Login() {
  const navigate = useNavigate();
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const { login } = useEmployee();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const inicioDeSesionExitoso = await login(
          {
            email: values.email,
            password: values.password,
          }
        );
        if (inicioDeSesionExitoso) {
          // navigate('/company/acquisitions');  // Redirige después de un inicio de sesión exitoso
        } 
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form className="form w-100" onSubmit={formik.handleSubmit} noValidate id="kt_login_signin_form">
      {/* Encabezado */}
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">
          {intl.formatMessage({ id: 'AUTH.LOGIN.TITLE' })}
        </h1>
        <div className="text-gray-500 fw-semibold fs-6">
          {intl.formatMessage({ id: 'AUTH.LOGIN.SUBTITLE' })}
        </div>
      </div>

      {/* Mensaje de error global */}
      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* Campo Email */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">
          {intl.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
        </label>
        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className={clsx('form-control bg-transparent', {
            'is-invalid': formik.touched.email && formik.errors.email,
            'is-valid': formik.touched.email && !formik.errors.email,
          })}
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>

      {/* Campo Password */}
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          {intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
        </label>
        <input
          type="password"
          placeholder="Contraseña"
          {...formik.getFieldProps('password')}
          className={clsx('form-control bg-transparent', {
            'is-invalid': formik.touched.password && formik.errors.password,
            'is-valid': formik.touched.password && !formik.errors.password,
          })}
          autoComplete="off"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.password}</span>
          </div>
        )}
      </div>

      {/* Botón "Olvidaste tu contraseña?" */}
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />
        <Link to="/auth/forgot-password" className="link-primary">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {/* Botón de envío */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading ? (
            <span className="indicator-label">
              {intl.formatMessage({ id: 'AUTH.GENERAL.SUBMIT_BUTTON' })}
            </span>
          ) : (
            <span className="indicator-progress" style={{ display: 'block' }}>
              Cargando...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>

      {/* Enlace para registrarse */}
      <div className="text-gray-500 text-center fw-semibold fs-6">
        {intl.formatMessage({ id: 'AUTH.GENERAL.NO_ACCOUNT' })}{' '}
        <Link to="/auth/registration" className="link-primary">
          {intl.formatMessage({ id: 'AUTH.GENERAL.SIGNUP_BUTTON' })}
        </Link>
      </div>
    </form>
  );
}