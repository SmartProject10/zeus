import { CompanyCard } from '../../../generalcomponents/components/companyCard'
import { KTIcon } from '../../../generalcomponents/helpers'
import { useEffect, useState } from 'react'
import './selectCompany.scss'
import { useEmployee } from '../../../EmployeeContext'
import _api_calls_employeeCompanyRegistry from '../../../../api/apicalls/_api_calls_employeeCompanyRegistry'
import { Company } from '../../../../models/apimodels/Company'

export function SelectCompany(): JSX.Element{
	const { employee } = useEmployee()
	const [employeeCompanies, setEmployeeCompanies] = useState<Array<Company>>([])

	useEffect(() => {
		//Obtenemos todos las compañías en las cuales trabaja el empleado logueado y las agregamos a "employeeCompanies"
		(async ()=>{
			const _employeeCompanies = await _api_calls_employeeCompanyRegistry.getCompaniesOfEmployee(employee.email);
			if(_employeeCompanies){
				setEmployeeCompanies(_employeeCompanies);
			}
		})();
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
					{employeeCompanies.map((employeeCompanie, index) => (
						<CompanyCard
							key={index}
							ruc={employeeCompanie.ruc}
							socialReason={employeeCompanie.socialReason} />
					))}
				</div>
			</div>
		</div>
	)
}
