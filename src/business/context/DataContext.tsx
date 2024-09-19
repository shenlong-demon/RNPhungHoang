import {
  CreateProductRequest,
  DataResult,
  Product,
  STATUS,
  UpdateProductRequest,
  useDataFacade,
} from '@src/business';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Dto } from '@core/common';
import { DataFacade, ProductFacade } from '@src/business/facade';
import { File } from '@core/models';

export type DataContextResult = {
  products: Product[];
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    reloadAllData(false);
  }, []);

  const allProducts = useMemo(() => {
    return (products || []).sort((b1: Product, b2: Product): number => {
      if (b1.status !== b2.status) {
        return b1.status === STATUS.ACTIVE ? -1 : 1;
      }
      return b1.name > b2.name ? 1 : -1;
    });
  }, [products]);

  const loadCommonData = async (forceGetNew?: boolean): Promise<void> => {
    const data: DataResult | null = await dataFacade.getAllData(forceGetNew);
    if (!!data) {
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
    products: allProducts,

    createProduct,
    updateProduct,
    refreshData,
  };
};

const DefaultDataContextResult: DataContextResult = {
  products: [],
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
  refreshData: async (): Promise<void> => {},
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
