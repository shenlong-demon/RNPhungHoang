import {
  Brand,
  DataResult,
  Group,
  Product,
  useDataFacade,
  useProductFacade,
} from '@src/business';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Dto} from '@core/common';

export type DataContextResult = {
  brands: Brand[];
  groups: Group[];

  products: Product[];
};

export const useDataContextFacade = (): DataContextResult => {
  const dataFacade = useDataFacade();
  const productFacade = useProductFacade();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    reloadAllData();
  }, []);

  const loadCommonData = async (): Promise<void> => {
    const data: DataResult | null = await dataFacade.getAllData();
    if (!!data) {
      setGroups(data.groups);
      setBrands(data.brands);
    }
  };
  const getAllProducts = async (): Promise<void> => {
    const dto: Dto<Product[]> = await productFacade.getAllActiveProducts();
    if (dto.next()) {
      setProducts(dto.data as Product[]);
    }
  };

  const reloadAllData = async (): Promise<void> => {
    loadCommonData();
    getAllProducts();
  };

  return {
    brands,
    groups,
    products,
  };
};

const DefaultDataContextResult: DataContextResult = {
  brands: [],
  groups: [],
  products: [],
};

const DataContext = React.createContext<DataContextResult>(
  DefaultDataContextResult,
);

export const useDataContext = () => useContext(DataContext);
type Props = {
  children: React.ReactNode;
};
export const DataContextProvider: FC<Props> = ({children}: Props) => {
  const facade = useDataContextFacade();
  return <DataContext.Provider value={facade}>{children}</DataContext.Provider>;
};
