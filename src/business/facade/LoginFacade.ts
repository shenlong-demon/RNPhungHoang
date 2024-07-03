import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Logger, WebApi} from '@core/common';
import {AuthService} from '@src/business/service/AuthService';
import {Setting, User} from '@src/business';
import {CacheService} from '@src/business/service/CacheService';
import {LoginResult} from '@src/business/model';

export class LoginFacade extends BaseFacade<LoginFacade> {
  private authService: AuthService = AuthService.shared();

  constructor() {
    super();
  }

  public static shared(): LoginFacade {
    return this.Instance(LoginFacade);
  }

  async login(
    username: string,
    password: string,
  ): Promise<Dto<LoginResult | null>> {
    const dto: Dto<LoginResult | null> = await this.authService.login(
      username,
      password,
    );
    if (dto.next()) {
      const loginResult: LoginResult = dto.data!;
      const user: User = loginResult.user;
      const setting: Setting = loginResult.setting;
      await CacheService.shared().saveUser(user);
      await CacheService.shared().saveSetting(setting);
      this.handleForUser(user);
    }
    return dto;
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
