import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Fto} from '@core/common';
import {Product, ProductService} from '@src/business';
import {ProductFilterRequestDto} from "@src/business/service/requests";

export class ProductFacade extends BaseFacade<ProductFacade> {
  private productService: ProductService = ProductService.shared();
  constructor() {
    super();
  }
  public static shared(): ProductFacade {
    return this.Instance(ProductFacade);
  }

  async getProductsBy(filter: ProductFilterRequestDto): Promise<Fto<Product[]>> {
    const dto: Dto<Product[]> = await this.productService.getProductsBy(filter);
    return this.populate<Product[]>(dto);
  }

}
