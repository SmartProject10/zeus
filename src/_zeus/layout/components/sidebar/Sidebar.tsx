import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ILayout, useLayout } from '../../core';
import { SidebarMenu } from './sidebar-menu/SidebarMenu';
import { SidebarFooter } from './SidebarFooter';
import { SidebarLogo } from './SidebarLogo';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { config } = useLayout();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const rute = window.location.pathname;
  const [menuKey, setMenuKey] = useState(0);

  useEffect(() => {
    updateDOM(config);
  }, [config]);

  if (!config.app?.sidebar?.display) {
    return null;
  }

  const reloadMenu = () => {
    //(se cambia el valor del key del componente SidebarMenu para que se vuelva a instanciar cuando se clickea en el texto del iso para que los menus del sidebar con submenus vuelvan a aparecer cerrados en la vista de la iso)
    setMenuKey(prevKey => prevKey + 1);
  };

  return (
    <>
      {(config.layoutType === 'dark-sidebar' || config.layoutType === 'light-sidebar') && (
        <div
          ref={sidebarRef}
          id='kt_app_sidebar'
          className={clsx('app-sidebar', config.app?.sidebar?.default?.class)}
        >
          {rute.startsWith("/iso") ? (
            <Link
              to={`/${rute.split("/")[1]}`}
              style={{
                textAlign: 'center',
                fontSize: '25px',
                fontFamily: 'Arial Rounded MT Bold, sans-serif',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onClick={reloadMenu}
            >
              {rute.split("/")[1].replace("iso", "iso ")}
            </Link>
          ) : (
            <SidebarLogo sidebarRef={sidebarRef} />
          )}
          <SidebarMenu key={menuKey} />
          <SidebarFooter />
        </div>
      )}
    </>
  );
};

const updateDOM = (config: ILayout) => {
  if (config.layoutType === 'dark-sidebar' || config.layoutType === 'light-sidebar') {
    if (config.app?.sidebar?.default?.minimize?.desktop?.enabled) {
      if (config.app?.sidebar?.default?.minimize?.desktop?.default) {
        document.body.setAttribute('data-kt-app-sidebar-minimize', 'on')
      }

      if (config.app?.sidebar?.default?.minimize?.desktop?.hoverable) {
        document.body.setAttribute('data-kt-app-sidebar-hoverable', 'true')
      }
    }

    if (config.app?.sidebar?.default?.minimize?.mobile?.enabled) {
      if (config.app?.sidebar?.default?.minimize?.mobile?.default) {
        document.body.setAttribute('data-kt-app-sidebar-minimize-mobile', 'on')
      }

      if (config.app?.sidebar?.default?.minimize?.mobile?.hoverable) {
        document.body.setAttribute('data-kt-app-sidebar-hoverable-mobile', 'true')
      }
    }

    if (config.app?.sidebar?.default?.collapse?.desktop?.enabled) {
      if (config.app?.sidebar?.default?.collapse?.desktop?.default) {
        document.body.setAttribute('data-kt-app-sidebar-collapse', 'on')
      }
    }

    if (config.app?.sidebar?.default?.collapse?.mobile?.enabled) {
      if (config.app?.sidebar?.default?.collapse?.mobile?.default) {
        document.body.setAttribute('data-kt-app-sidebar-collapse-mobile', 'on')
      }
    }

    if (config.app?.sidebar?.default?.push) {
      if (config.app?.sidebar?.default?.push?.header) {
        document.body.setAttribute('data-kt-app-sidebar-push-header', 'true')
      }

      if (config.app?.sidebar?.default?.push?.toolbar) {
        document.body.setAttribute('data-kt-app-sidebar-push-toolbar', 'true')
      }

      if (config.app?.sidebar?.default?.push?.footer) {
        document.body.setAttribute('data-kt-app-sidebar-push-footer', 'true')
      }
    }

    if (config.app?.sidebar?.default?.stacked) {
      document.body.setAttribute('app-sidebar-stacked', 'true')
    }

    document.body.setAttribute('data-kt-app-sidebar-enabled', 'true')
    document.body.setAttribute(
      'data-kt-app-sidebar-fixed',
      config.app?.sidebar?.default?.fixed?.desktop?.toString() || ''
    )

    const appSidebarDefaultDrawerEnabled = config.app?.sidebar?.default?.drawer?.enabled
    let appSidebarDefaultDrawerAttributes: { [attrName: string]: string } = {}
    if (appSidebarDefaultDrawerEnabled) {
      appSidebarDefaultDrawerAttributes = config.app?.sidebar?.default?.drawer?.attributes as {
        [attrName: string]: string
      }
    }

    const appSidebarDefaultStickyEnabled = config.app?.sidebar?.default?.sticky?.enabled
    let appSidebarDefaultStickyAttributes: { [attrName: string]: string } = {}
    if (appSidebarDefaultStickyEnabled) {
      appSidebarDefaultStickyAttributes = config.app?.sidebar?.default?.sticky?.attributes as {
        [attrName: string]: string
      }
    }

    setTimeout(() => {
      const sidebarElement = document.getElementById('kt_app_sidebar')
      // sidebar
      if (sidebarElement) {
        const sidebarAttributes = sidebarElement
          .getAttributeNames()
          .filter((t) => t.indexOf('data-') > -1)
        sidebarAttributes.forEach((attr) => sidebarElement.removeAttribute(attr))

        if (appSidebarDefaultDrawerEnabled) {
          for (const key in appSidebarDefaultDrawerAttributes) {
            if (appSidebarDefaultDrawerAttributes.hasOwnProperty(key)) {
              sidebarElement.setAttribute(key, appSidebarDefaultDrawerAttributes[key])
            }
          }
        }

        if (appSidebarDefaultStickyEnabled) {
          for (const key in appSidebarDefaultStickyAttributes) {
            if (appSidebarDefaultStickyAttributes.hasOwnProperty(key)) {
              sidebarElement.setAttribute(key, appSidebarDefaultStickyAttributes[key])
            }
          }
        }
      }
    }, 0)
  }
}

export { Sidebar }
