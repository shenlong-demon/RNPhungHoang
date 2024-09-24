import { BaseRepo } from '@core/common';
import { API_URL, ENV } from '@src/business';

export class InfoRepo extends BaseRepo<InfoRepo> {
  constructor() {
    super();
  }

  public static shared(): InfoRepo {
    return this.Instance(InfoRepo);
  }

  async getInfo(): Promise<any> {
    return this.api.get(ENV.HOST);
  }

  async logout(): Promise<void> {
    await this.api.post(API_URL.LOGOUT(), {});
  }
}
