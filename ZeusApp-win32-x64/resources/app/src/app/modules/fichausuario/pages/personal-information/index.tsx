import { useState } from "react";
import { EmploymentDataSection } from "./sections/employment-data";
import { PersonalDataSection } from "./sections/personal-data";
import { ContactDetailsSection } from "./sections/contact-details";
import { FamilyDataSection } from "./sections/family-data";
import { AcademicDataSection } from "./sections/academic-data";
import { ExternalTrainingSection } from "./sections/external-training";
import { LanguagesSection } from "./sections/languages-section";
import { BundleSection } from "./sections/bundles";

export function PersonalInformation() {
	const [activeSection, setActiveSection] = useState<string>("personal-data");

	const renderSection = () => {
		switch (activeSection) {
			case "personal-data":
				return <PersonalDataSection />;
			case "employment-data":
				return <EmploymentDataSection />;
			case "family-data":
				return <FamilyDataSection />;
			case "contact-details":
				return <ContactDetailsSection />;
			case "academic-data":
				return <AcademicDataSection />;
			case "external-training":
				return <ExternalTrainingSection />;
			case "languages":
				return <LanguagesSection />;
			case "bundles":
				return <BundleSection />;
			default:
				return null;
		}
	};

	return (
		<div className="row">
			<div className="col-sm-12 col-lg-3">
				<div className="position-sticky top-8">
					<ul className="list-group list-group-flush">
						<li
							className="list-group-item"
							onClick={() => setActiveSection("personal-data")}
						>
							<a href="#personal-data">Datos personales</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("employment-data")}
						>
							<a href="#employment-data">Datos laborales</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("family-data")}
						>
							<a href="#family-data">Datos familiares</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("contact-details")}
						>
							<a href="#contact-details">Datos de contacto</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("academic-data")}
						>
							<a href="#academic-data">Datos académicos</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("external-training")}
						>
							<a href="#external-training">Capacitaciones externas</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("languages")}
						>
							<a href="#languages">Idiomas</a>
						</li>
						<li
							className="list-group-item"
							onClick={() => setActiveSection("bundles")}
						>
							<a href="#bundles">Legajos</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="col-sm-12 col-lg-9">{renderSection()}</div>
		</div>
	);
}
