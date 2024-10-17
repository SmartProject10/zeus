
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx'
import { useIntl } from 'react-intl'
import { backyService } from '@zeus/@services/api'
//import Cookie from 'js-cookie'

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Wrong email format')
		.min(3, 'Minimum 3 symbols')
		.max(50, 'Maximum 50 symbols')
		.required('Email is required'),
	password: Yup.string()
		.min(3, 'Minimum 3 symbols')
		.max(50, 'Maximum 50 symbols')
		.required('Password is required'),
})

const initialValues = {
	email: '',
	password: '',
}

/*
	Formik+YUP+Typescript:
	https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
	https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {

	const intl = useIntl()
	const [loading, setLoading] = useState(false)
	const { saveAuth, setCurrentUser } = useAuth()

	const formik = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: async (values, { setStatus, setSubmitting }) => {
			setLoading(true)
			try {
				const { data: auth } = await backyService.auth.login(values.email, values.password)
				saveAuth(auth)
				const { data: user } = await backyService.auth.verifyToken()
				setCurrentUser(user)
				//
				console.log(auth)
				/*
								const cookies = Cookies.get()
				
								if (cookies.token) {
									console.log(cookies.token)
								}
				*/
				//sconsole.log(values)
			} catch (error) {
				console.error(error)
				saveAuth(undefined)
				setStatus('The login details are incorrect. Error Details: ' + error.response.data.message)
				setSubmitting(false)
				setLoading(false)
			}
		},
	})

	return (
		<form
			className="form w-100"
			onSubmit={formik.handleSubmit}
			noValidate
			id="kt_login_signin_form"
		>
			{/* begin::Heading */}
			<div
				className="text-center mb-11">
				<h1
					className="text-gray-900 fw-bolder mb-3">{intl.formatMessage({ id: 'AUTH.LOGIN.TITLE' })}</h1>
				<div
					className="text-gray-500 fw-semibold fs-6">{intl.formatMessage({ id: 'AUTH.LOGIN.SUBTITLE' })}</div>
			</div>
			{/* begin::Heading */}

			{formik.status ? (
				<div
					className="mb-lg-15 alert alert-danger">
					<div
						className="alert-text font-weight-bold">{formik.status}</div>
				</div>
			) : ''}

			{/* begin::Form group */}
			<div
				className="fv-row mb-8">
				<label
					className="form-label fs-6 fw-bolder text-gray-900">{intl.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}</label>
				<input
					placeholder="Email"
					{...formik.getFieldProps('email')}
					className={clsx(
						'form-control bg-transparent',
						{ 'is-invalid': formik.touched.email && formik.errors.email },
						{
							'is-valid': formik.touched.email && !formik.errors.email,
						},
					)}
					type="email"
					name="email"
					autoComplete="off"
				/>
				{formik.touched.email && formik.errors.email && (
					<div
						className="fv-plugins-message-container">
						<span
							role="alert">{formik.errors.email}</span>
					</div>
				)}
			</div>
			{/* end::Form group */}

			{/* begin::Form group */}
			<div
				className="fv-row mb-3">
				<label
					className="form-label fw-bolder text-gray-900 fs-6 mb-0">{intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}</label>
				<input
					type="password"
					autoComplete="off"
					{...formik.getFieldProps('password')}
					className={clsx(
						'form-control bg-transparent',
						{
							'is-invalid': formik.touched.password && formik.errors.password,
						},
						{
							'is-valid': formik.touched.password && !formik.errors.password,
						},
					)}
				/>
				{formik.touched.password && formik.errors.password && (
					<div
						className="fv-plugins-message-container">
						<div
							className="fv-help-block">
							<span
								role="alert">{formik.errors.password}</span>
						</div>
					</div>
				)}
			</div>
			{/* end::Form group */}

			{/* begin::Wrapper */}
			<div
				className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
				<div />

				{/* begin::Link */}
				<Link
					to="/auth/forgot-password"
					className="link-primary">
					Forgot Password ?
				</Link>
				{/* end::Link */}
			</div>
			{/* end::Wrapper */}

			{/* begin::Action */}
			<div
				className="d-grid mb-10">
				<button
					type="submit"
					id="kt_sign_in_submit"
					className="btn btn-primary"
					disabled={formik.isSubmitting || !formik.isValid}
				>
					{!loading && <span
						className="indicator-label">{intl.formatMessage({ id: 'AUTH.GENERAL.SUBMIT_BUTTON' })}</span>}
					{loading && (
						<span
							className="indicator-progress"
							style={{ display: 'block' }}>
							Please wait...
							<span
								className="spinner-border spinner-border-sm align-middle ms-2"></span>
						</span>
					)}
				</button>
			</div>
			{/* end::Action */}

			<div
				className="text-gray-500 text-center fw-semibold fs-6">
				{intl.formatMessage({ id: 'AUTH.GENERAL.NO_ACCOUNT' })}{' '}
				<Link
					to="/auth/registration"
					className="link-primary">
					{intl.formatMessage({ id: 'AUTH.GENERAL.SIGNUP_BUTTON' })}
				</Link>
			</div>

		</form>
	)
}
