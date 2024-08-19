import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />

      <SidebarMenuItemWithSub to="" icon="bookmark" title="ISO 45001" fontIcon="">
        <SidebarMenuItem
          to="/apps/user-management/users"
          icon="people"
          title="Gestion de usuarios"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem
          to=""
          icon="bank"
          title="Gestion de empresas"
          fontIcon="bi-layers"
        />

        <SidebarMenuItemWithSub
          to="/crafted/pages"
          title="Recursos humanos"
          fontIcon="bi-archive"
          icon="people"
        >
          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Empleados"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Gestión de empleados"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="people"
              title="Gestión de empleados externos"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Permisos y Roles"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="delivery-time"
              title="Historial Laboral"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Reclutamiento y selección"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Vacantes"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Gestion de candidatos"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Archivo de candidatos"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="delivery-time"
              title="Proceso de seleccion"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="category"
              title="Documentacion de contratacion"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Desempeño"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Evaluaciones de desempeño"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Objetivos y metas"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Retroalimentacion y revisiones"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Formacion y Desarrollo"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Programas de formación"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Historial de capacitaciones"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Evaluación de competenciass"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Nomina y Beneficios"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Gestión de nómina"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Beneficios para empleados"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Deducciones y bonificaciones"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Ausencias y Tiempo"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Solicitud de vacaciones y permisos"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Seguimiento de ausencias"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Reloj de tiempo en la nube"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Calendario laboral"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItemWithSub
            to="/crafted/pages"
            title="Reportes y Análisis"
            fontIcon="bi-archive"
            icon="people"
          >
            <SidebarMenuItem
              to=""
              icon="people"
              title="Reportes personalizables"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Análisis de datos de RRHH"
              fontIcon="bi-layers"
            />
            <SidebarMenuItem
              to=""
              icon="profile-circle"
              title="Métricas de rendimiento"
              fontIcon="bi-layers"
            />
          </SidebarMenuItemWithSub>

          <SidebarMenuItem
            to=""
            icon="graph-3"
            title="Terminacion de relacion laboral"
            fontIcon="bi-layers"
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItem
          to=""
          icon="profile-circle"
          title="Gestión de Documentos"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem
          to=""
          icon="profile-circle"
          title="Proveedores y Contratos"
          fontIcon="bi-layers"
        />

        <SidebarMenuItemWithSub
          to="/crafted/pages"
          title="Gestión de Calidad"
          fontIcon="bi-archive"
          icon="people"
        >
          <SidebarMenuItem
            to=""
            icon="people"
            title="Planificación de la calidad"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Auditorías"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="No conformidades"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Mejora continua"
            fontIcon="bi-layers"
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages"
          title="Seguridad y Salud en el Trabajo"
          fontIcon="bi-archive"
          icon="people"
        >
          <SidebarMenuItem
            to=""
            icon="people"
            title="Gestión de riesgos laborales"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Capacitación en seguridad"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Incidentes y accidentes"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Normativas de seguridad"
            fontIcon="bi-layers"
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages"
          title="Gestión Antisoborno"
          fontIcon="bi-archive"
          icon="people"
        >
          <SidebarMenuItem
            to=""
            icon="people"
            title="Evaluación de riesgos de soborno"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Políticas anticorrupción"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Auditorías anticorrupción"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Incidentes de soborno"
            fontIcon="bi-layers"
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages"
          title="Gestion Ambiental"
          fontIcon="bi-archive"
          icon="people"
        >
          <SidebarMenuItem
            to=""
            icon="people"
            title="Evaluación de impactos ambientales"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Control de aspectos ambientales"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Gestión de residuos"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Normativas ambientales"
            fontIcon="bi-layers"
          />
        </SidebarMenuItemWithSub>
        <SidebarMenuItemWithSub
          to="/crafted/pages"
          title="Auditorias"
          fontIcon="bi-archive"
          icon="people"
        >
          <SidebarMenuItem
            to=""
            icon="people"
            title="Programar nueva auditoria"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Prueba de auditorias"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Ejecucion de auditorias"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="No Conformidades"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to=""
            icon="profile-circle"
            title="Reportes y Análisis"
            fontIcon="bi-layers"
          />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to="" icon="bookmark" title="ISO 9001" fontIcon=""></SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to="" icon="bookmark" title="SG RRHH" fontIcon="">
    
      <SidebarMenuItem to="" icon="star" title="Registro Trabajadores" fontIcon=""/>

      </SidebarMenuItemWithSub>
     
    </>
  );
};

export { SidebarMenuMain };
