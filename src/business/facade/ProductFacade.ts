import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Utility} from '@core/common';
import {Product, ProductService, UpdateFileService} from '@src/business';
import {File} from '@core/models';
import {
  CreateProductRequest,
  ProductFilterRequest,
  UpdateProductRequest,
} from '@src/business/model';

export class ProductFacade extends BaseFacade<ProductFacade> {
  private static readonly IMAGE_FOLDER: string = 'Product';

  private productService: ProductService = ProductService.shared();
  private uploadFileService: UpdateFileService = UpdateFileService.shared();

  constructor() {
    super();
  }

  public static shared(): ProductFacade {
    return this.Instance(ProductFacade);
  }

  async getProductsBy(filter: ProductFilterRequest): Promise<Dto<Product[]>> {
    const dto: Dto<Product[]> = await this.productService.getProductsBy(filter);
    return dto;
  }

  async createProduct(
    req: CreateProductRequest,
    imageFile?: File,
  ): Promise<Dto<Product | null>> {
    const appKey: string = Utility.UUID();
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(
        ProductFacade.IMAGE_FOLDER,
        imageFile,
        appKey,
      );
    if (uploadDto.next()) {
      req.appKey = appKey;
      req.image = uploadDto.data as string;
      const dto: Dto<Product | null> = await this.productService.createProduct(
        req,
      );
      return dto;
    }
    return uploadDto.bypass();
  }

  async updateProduct(
    id: number,
    appKey: string,
    req: UpdateProductRequest,
    imageFile?: File,
  ): Promise<Dto<Product | null>> {
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(
        ProductFacade.IMAGE_FOLDER,
        imageFile,
        appKey,
      );

    if (uploadDto.next()) {
      req.image = uploadDto.data as string;
      const dto: Dto<Product | null> = await this.productService.updateProduct(
        id,
        req,
      );
      return dto;
    }
    return uploadDto.bypass();
  }
}
