import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Fto, Logger, WebApi} from '@core/common';
import {AuthService} from '@src/business/service/AuthService';
import {LoginModel, Setting, User} from '@src/business';
import {CacheService} from "@src/business/service/CacheService";

export class LoginFacade extends BaseFacade<LoginFacade> {
  private authService: AuthService = AuthService.shared();

  constructor() {
    super();
  }

  public static shared(): LoginFacade {
    return this.Instance(LoginFacade);
  }

  async login(username: string, password: string): Promise<Fto<LoginModel | null>> {
    const dto: Dto<LoginModel> = await this.authService.login(
        username,
        password,
    );
    if (dto.isSuccess && !!dto.data) {
      const loginModel: LoginModel = dto.data;
      const user: User = loginModel.user;
      const setting: Setting = loginModel.setting;
      await CacheService.shared().saveUser(user)
      await CacheService.shared().saveSetting(setting)
      this.handleForUser(user);

    }
    return this.populate<LoginModel | null>(dto);
  }

  async isLoggedIn(): Promise<User | null> {
    const user: User | null = await CacheService.shared().getUser();
    if (!!user) {
      this.handleForUser(user);
    }
    Logger.log(() => [`AuthFacade isLoggedIn ${!!user}`, user]);
    return user;
  }

  private async handleForUser(user: User): Promise<void> {

    const getTokenFunc = async (): Promise<string> => user.token;

    WebApi.shared().setGetToken(getTokenFunc);
  }
}
