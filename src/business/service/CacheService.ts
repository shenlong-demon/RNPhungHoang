import { BaseService } from '@core/common';
import { LOCAL_STORAGE_KEY, Setting, User } from '@src/business';
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
}
