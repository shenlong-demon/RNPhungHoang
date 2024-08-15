import { BaseService, Dto } from '@core/common';
import { AuthRepo } from '@src/business/repository/AuthRepo';
import { LoginResult } from '@src/business/model';

export class AuthService extends BaseService<AuthService> {
  private authRepo: AuthRepo = AuthRepo.shared();

  constructor() {
    super();
  }

  public static shared(): AuthService {
    return this.Instance(AuthService);
  }

  async login(
    phone: string,
    password: string,
  ): Promise<Dto<LoginResult | null>> {
    const dto: Dto<LoginResult | null> = await this.authRepo.login(
      phone,
      password,
    );
    return dto;
  }
}
