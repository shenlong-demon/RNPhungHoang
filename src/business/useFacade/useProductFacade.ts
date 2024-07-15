import {Product} from '@src/business';
import {ProductFacade} from '@src/business/facade';
import {File} from '@core/models';
import {
  CreateProductRequest,
  ProductFilterRequest,
  UpdateProductRequest,
} from '@src/business/model';
import {Dto} from '@core/common';

type ProductFacadeResult = {
  getProductsBy: (filter: ProductFilterRequest) => Promise<Product[]>;
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
  getAllActiveProducts: () => Promise<Dto<Product[]>>;
};

export const useProductFacade = (): ProductFacadeResult => {
  const productFacade: ProductFacade = ProductFacade.shared();

  const getProductsBy = async (
    filter: ProductFilterRequest,
  ): Promise<Product[]> => {
    const dto: Dto<Product[]> = await productFacade.getProductsBy(filter);
    return dto.data || [];
  };

  const createProduct = async (
    req: CreateProductRequest,
    imageFile?: File,
  ): Promise<Dto<Product | null>> => {
    const dto: Dto<Product | null> = await productFacade.createProduct(
      req,
      imageFile,
    );
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
    return dto;
  };
  const getAllActiveProducts = async (): Promise<Dto<Product[]>> => {
    const dto: Dto<Product[]> = await productFacade.getAllActiveProducts();
    return dto;
  };

  return {
    getProductsBy,
    updateProduct,
    createProduct,
    getAllActiveProducts,
  };
};
