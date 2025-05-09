import { KTIcon } from '@zeus/app/_zeus/helpers'
import './FichaUsuario.scss'

import { CourseHistory } from './coursehistory/course-history'
import { PersonalInformation } from './personal-information'
import { PerformanceEvaluation } from './performanceevaluation/performance-evaluation'

export function FichaUsuario() {
  return (
    <div className="ficha-usuario w-100">
      <div className="d-flex flex-column align-items-center w-100">
        <img 
					src="https://placeholder.co/200.png"
					alt=""
					className="rounded-circle border border-info border-4" 
				/>

        <p className="fw-bold fs-1 mt-5 mb-2">Jhunior Chavez Cruz</p>
        <p className="fw-bold fs-4 text-muted">Tecnologico medico de post procesamiento</p>

        <button
					className="btn btn-outline btn-outline-info btn-active-light-info">
          <KTIcon
						iconName="add-item"
						iconType="duotone" 
					/>
          Organigrama
        </button>
      </div>

      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
        <li className="nav-item">
          <a
            className="nav-link active btn-active-light-secondary"
            data-bs-toggle="tab"
            href="#kt_tab_pane_1"
          >
            Información laboral y personal
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_2"
          >
            Historial de cursos
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_3"
          >
            Historial de evaluación de desempeño
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_4"
          >
            Documentos informativos
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade active show"
          id="kt_tab_pane_1"
          role="tabpanel"
        >
					<PersonalInformation />
				</div>
        <div
					className="tab-pane fade"
					id="kt_tab_pane_2"
					role="tabpanel"
				>
					<CourseHistory />
				</div>
        <div
					className="tab-pane fade"
					id="kt_tab_pane_3"
					role="tabpanel"
				>
					<PerformanceEvaluation />
				</div>
        <div
					className="tab-pane fade"
					id="kt_tab_pane_4"
					role="tabpanel"
				>
					<h2>Documentos informativos</h2>
				</div>
      </div>
    </div>
  )
}
