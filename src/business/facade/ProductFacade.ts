import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Fto} from '@core/common';
import {Product, ProductService, UpdateFileService} from '@src/business';
import {ProductFilterRequestDto} from '@src/business/service/requests';
import {File} from '@core/models';

export class ProductFacade extends BaseFacade<ProductFacade> {
  private productService: ProductService = ProductService.shared();
  private uploadFileService: UpdateFileService = UpdateFileService.shared();

  constructor() {
    super();
  }

  public static shared(): ProductFacade {
    return this.Instance(ProductFacade);
  }

  async getProductsBy(
    filter: ProductFilterRequestDto,
  ): Promise<Fto<Product[]>> {
    const dto: Dto<Product[]> = await this.productService.getProductsBy(filter);
    return this.populate<Product[]>(dto);
  }

  async createProduct(
    product: Product,
    imageFile?: File,
  ): Promise<Fto<Product | null>> {
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(imageFile);
    if (uploadDto.isSuccess) {
      product.image = uploadDto.data as string;
      const dto: Dto<Product> = await this.productService.createProduct(
        product,
      );
      return this.populate<Product>(dto);
    }
    return this.failed(uploadDto.code, uploadDto.message);
  }

  async updateProduct(
    id: string,
    product: Product,
    imageFile?: File,
  ): Promise<Fto<Product | null>> {
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(imageFile);

    if (uploadDto.isSuccess) {
      product.image = uploadDto.data as string;
      const dto: Dto<Product> = await this.productService.updateProduct(
        id,
        product,
      );
      return this.populate<Product>(dto);
    }
    return this.failed(uploadDto.code, uploadDto.message);
  }
}
