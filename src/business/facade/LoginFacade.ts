import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Fto} from '@core/common';
import {AuthService} from '@src/business/service/AuthService';
import {User} from '@src/business';

export class LoginFacade extends BaseFacade<LoginFacade> {
  private authService: AuthService = AuthService.shared();
  constructor() {
    super();
  }
  public static shared(): LoginFacade {
    return this.Instance(LoginFacade);
  }

  async login(username: string, password: string): Promise<Fto<User | null>> {
    const dto: Dto<User | null> = await this.authService.login(
      username,
      password,
    );
    if(dto.isSuccess && !!dto.data){

    }
    return this.populate<User | null>(dto);
  }
}
