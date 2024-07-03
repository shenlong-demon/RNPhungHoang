import { ApiResult, BaseRepo, Dto } from "@core/common";
import { API_URL } from "@src/business";

export class AuthRepo extends BaseRepo<AuthRepo> {
  constructor() {
    super();
  }

  public static shared(): AuthRepo {
    return this.Instance(AuthRepo);
  }

  async login(phone: string, password: string): Promise<Dto<any>> {
    const api: ApiResult = await this.api.post(API_URL.LOGIN(), {
      phone,
      password,
    });
    return this.populate(api);
  }
}
