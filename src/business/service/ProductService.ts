import { BaseService, Dto, Sdo } from '@core/common';
import { Product } from '@src/business';
import { ProductRepo } from '@src/business/repository';
import { ProductFilterRequestDto } from '@src/business/service/requests';

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

  async createProduct(product: Product): Promise<Dto<Product>> {
    const sdo: Sdo<Product | null> = await this.productRepo.createProduct(product);
    return this.populateData(sdo, sdo.data);
  }

  async updateProduct(product: Product): Promise<Dto<Product>> {
    const sdo: Sdo<Product | null> = await this.productRepo.updateProduct(product.id, product);
    return this.populateData(sdo, sdo.data);
  }
}
