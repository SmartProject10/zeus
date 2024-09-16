import { TitleBar } from '@zeus/@components/titleBar'
import { Link } from 'react-router-dom'

export function SelectCompanyDetail(): JSX.Element {
    return (
        <div
            className="container">
            <TitleBar
                label="Detalle de compañía" />

            <Link
                to="/home">
                <button
                    className="btn btn-secondary mt-4">
                    Ingresar a esta compañía
                </button>
            </Link>
        </div >
    )
}
