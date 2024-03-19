import {Brand, useBrandFacade} from '@src/business';
import React, {useContext, useEffect, useState,} from 'react';

export type DataContextResult = {
  brands: Brand[];
};

export const useDataContextFacade = (): DataContextResult => {
  const brandFacade = useBrandFacade();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async (): Promise<void> => {
      const brs: Brand[] = await brandFacade.getBrands();
      setBrands(brs);
  };


  return {
    brands,
  };
};

const DefaultDataContextResult: DataContextResult = {
  brands: [],
};

const DataContext = React.createContext<DataContextResult>(
  DefaultDataContextResult,
);

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({children}) => {
  const facade = useDataContextFacade();
  return <DataContext.Provider value={facade}>{children}</DataContext.Provider>;
};
