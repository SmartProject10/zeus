import { EmploymentDataSection } from './sections/employment-data'
import { PersonalDataSection } from './sections/personal-data'
import { ContactDetailsSection } from './sections/contact-details'
import { FamilyDataSection } from './sections/family-data'
import { AcademicDataSection } from './sections/academic-data'
import { ExternalTrainingSection } from './sections/external-training'
import { LanguagesSection } from './sections/languages-section'
import { BundleSection } from './sections/bundles'

export function PersonalInformation () {
	return (
		<div className="row">
			<div className="col-sm-12 col-lg-3">
				<div className="position-sticky top-8">
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<a href="#personal-data">Datos personales</a>
						</li>
						<li className="list-group-item">
							<a href="#employment-data">Datos laborales</a>
						</li>
						<li className="list-group-item">
							<a href="#family-data">Datos familiares</a>
						</li>
						<li className="list-group-item">
							<a href="#contact-details">Datos de contacto</a>
						</li>
						<li className="list-group-item">
							<a href="#academic-data">Datos académicos</a>
						</li>
						<li className="list-group-item">
							<a href="#external-training">Capacitaciones externas</a>
						</li>
						<li className="list-group-item">
							<a href="#languages">Idiomas</a>
						</li>
						<li className="list-group-item">
							<a href="#bundles">Legajos</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-sm-12 col-lg-9">
				<PersonalDataSection />
				<EmploymentDataSection />
				<FamilyDataSection />
				<ContactDetailsSection />
				<AcademicDataSection />
				<ExternalTrainingSection />
				<LanguagesSection />
				<BundleSection />
			</div>
		</div>
	)
}
