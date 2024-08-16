import { BaseService } from '@core/common';
import {
  Brand,
  Group,
  LOCAL_STORAGE_KEY,
  Product,
  Setting,
  User,
} from '@src/business';
import { LocalStorage } from '@core/storage';

export class CacheService extends BaseService<CacheService> {
  constructor() {
    super();
  }

  public static shared(): CacheService {
    return this.Instance(CacheService);
  }

  async saveUser(user: User): Promise<void> {
    await LocalStorage.saveObject(LOCAL_STORAGE_KEY.USER, user);
  }

  async getUser(): Promise<User | null> {
    return LocalStorage.getObject<User>(LOCAL_STORAGE_KEY.USER);
  }

  async removeUser(): Promise<void> {
    await LocalStorage.remove(LOCAL_STORAGE_KEY.USER);
  }

  async saveSetting(setting: Setting): Promise<void> {
    await LocalStorage.saveObject(LOCAL_STORAGE_KEY.SETTING, setting);
  }

  async cacheAllProduct(products: Product[]): Promise<void> {
    for (let i = 0; i < products.length; i++) {
      const product: Product = products[i];
      await this.saveProduct(product);
    }
  }

  async saveProduct(product: Product): Promise<void> {
    const key: string = this.genProductKey(product);
    await LocalStorage.saveObject(key, product);
  }

  private genProductKey(product: Product): string {
    return `${LOCAL_STORAGE_KEY.PRODUCT_WILDCARD}_${product.id}`;
  }

  async clearAllProducts(): Promise<void> {
    const keys: string[] = await LocalStorage.getAllKeysByWildcard(
      LOCAL_STORAGE_KEY.PRODUCT_WILDCARD,
    );
    for (let i = 0; i < keys.length; i++) {
      await LocalStorage.remove(keys[i]);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    return LocalStorage.getObjectsByWildcard<Product>(
      LOCAL_STORAGE_KEY.PRODUCT_WILDCARD,
    );
  }

  async saveBrands(brands: Brand[]): Promise<void> {
    for (let i = 0; i < brands.length; i++) {
      const brand: Brand = brands[i];
      await this.saveBrand(brand);
    }
  }

  async saveGroups(groups: Group[]): Promise<void> {
    for (let i = 0; i < groups.length; i++) {
      const group: Group = groups[i];
      await this.saveGroup(group);
    }
  }

  private genBrandKey(brand: Brand): string {
    return `${LOCAL_STORAGE_KEY.BRAND_WILDCARD}_${brand.id}`;
  }

  private genGroupKey(group: Group): string {
    return `${LOCAL_STORAGE_KEY.GROUP_WILDCARD}_${group.id}`;
  }

  async getBrands(): Promise<Brand[]> {
    return LocalStorage.getObjectsByWildcard<Brand>(
      LOCAL_STORAGE_KEY.BRAND_WILDCARD,
    );
  }

  async getGroups(): Promise<Group[]> {
    return LocalStorage.getObjectsByWildcard<Group>(
      LOCAL_STORAGE_KEY.GROUP_WILDCARD,
    );
  }

  async saveGroup(group: Group): Promise<void> {
    const key: string = this.genGroupKey(group);
    await LocalStorage.saveObject(key, group);
  }

  async saveBrand(brand: Brand): Promise<void> {
    const key: string = this.genBrandKey(brand);
    await LocalStorage.saveObject(key, brand);
  }

  async clearDataForUser(): Promise<void> {
    await LocalStorage.removeObjectsByWildcard(
      LOCAL_STORAGE_KEY.PRODUCT_WILDCARD,
    );
    await LocalStorage.removeObjectsByWildcard(
      LOCAL_STORAGE_KEY.BRAND_WILDCARD,
    );
    await LocalStorage.removeObjectsByWildcard(
      LOCAL_STORAGE_KEY.GROUP_WILDCARD,
    );
    await LocalStorage.remove(LOCAL_STORAGE_KEY.USER);
    await LocalStorage.remove(LOCAL_STORAGE_KEY.SETTING);
  }
}
