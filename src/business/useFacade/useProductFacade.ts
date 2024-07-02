import {Fto} from '@core/common';
import {Product} from '@src/business';
import {ProductFacade} from '@src/business/facade';
import {ProductFilterRequestDto} from '@src/business/service/requests';
import {File} from '@core/models';

type ProductFacadeResult = {
  getProductsByBrandAndGroup: (
    filter: ProductFilterRequestDto,
  ) => Promise<Product[]>;
  submitProduct: (
    id: string,
    product: Product,
    imageFile?: File,
  ) => Promise<Product | null>;
};

export const useProductFacade = (): ProductFacadeResult => {
  const productFacade: ProductFacade = ProductFacade.shared();

  const getProductsByBrandAndGroup = async (
    filter: ProductFilterRequestDto,
  ): Promise<Product[]> => {
    const fto: Fto<Product[]> = await productFacade.getProductsBy(filter);
    return fto.data;
  };

  const createProduct = async (
    product: Product,
    imageFile?: File,
  ): Promise<Product | null> => {
    const fto: Fto<Product | null> = await productFacade.createProduct(product, imageFile);
    return fto.data;
  };
  const updateProduct = async (
    id: string,
    product: Product,
    imageFile?: File,
  ): Promise<Product | null> => {
    const fto: Fto<Product | null> = await productFacade.updateProduct(
      id,
      product,
      imageFile,
    );
    return fto.data;
  };
  const submitProduct = async (
    id: string,
    product: Product,
    imageFile?: File,
  ): Promise<Product | null> => {
    if (!!product.id) {
      return createProduct(product);
    }
    return updateProduct(id, product, imageFile);
  };

  return {
    getProductsByBrandAndGroup,
    submitProduct,
  };
};
