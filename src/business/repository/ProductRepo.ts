import {ApiResult, BaseRepo, Dto, Sdo} from '@core/common';
import {API_URL} from '@src/business';
import {ProductFilterRequestSdo} from "@src/business/repository/requests";

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
}
