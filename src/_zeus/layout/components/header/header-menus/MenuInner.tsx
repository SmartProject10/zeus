import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";
import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MegaMenu } from "./MegaMenu";

export function MenuInner() {
  const intl = useIntl();
  return (
    <>
      {/*<MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Calendario' to='/human-resources/tools/calendar' />
      <MenuItem title='Bibioloteca' to='/human-resources/tools/library' />
      <MenuItem title='Reloj' to='/human-resources/tools/clock' />

      <MenuInnerWithSub
        isMega={true}
        title='Herramientas'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub>*/}
      <div className="dropdown">
        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Planear
        </a>

        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Evaluación Diagnostico</a></li>
          <li><a className="dropdown-item" href="#">Matriz de Riesgos</a></li>
          <li><a className="dropdown-item" href="#">Matriz Legal</a></li>
          <li><a className="dropdown-item" href="#">Objetivos SG-SST</a></li>
          <li><a className="dropdown-item" href="#">Plan Anual</a></li>
        </ul>
      </div>
      {/* <MenuItem title="Planear" to="/dashboard" /> */}
      <MenuItem title="Hacer" to="" />
      <MenuItem title="Verificar" to="" />
      <MenuItem title="Actuar" to="" />
      <MenuItem title="Parametrizacion SGSST" to="" />
      <MenuItem title="Reportes SST" to="" />
    </>
  );
}
