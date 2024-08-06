import {
  Brand,
  CreateBrandRequest,
  CreateGroupRequest,
  DataResult,
  Group,
  Product,
  STATUS,
  UpdateBrandRequest,
  UpdateGroupRequest,
  useDataFacade,
  useProductFacade,
} from '@src/business';
import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {Dto} from '@core/common';
import {DataFacade} from '@src/business/facade';

export type DataContextResult = {
  brands: Brand[];
  activeBrands: Brand[];
  groups: Group[];
  activeGroups: Group[];

  products: Product[];

  createBrand: (name: string, status: STATUS) => Promise<Dto<Brand | null>>;
  updateBrand: (
    id: number,
    name: string,
    status: STATUS,
  ) => Promise<Dto<Brand | null>>;
  createGroup: (name: string, status: STATUS) => Promise<Dto<Group | null>>;
  updateGroup: (
    id: number,
    name: string,
    status: STATUS,
  ) => Promise<Dto<Group | null>>;
};

export const useDataContextFacade = (): DataContextResult => {
  const dataFacade = useDataFacade();
  const productFacade = useProductFacade();
  const facade = DataFacade.shared();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    reloadAllData();
  }, []);

  const allBrands = useMemo(() => {
    return (brands || []).sort((b1: Brand, b2: Brand): number => {
      if (b1.status !== b2.status) {
        return b1.status === STATUS.ACTIVE ? -1 : 1;
      }
      return b1.name > b2.name ? 1 : -1;
    });
  }, [brands]);

  const activeBrands = useMemo(() => {
    return (brands || [])
      .filter((b: Brand): boolean => {
        return b.status === STATUS.ACTIVE;
      })
      .sort((b1: Brand, b2: Brand): number => {
        return b1.name > b2.name ? -1 : 1;
      });
  }, [brands]);

  const activeGroups = useMemo(() => {
    return (groups || [])
      .filter((b: Group): boolean => {
        return b.status === STATUS.ACTIVE;
      })
      .sort((g1: Group, g2: Group): number => {
        return g1.name > g2.name ? -1 : 1;
      });
  }, [groups]);

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
  const createBrand = async (
    name: string,
    status: STATUS,
  ): Promise<Dto<Brand | null>> => {
    const dto: Dto<Brand | null> = await facade.createBrand({
      name,
      status,
    } as CreateBrandRequest);
    if (dto.next()) {
      const brand: Brand = dto.data as Brand;
      setBrands([brand, ...brands]);
    }
    return dto;
  };
  const updateBrand = async (
    id: number,
    name: string,
    status: STATUS,
  ): Promise<Dto<Brand | null>> => {
    const dto: Dto<Brand | null> = await facade.updateBrand(id, {
      name,
      status,
    } as UpdateBrandRequest);
    if (dto.next()) {
      const brand: Brand = dto.data as Brand;
      setBrands([brand, ...brands.filter((b: Brand) => b.id !== id)]);
    }
    return dto;
  };
  const createGroup = async (
    name: string,
    status: STATUS,
  ): Promise<Dto<Group | null>> => {
    const dto: Dto<Group | null> = await facade.createGroup({
      name,
      status,
    } as CreateGroupRequest);
    if (dto.next()) {
      const group: Group = dto.data as Group;
      setGroups([group, ...groups]);
    }
    return dto;
  };
  const updateGroup = async (
    id: number,
    name: string,
    status: STATUS,
  ): Promise<Dto<Group | null>> => {
    const dto: Dto<Group | null> = await facade.updateGroup(id, {
      name,
      status,
    } as UpdateGroupRequest);
    if (dto.next()) {
      const group: Group = dto.data as Group;
      setGroups([group, ...groups.filter((g: Group) => g.id !== id)]);
    }
    return dto;
  };

  return {
    brands: allBrands,
    activeBrands,
    groups,
    activeGroups,
    products,
    createBrand,
    updateBrand,
    createGroup,
    updateGroup,
  };
};

const DefaultDataContextResult: DataContextResult = {
  brands: [],
  activeBrands: [],
  groups: [],
  activeGroups: [],
  products: [],
  createBrand: async (
    _name: string,
    _status: STATUS,
  ): Promise<Dto<Brand | null>> => {
    return Dto.default();
  },
  updateBrand: async (
    _id: number,
    _name: string,
    _status: STATUS,
  ): Promise<Dto<Brand | null>> => {
    return Dto.default();
  },
  createGroup: async (
    _name: string,
    _status: STATUS,
  ): Promise<Dto<Group | null>> => {
    return Dto.default();
  },
  updateGroup: async (
    _id: number,
    _name: string,
    _status: STATUS,
  ): Promise<Dto<Group | null>> => {
    return Dto.default();
  },
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
