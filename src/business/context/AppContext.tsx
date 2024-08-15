import React, { useContext, useEffect, useState } from 'react';

type AppContextFacadeResult = {
  isInitialized: boolean;
};
const useAppContextFacade = (): AppContextFacadeResult => {
  const [isInitialized, setIsInitialized] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    setIsInitialized(false);
  };

  return {
    isInitialized,
  };
};

const DefaultAppContextFacadeResult: AppContextFacadeResult = {
  isInitialized: true,
};

const AppContext = React.createContext<AppContextFacadeResult>(
  DefaultAppContextFacadeResult,
);

export const useAppContext = () => useContext(AppContext);
type Props = {
  children: React.ReactNode;
};
export const AppContextProvider = ({ children }: Props) => {
  const facade = useAppContextFacade();
  return <AppContext.Provider value={facade}>{children}</AppContext.Provider>;
};
