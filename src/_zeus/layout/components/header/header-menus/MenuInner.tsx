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
      <MenuItem title="Planear" to="/dashboard" />
      <MenuItem title="Hacer" to="" />
      <MenuItem title="Verificar" to="" />
      <MenuItem title="Actuar" to="" />
      <MenuItem title="Parametrizacion SGSST" to="" />
      <MenuItem title="Reportes SST" to="" />
    </>
  );
}
