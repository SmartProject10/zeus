/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {FC,createContext,useContext,useState,useEffect,ReactNode} from 'react';
import {ILayout,LayoutType,ToolbarType,PageDataContextModel,PageLink,LayoutContextModel} from '@zeus/models/layoutprovider/model';
import { DefaultConfig,getEmptyCssClasses,getEmptyHTMLAttributes,getEmptyCSSVariables,LayoutSetup,setLayoutIntoLocalStorage } from '@zeus/app/generalcomponents/layouts/layoutprovider/LayoutProvider';

interface WithChildren {
  children: ReactNode;
}

// PageDataContext

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
});

const PageDataProvider: FC<WithChildren> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageDescription, setPageDescription] = useState<string>('');
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([]);

  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
  };
  return (
    <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
  );
};

function usePageData() {
  return useContext(PageDataContext);
}

type Props = {
  description?: string;
  breadcrumbs?: Array<PageLink>;
};

const PageTitle: FC<Props & WithChildren> = ({children,description,breadcrumbs,}) => {
  const { setPageTitle, setPageDescription, setPageBreadcrumbs } = usePageData();

  useEffect(() => {
    if (children) {
      setPageTitle(children.toString());
    }
    return () => {
      setPageTitle('');
    };
  }, [children]);

  useEffect(() => {
    if (description) {
      setPageDescription(description);
    }
    return () => {
      setPageDescription('');
    };
  }, [description]);

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs);
    }
    return () => {
      setPageBreadcrumbs([]);
    };
  }, [breadcrumbs]);

  return <></>;
};

const PageDescription: FC<WithChildren> = ({ children }) => {
  const { setPageDescription } = usePageData();
  useEffect(() => {
      if (children) {
        setPageDescription(children.toString());
      }
      return () => {
        setPageDescription('');
      };
    }, [children]);
    return <></>;
};

// LayoutContext

const LayoutContext = createContext<LayoutContextModel>({
  config: DefaultConfig,
  classes: getEmptyCssClasses(),
  attributes: getEmptyHTMLAttributes(),
  cssVariables: getEmptyCSSVariables(),
  setLayout: (_config: LayoutSetup) => {},
  setLayoutType: (_layoutType: LayoutType) => {},
  setToolbarType: (_toolbarType: ToolbarType) => {},
});

const enableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'flex');
  }
};

const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none');
  }
};

// LayoutProvider

const LayoutProvider: FC<WithChildren> = ({ children }) => {
  const [config, setConfig] = useState(LayoutSetup.config);
  const [classes, setClasses] = useState(LayoutSetup.classes);
  const [attributes, setAttributes] = useState(LayoutSetup.attributes);
  const [cssVariables, setCSSVariables] = useState(LayoutSetup.cssVariables);

  const setLayout = (_themeConfig: Partial<ILayout>) => {
    enableSplashScreen();
    const bodyClasses = Array.from(document.body.classList);
    bodyClasses.forEach((cl) => document.body.classList.remove(cl));
    const updatedConfig = LayoutSetup.updatePartialConfig(_themeConfig);
    setConfig(Object.assign({}, updatedConfig));
    setClasses(LayoutSetup.classes);
    setAttributes(LayoutSetup.attributes);
    setCSSVariables(LayoutSetup.cssVariables);
    setTimeout(() => {
      disableSplashScreen();
    }, 500);
  };

  const setToolbarType = (toolbarType: ToolbarType) => {
    const updatedConfig = { ...config };
    if (updatedConfig.app?.toolbar) {
      updatedConfig.app.toolbar.layout = toolbarType;
    }

    setLayoutIntoLocalStorage(updatedConfig);
      window.location.reload();
  };

  const setLayoutType = (layoutType: LayoutType) => {
      const updatedLayout = { ...config, layoutType };
      setLayoutIntoLocalStorage(updatedLayout);
      window.location.reload();
  };

  const value: LayoutContextModel = {
    config,
    classes,
    attributes,
    cssVariables,
    setLayout,
    setLayoutType,
    setToolbarType,
  };

  useEffect(() => {
    disableSplashScreen();
  }, []);

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export {
  LayoutProvider,
  PageTitle,
  PageDataProvider,
  usePageData,
  PageDescription
};

export function useLayout() {
  return useContext(LayoutContext);
}
  