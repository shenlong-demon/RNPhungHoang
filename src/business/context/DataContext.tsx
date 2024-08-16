import {
  Brand,
  CreateBrandRequest,
  CreateGroupRequest,
  CreateProductRequest,
  DataResult,
  Group,
  Product,
  STATUS,
  UpdateBrandRequest,
  UpdateGroupRequest,
  UpdateProductRequest,
  useDataFacade,
} from '@src/business';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Dto } from '@core/common';
import { DataFacade, ProductFacade } from '@src/business/facade';
import { File } from '@core/models';

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
  updateProduct: (
    id: number,
    appKey: string,
    req: UpdateProductRequest,
    imageFile?: File,
  ) => Promise<Dto<Product | null>>;
  createProduct: (
    req: CreateProductRequest,
    imageFile?: File,
  ) => Promise<Dto<Product | null>>;

  refreshData: () => Promise<void>;
};

export const useDataContextFacade = (): DataContextResult => {
  const dataFacade = useDataFacade();
  const productFacade = ProductFacade.shared();
  const facade = DataFacade.shared();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    reloadAllData(false);
  }, []);

  const allBrands = useMemo(() => {
    return (brands || []).sort((b1: Brand, b2: Brand): number => {
      if (b1.status !== b2.status) {
        return b1.status === STATUS.ACTIVE ? -1 : 1;
      }
      return b1.name > b2.name ? 1 : -1;
    });
  }, [brands]);

  const allGroups = useMemo(() => {
    return (groups || []).sort((b1: Group, b2: Group): number => {
      if (b1.status !== b2.status) {
        return b1.status === STATUS.ACTIVE ? -1 : 1;
      }
      return b1.name > b2.name ? 1 : -1;
    });
  }, [groups]);

  const allProducts = useMemo(() => {
    return (products || []).sort((b1: Product, b2: Product): number => {
      if (b1.status !== b2.status) {
        return b1.status === STATUS.ACTIVE ? -1 : 1;
      }
      return b1.name > b2.name ? 1 : -1;
    });
  }, [products]);


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

  const loadCommonData = async (forceGetNew?: boolean): Promise<void> => {
    const data: DataResult | null = await dataFacade.getAllData(forceGetNew);
    if (!!data) {
      setGroups(data.groups);
      setBrands(data.brands);
    }
  };
  const getAllProducts = async (forceGetNew?: boolean): Promise<void> => {
    const dto: Dto<Product[]> = await productFacade.getAllProducts(forceGetNew);
    if (dto.next()) {
      setProducts(dto.data as Product[]);
    }
  };

  const reloadAllData = async (forceGetNew?: boolean): Promise<void> => {
    loadCommonData(forceGetNew);
    getAllProducts(forceGetNew);
  };

  const refreshData = async (): Promise<void> => {
    reloadAllData(true);
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

  const createProduct = async (
    req: CreateProductRequest,
    imageFile?: File,
  ): Promise<Dto<Product | null>> => {
    const dto: Dto<Product | null> = await productFacade.createProduct(
      req,
      imageFile,
    );
    if (dto.next() && dto.data) {
      const newProduct: Product = dto.data! as Product;
      setProducts([newProduct, ...products]);
    }
    return dto;
  };
  const updateProduct = async (
    id: number,
    appKey: string,
    req: UpdateProductRequest,
    imageFile?: File,
  ): Promise<Dto<Product | null>> => {
    const dto: Dto<Product | null> = await productFacade.updateProduct(
      id,
      appKey,
      req,
      imageFile,
    );
    if (dto.next() && dto.data) {
      const updatedProduct: Product = dto.data! as Product;
      setProducts([
        updatedProduct,
        ...products.filter((p: Product) => p.id !== id),
      ]);
    }
    return dto;
  };

  return {
    brands: allBrands,
    activeBrands,
    groups: allGroups,
    activeGroups,
    products: allProducts,
    createBrand,
    updateBrand,
    createGroup,
    updateGroup,
    createProduct,
    updateProduct,
    refreshData,
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

  updateProduct: async (
    _id: number,
    _appKey: string,
    _req: UpdateProductRequest,
    _imageFile?: File,
  ): Promise<Dto<Product | null>> => {
    return Dto.default();
  },
  createProduct: async (
    _req: CreateProductRequest,
    _imageFile?: File,
  ): Promise<Dto<Product | null>> => {
    return Dto.default();
  },
  refreshData: async (): Promise<void> => {
  },
};

const DataContext = React.createContext<DataContextResult>(
  DefaultDataContextResult,
);

export const useDataContext = () => useContext(DataContext);
type Props = {
  children: React.ReactNode;
};
export const DataContextProvider: FC<Props> = ({ children }: Props) => {
  const facade = useDataContextFacade();
  return <DataContext.Provider value={facade}>{children}</DataContext.Provider>;
};
