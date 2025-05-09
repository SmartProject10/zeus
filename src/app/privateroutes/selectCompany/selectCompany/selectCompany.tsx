import { CompanyCard } from '@zeus/app/@components/companyCard'
import { backyService } from '@zeus/app/@services/api'
import { KTIcon } from '@zeus/app/_zeus/helpers'
import { useEffect, useState } from 'react'
import './selectCompany.scss'
import { useEmployee } from '@zeus/app/EmployeeContext'

export function SelectCompany(): JSX.Element{
	const { employee } = useEmployee()
	const [companies, setCompanies] = useState<Array<{ id: string; companyName: string; details: string }>>([])

	useEffect(() => {
		backyService.companies.getCompanies().then((response) => {
			setCompanies(response.data)
		})
	}, [])

	return (
		<div
			className="select-company">
			<div
				className="container">
				<div
					className="welcome d-flex flex-row align-items-center gap-4 mb-4">
					<KTIcon
						iconName="user"
						className="user-icon" />

					<p
						className="fs-1 fw-bold m-0">
						Bienvenido, 	{employee.name}
					</p>
				</div>

				<p
					className="fs-3 fw-bold">Listado de compañias</p>

				<div
					className="company-grid">
					{companies.map((company, index) => (
						<CompanyCard
							key={index}
							companyName={company.companyName}
							companyDetails={company.details}
							companyId={company.id} />
					))}
				</div>
			</div>
		</div>
	)
}
