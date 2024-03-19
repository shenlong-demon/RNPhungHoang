import {BaseService, Dto, Sdo} from '@core/common';
import {AuthRepo} from "@src/business/repository/AuthRepo";
import {User} from "@src/business";

export class AuthService extends BaseService<AuthService> {
  private authRepo: AuthRepo = AuthRepo.shared();
  constructor() {
    super();
  }
  public static shared(): AuthService {
    return this.Instance(AuthService);
  }

  async login(phone: string, password: string): Promise<Dto<User | null>> {
    let user: User | null = null;
    const sdo: Sdo<any> = await this.authRepo.login(phone, password);
    if(sdo.isSuccess){
      user = sdo.data as User;
    }
    return this.populateData<User | null>(sdo, user);
  }
}
