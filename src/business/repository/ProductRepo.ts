import {ApiResult, BaseRepo, Sdo} from '@core/common';
import {API_URL} from '@src/business';
import {
    CreateProductRequestSdo,
    ProductFilterRequestSdo,
    UpdateProductRequestSdo
} from "@src/business/repository/requests";

export class ProductRepo extends BaseRepo<ProductRepo> {
    constructor() {
        super();
    }
    public static shared(): ProductRepo {
        return this.Instance(ProductRepo);
    }


    async getProductsBy(filter: ProductFilterRequestSdo): Promise<Sdo<any[]>> {
        const api: ApiResult = await this.api.post(API_URL.GET_PRODUCTS_BY(), filter);
        return this.populate(api);
    }

    async createProduct(product: CreateProductRequestSdo): Promise<Sdo<any | null>> {
        const api: ApiResult = await this.api.post(API_URL.CREATE_PRODUCT(), product);
        return this.populate(api);
    }

    async updateProduct(id: string, product: UpdateProductRequestSdo) : Promise<Sdo<any | null>> {
        const api: ApiResult = await this.api.post(API_URL.UPDATE_PRODUCT(id), product);
        return this.populate(api);
    }
}
