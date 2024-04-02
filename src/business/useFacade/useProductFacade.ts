import {Fto} from '@core/common';
import {Product} from '@src/business';
import {ProductFacade} from "@src/business/facade";
import {ProductFilterRequestDto} from "@src/business/service/requests";

type ProductFacadeResult = {
    getProductsByBrandAndGroup :(filter: ProductFilterRequestDto) => Promise<Product[]>
};

export const useProductFacade = (): ProductFacadeResult => {
    const productFacade: ProductFacade = ProductFacade.shared();

    const getProductsByBrandAndGroup = async(filter: ProductFilterRequestDto) : Promise<Product[]> => {
        const fto: Fto<Product[]> = await productFacade.getProductsBy(filter);
        return fto.data;
    };

   return {
       getProductsByBrandAndGroup
   };
};
