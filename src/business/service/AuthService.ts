import {BaseService, Dto, Sdo} from '@core/common';
import {AuthRepo} from "@src/business/repository/AuthRepo";
import {LoginModel, Setting, User} from "@src/business";

export class AuthService extends BaseService<AuthService> {
  private authRepo: AuthRepo = AuthRepo.shared();
  constructor() {
    super();
  }
  public static shared(): AuthService {
    return this.Instance(AuthService);
  }

  async login(phone: string, password: string): Promise<Dto<LoginModel>> {
    let user: User | null = null;
    let setting: Setting | null = null;
    const sdo: Sdo<any> = await this.authRepo.login(phone, password);
    let loginModel: LoginModel | null = null;
    if (sdo.isSuccess && !!sdo.data) {
      user = sdo.data.user as User;
      setting = sdo.data.setting as Setting;
      loginModel = {
        user,
        setting
      }
    }

    return this.populateData<LoginModel>(sdo, loginModel);
  }
}
