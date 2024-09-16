import { KTIcon } from '@zeus/_zeus/helpers'
import './FichaUsuario.scss'

export function FichaUsuario() {
  return (
    <div
className="ficha-usuario w-100">
      <div
className="d-flex flex-column align-items-center w-100">
        <img
src="https://placeholder.co/200.png"
alt=""
className="rounded-circle border border-info border-4" />
        <p
className="fw-bold fs-1 mt-5 mb-2">Jhunior Chavez Cruz</p>
        <p
className="fw-bold fs-4 text-muted">Tecnologico medico de post procesamiento</p>
        <button
className="btn btn-outline btn-outline-info btn-active-light-info">
          <KTIcon
iconName="add-item"
iconType="duotone" />
          Organigrama
        </button>
      </div>

      <ul
className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-10 mb-5 fs-5">
        <li
className="nav-item">
          <a
            className="nav-link active btn-active-light-secondary"
            data-bs-toggle="tab"
            href="#kt_tab_pane_1"
          >
            Información laboral y personal
          </a>
        </li>

        <li
className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_2"
          >
            Historial de cursos
          </a>
        </li>

        <li
className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_3"
          >
            Historial de evaluación de desempeño
          </a>
        </li>

        <li
className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#kt_tab_pane_4"
          >
            Documentos informativos
          </a>
        </li>
      </ul>

      <div
className="tab-content"
id="myTabContent">
        <div
          className="tab-pane fade active show"
          id="kt_tab_pane_1"
          role="tabpanel"
        >
          Et et consectetur ipsum labore excepteur est proident excepteur
          ad velit occaecat qui minim occaecat veniam. Fugiat veniam
          incididunt anim aliqua enim pariatur veniam sunt est aute sit
          dolor anim. Velit non irure adipisicing aliqua ullamco irure
          incididunt irure non esse consectetur nostrud minim non minim
          occaecat. Amet duis do nisi duis veniam non est eiusmod tempor
          incididunt tempor dolor ipsum in qui sit.
        </div>
        <div
className="tab-pane fade"
id="kt_tab_pane_2"
role="tabpanel">
          Nulla est ullamco ut irure incididunt nulla Lorem Lorem minim
          irure officia enim reprehenderit. Magna duis labore cillum sint
          adipisicing exercitation ipsum. Nostrud ut anim non exercitation
          velit laboris fugiat cupidatat. Commodo esse dolore fugiat sint
          velit ullamco magna consequat voluptate minim amet aliquip ipsum
          aute laboris nisi. Labore labore veniam irure irure ipsum
          pariatur mollit magna in cupidatat dolore magna irure esse
          tempor ad mollit. Dolore commodo nulla minim amet ipsum officia
          consectetur amet ullamco voluptate nisi commodo ea sit eu.
        </div>
        <div
className="tab-pane fade"
id="kt_tab_pane_3"
role="tabpanel">
          Sint sit mollit irure quis est nostrud cillum consequat Lorem
          esse do quis dolor esse fugiat sunt do. Eu ex commodo veniam
          Lorem aliquip laborum occaecat qui Lorem esse mollit dolore anim
          cupidatat. eserunt officia id Lorem nostrud aute id commodo elit
          eiusmod enim irure amet eiusmod qui reprehenderit nostrud
          tempor. Fugiat ipsum excepteur in aliqua non et quis aliquip ad
          irure in labore cillum elit enim. Consequat aliquip incididunt
          ipsum et minim laborum laborum laborum et cillum labore.
          Deserunt adipisicing cillum id nulla minim nostrud labore
          eiusmod et amet.
        </div>
      </div>
    </div>
  )
}