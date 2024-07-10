import {BaseService, Dto} from '@core/common';
import {Product} from '@src/business';
import {ProductRepo} from '@src/business/repository';
import {
  CreateProductRequest,
  ProductFilterRequest,
  UpdateProductRequest,
} from '@src/business/model';

export class ProductService extends BaseService<ProductService> {
  private productRepo: ProductRepo = ProductRepo.shared();

  constructor() {
    super();
  }

  public static shared(): ProductService {
    return this.Instance(ProductService);
  }

  async getProductsBy(filter: ProductFilterRequest): Promise<Dto<Product[]>> {
    const dto: Dto<Product[]> = await this.productRepo.getProductsBy(filter);
    return dto;
  }

  async createProduct(req: CreateProductRequest): Promise<Dto<Product | null>> {
    const dto: Dto<Product | null> = await this.productRepo.createProduct(req);
    return dto;
  }

  async updateProduct(
    id: number,
    req: UpdateProductRequest,
  ): Promise<Dto<Product | null>> {
    const dto: Dto<Product | null> = await this.productRepo.updateProduct(
      id,
      req,
    );
    return dto;
  }
}
