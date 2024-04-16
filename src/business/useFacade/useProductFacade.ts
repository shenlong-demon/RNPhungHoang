import { Fto } from '@core/common';
import { Product } from '@src/business';
import { ProductFacade } from '@src/business/facade';
import { ProductFilterRequestDto } from '@src/business/service/requests';

type ProductFacadeResult = {
  getProductsByBrandAndGroup: (filter: ProductFilterRequestDto) => Promise<Product[]>;
  submitProduct: (product: Product) => Promise<Product | null>;
};

export const useProductFacade = (): ProductFacadeResult => {
  const productFacade: ProductFacade = ProductFacade.shared();

  const getProductsByBrandAndGroup = async (filter: ProductFilterRequestDto): Promise<Product[]> => {
    const fto: Fto<Product[]> = await productFacade.getProductsBy(filter);
    return fto.data;
  };

  const createProduct = async (product: Product): Promise<Product | null> => {
    const fto: Fto<Product | null> = await productFacade.createProduct(product);
    return fto.data;
  };
  const updateProduct = async (product: Product): Promise<Product | null> => {
    const fto: Fto<Product | null> = await productFacade.updateProduct(product);
    return fto.data;
  };
  const submitProduct = async (product: Product): Promise<Product | null> => {
    if (!!product.id) {
      return createProduct(product);
    }
    return updateProduct(product);
  };

  return {
    getProductsByBrandAndGroup,
    submitProduct,
  };
};
