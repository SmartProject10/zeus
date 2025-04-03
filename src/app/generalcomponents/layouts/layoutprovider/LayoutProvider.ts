import { ILayout,ILayoutCSSClasses,ILayoutHTMLAttributes,ILayoutCSSVariables } from "src/models/layoutprovider/model";

const LAYOUT_CONFIG_KEY = import.meta.env.VITE_APP_BASE_LAYOUT_CONFIG_KEY || 'LayoutConfig';

export const DefaultConfig: ILayout = {
    layoutType: 'light-sidebar',
    main: {
      componentName: 'main',
      type: 'default',
      pageBgWhite: false,
      iconType: 'duotone',
    },
    app: {
      general: {
        componentName: 'general',
        evolution: true,
        layoutType: 'default',
        mode: 'light',
        rtl: false,
        primaryColor: '#50CD89',
        pageBgWhite: false,
        pageWidth: 'default',
      },
      header: {
        componentName: 'header',
        display: true,
        default: {
          container: 'fluid',
          containerClass: 'd-flex align-items-stretch justify-content-between',
          fixed: {
            desktop: true,
            mobile: true,
          },
          content: 'menu',
          menu: {
            display: true,
            iconType: 'svg',
          },
        },
      },
      sidebar: {
        componentName: 'sidebar',
        display: true,
        default: {
          class: 'flex-column',
          push: {
            header: true,
            toolbar: true,
            footer: true,
          },
          drawer: {
            enabled: true,
            attributes: {
              'data-kt-drawer': 'true',
              'data-kt-drawer-name': 'app-sidebar',
              'data-kt-drawer-activate': '{default: true, lg: false}',
              'data-kt-drawer-overlay': 'true',
              'data-kt-drawer-width': '225px',
              'data-kt-drawer-direction': 'start',
              'data-kt-drawer-toggle': '#kt_app_sidebar_mobile_toggle',
            },
          },
          fixed: {
            desktop: true,
          },
          minimize: {
            desktop: {
              enabled: true,
              default: false,
              hoverable: true,
            },
          },
          menu: {
            iconType: 'svg',
          },
        },
      },
      toolbar: {
        componentName: 'toolbar',
        display: true,
        layout: 'classic',
        class: 'py-3 py-lg-6',
        container: 'fluid',
        containerClass: 'd-flex flex-stack',
        fixed: {
          desktop: false,
          mobile: false,
        },
        // custom settings,
        filterButton: false,
        daterangepickerButton: false,
        primaryButton: true,
        primaryButtonLabel: 'Create',
        primaryButtonModal: 'create-app',
      },
      pageTitle: {
        componentName: 'page-title',
        display: true,
        breadCrumb: true,
        description: false,
        direction: 'column',
      },
      content: {
        componentName: 'content',
        container: 'fluid',
      },
      footer: {
        componentName: 'footer',
        display: true,
        container: 'fluid',
        containerClass:
          'd-flex flex-column flex-md-row flex-center flex-md-stack py-3',
        fixed: {
          desktop: false,
          mobile: false,
        },
      },
      pageLoader: {
        componentName: 'page-loader',
        type: 'none',
        logoImage: 'default.svg',
        logoClass: 'mh-75px',
      },
    },
    illustrations: {
      componentName: 'illustrations',
      set: 'sketchy-1',
    },
    scrolltop: {
      componentName: 'scrolltop',
      display: true,
    },
    engage: {
      componentName: 'engage',
      demos: {
        enabled: true,
      },
      purchase: {
        enabled: false,
      },
    },
};

export const getLayoutFromLocalStorage = (): ILayout => {
    const ls = localStorage.getItem(LAYOUT_CONFIG_KEY);
    if (ls) {
      try {
        return JSON.parse(ls) as ILayout;
      } catch (er) {
        console.error(er);
      }
    }
    return DefaultConfig;
};

export const getEmptyCssClasses = (): ILayoutCSSClasses => {
    return {
      header: [],
      headerContainer: [],
      headerMobile: [],
      headerMenu: [],
      aside: [],
      asideMenu: [],
      asideToggle: [],
      toolbar: [],
      toolbarContainer: [],
      content: [],
      contentContainer: [],
      footerContainer: [],
      sidebar: [],
      pageTitle: [],
      pageContainer: [],
    };
};

export const getEmptyHTMLAttributes = () => {
    return {
      asideMenu: new Map(),
      headerMobile: new Map(),
      headerMenu: new Map(),
      headerContainer: new Map(),
      pageTitle: new Map(),
    };
};

export const getEmptyCSSVariables = () => {
    return {
      body: new Map(),
    };
};

export const setLayoutIntoLocalStorage = (config: ILayout) => {
    try {
        localStorage.setItem(LAYOUT_CONFIG_KEY, JSON.stringify(config));
    } catch (er) {
        console.error(er);
    }
};

export class LayoutSetup {
    public static isLoaded: boolean = false;
    public static config: ILayout = getLayoutFromLocalStorage();
    public static classes: ILayoutCSSClasses = getEmptyCssClasses();
    public static attributes: ILayoutHTMLAttributes = getEmptyHTMLAttributes();
    public static cssVariables: ILayoutCSSVariables = getEmptyCSSVariables();
  
