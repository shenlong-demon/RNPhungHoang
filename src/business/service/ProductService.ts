import {BaseService, Dto, Sdo} from '@core/common';
import {Product} from '@src/business';
import {ProductRepo} from "@src/business/repository";
import {ProductFilterRequestSdo} from "@src/business/repository/requests";
import {ProductFilterRequestDto} from "@src/business/service/requests";

export class ProductService extends BaseService<ProductService> {
    private productRepo: ProductRepo = ProductRepo.shared();
    constructor() {
        super();
    }
    public static shared(): ProductService {
        return this.Instance(ProductService);
    }

    async getProductsBy(filter: ProductFilterRequestDto): Promise<Dto<Product[]>> {
        const sdo: Sdo<Product[]> = await this.productRepo.getProductsBy(filter);
        return this.populate<Product[]>(sdo);
    }
}
