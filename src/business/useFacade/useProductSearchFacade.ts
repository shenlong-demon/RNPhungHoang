import { Product, STATUS, useDataContext } from '@src/business';
import { CONSTANTS } from '@core/common';

type ProductSearchFacadeResult = {
  search: (searchText: string | null, status: STATUS | null) => Product[];
};

export const useProductSearchFacade = (): ProductSearchFacadeResult => {
  const { products } = useDataContext();

  const search = (
    searchText: string | null,
    status: STATUS | null,
  ): Product[] => {
    const textNormal: string =
      searchText?.replace(/[\u0300-\u036f]/g, '')?.toLowerCase() ||
      CONSTANTS.STR_EMPTY;
    let allProducts: Product[] = products;
    if (status !== null) {
      allProducts = allProducts.filter((p: Product): boolean => {
        return p.status === status;
      });
    }
    const result: Product[] = allProducts.filter((p: Product): boolean => {
      const id: string = p.id.toString().toLowerCase();
      const name: string = p.name.replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const otherName: string | undefined = p.otherName
        ?.replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      const code: string | undefined = p.code
        ?.replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return (
        textNormal === CONSTANTS.STR_EMPTY ||
        textNormal.trim() === CONSTANTS.STR_EMPTY ||
        id.includes(textNormal) ||
        name.includes(textNormal) ||
        (!!otherName && otherName.includes(textNormal)) ||
        (!!code && code.includes(textNormal))
      );
    });
    return result.slice(0, 20);
  };
  return { search };
};
