import {ApiResult, BaseRepo, Dto} from '@core/common';
import {API_URL} from '@src/business';

import {
  CreateProductRequest,
  ProductFilterRequest,
  UpdateProductRequest,
} from '@src/business/model';

export class ProductRepo extends BaseRepo<ProductRepo> {
  constructor() {
    super();
  }

  public static shared(): ProductRepo {
    return this.Instance(ProductRepo);
  }

  async getProductsBy(filter: ProductFilterRequest): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.post(
      API_URL.GET_PRODUCTS_BY(),
      filter,
    );
    return this.populate(api);
  }

  async createProduct(req: CreateProductRequest): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(API_URL.CREATE_PRODUCT(), req);
    return this.populate(api);
  }

  async updateProduct(
    id: number,
    req: UpdateProductRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(API_URL.UPDATE_PRODUCT(id), req);
    return this.populate(api);
  }
}
