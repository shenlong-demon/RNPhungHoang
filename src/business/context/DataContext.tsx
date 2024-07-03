import {Brand, Group, useDataFacade} from '@src/business';
import React, {useContext, useEffect, useState} from 'react';

export type DataContextResult = {
  brands: Brand[];
  groups: Group[];
};

export const useDataContextFacade = (): DataContextResult => {
  const dataFacade = useDataFacade();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    loadBrands();
    loadGroups();
  }, []);

  const loadBrands = async (): Promise<void> => {
    const brs: Brand[] = await dataFacade.getBrands();
    setBrands(brs);
  };
  const loadGroups = async (): Promise<void> => {
    const grs: Group[] = await dataFacade.getGroups();
    setGroups(grs);
  };

  return {
    brands,
    groups,
  };
};

const DefaultDataContextResult: DataContextResult = {
  brands: [],
  groups: [],
};

const DataContext = React.createContext<DataContextResult>(
  DefaultDataContextResult,
);

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({children}) => {
  const facade = useDataContextFacade();
  return <DataContext.Provider value={facade}>{children}</DataContext.Provider>;
};