    private static initCSSClasses(): void {
      LayoutSetup.classes = getEmptyCssClasses();
    }
  
    private static initHTMLAttributes(): void {
      LayoutSetup.attributes = Object.assign({}, getEmptyHTMLAttributes());
    }
  
    private static initCSSVariables(): void {
      LayoutSetup.cssVariables = getEmptyCSSVariables();
    }
  
    private static initConfig(config: ILayout): ILayout {
      let updatedConfig = LayoutSetup.initLayoutSettings(config);
      updatedConfig = LayoutSetup.initToolbarSetting(updatedConfig);
      return LayoutSetup.initWidthSettings(updatedConfig);
    }
  
    private static initLayoutSettings(config: ILayout): ILayout {
      const updatedConfig = { ...config };
      // clear body classes
      document.body.className = '';
      // clear body attributes
      const bodyAttributes = document.body
        .getAttributeNames()
        .filter((t) => t.indexOf('data-') > -1);
      bodyAttributes.forEach((attr) => document.body.removeAttribute(attr));
      document.body.setAttribute('style', '');
      document.body.setAttribute('id', 'kt_app_body');
      document.body.setAttribute('data-kt-app-layout', updatedConfig.layoutType);
      document.body.classList.add('app-default');
  
      const pageWidth = updatedConfig.app?.general?.pageWidth;
      if (
        updatedConfig.layoutType === 'light-header' ||
        updatedConfig.layoutType === 'dark-header'
      ) {
        if (pageWidth === 'default') {
          const header = updatedConfig.app?.header;
          if (header && header.default && header.default.container) {
            header.default.container = 'fixed';
          }
  
          const toolbar = updatedConfig.app?.toolbar;
          if (toolbar) {
            toolbar.container = 'fixed';
          }
  
          const content = updatedConfig.app?.content;
          if (content) {
            content.container = 'fixed';
          }
  
          const footer = updatedConfig.app?.footer;
          if (footer) {
            footer.container = 'fixed';
          }
  
          const updatedApp = {
            ...updatedConfig.app,
            ...header,
            ...toolbar,
            ...content,
            ...footer,
          };
          return { ...updatedConfig, app: updatedApp };
        }
      }
  
      LayoutSetup.initHeaderSettigs(updatedConfig);
  
      return updatedConfig;
    }
  
    private static initToolbarSetting(config: ILayout): ILayout {
      const updatedConfig = { ...config };
      const appHeaderDefaultContent = updatedConfig.app?.header?.default?.content;
      if (appHeaderDefaultContent === 'page-title') {
        const toolbar = updatedConfig.app?.toolbar;
        if (toolbar) {
          toolbar.display = false;
          const updatedApp = { ...updatedConfig.app, ...toolbar };
          return { ...updatedConfig, app: updatedApp };
        }
        return updatedConfig;
      }
  
      const pageTitle = updatedConfig.app?.pageTitle;
      if (pageTitle) {
        pageTitle.description = false;
        pageTitle.breadCrumb = true;
        const updatedApp = { ...updatedConfig.app, ...pageTitle };
        return { ...updatedConfig, app: updatedApp };
      }
  
      return updatedConfig;
    }
  
    private static initHeaderSettigs(config: ILayout) {
      const container = config.app?.header?.default?.container;
      if (container === 'fluid') {
        this.classes.headerContainer.push('container-fluid');
      } else {
        this.classes.headerContainer.push('container-xxl');
      }
    }
  
    private static initWidthSettings(config: ILayout): ILayout {
      const updatedConfig = { ...config };
      const pageWidth = updatedConfig.app?.general?.pageWidth;
      if (!pageWidth || pageWidth === 'default') {
        return config;
      }
  
      const header = updatedConfig.app?.header;
      if (header && header.default) {
        header.default.container = pageWidth;
      }
      const toolbar = updatedConfig.app?.toolbar;
      if (toolbar) {
        toolbar.container = pageWidth;
      }
      const content = updatedConfig.app?.content;
      if (content) {
        content.container = pageWidth;
      }
      const footer = updatedConfig.app?.footer;
      if (footer) {
        footer.container = pageWidth;
      }
      const updatedApp = {
        ...updatedConfig.app,
        ...header,
        ...toolbar,
        ...content,
        ...footer,
      };
      return { ...updatedConfig, app: updatedApp };
    }
  
    public static updatePartialConfig(fieldsToUpdate: Partial<ILayout>): ILayout {
      const config = LayoutSetup.config;
      const updatedConfig = { ...config, ...fieldsToUpdate };
      LayoutSetup.initCSSClasses();
      LayoutSetup.initCSSVariables();
      LayoutSetup.initHTMLAttributes();
      LayoutSetup.isLoaded = false;
      LayoutSetup.config = LayoutSetup.initConfig(
        Object.assign({}, updatedConfig)
      );
      LayoutSetup.isLoaded = true; // remove loading there
      return updatedConfig;
    }
  
    public static setConfig(config: ILayout): void {
      setLayoutIntoLocalStorage(config);
    }
  
    public static bootstrap = (() => {
      LayoutSetup.updatePartialConfig(LayoutSetup.config);
    })();
}