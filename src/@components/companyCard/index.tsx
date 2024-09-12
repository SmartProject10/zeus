import { memo } from 'react';
import './index.scss'

interface CompanyCardProps {
    companyName: string
    companyDetails: string
}

export const CompanyCard = memo(
    (props: CompanyCardProps) => {
        const { companyName, companyDetails } = props

        return (
            <div className="company-card d-flex flex-column w-100">
                <div className="card w-100 overflow-hidden">
                    <img className='w-100 h-100' src="https://picsum.photos/200/300" alt="" loading='lazy' />
                </div>

                <p className="name fw-bold fs-5 mb-0 mt-4">{companyName}</p>
                <p className="details fs-7">{companyDetails}</p>

                <button className='btn btn-info btn-sm w-100 position-relative'>
                    Ingresar
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </button>
            </div>
        );
    },
    (prevProps, nextProps) =>
        prevProps.companyName === nextProps.companyName &&
        prevProps.companyDetails === nextProps.companyDetails
)

CompanyCard.displayName = 'CompanyCard'
