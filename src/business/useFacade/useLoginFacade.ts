import {LoginFacade} from '@src/business/facade';
import {Dto, Fto} from '@core/common';
import {
  LoginModel,
  useAuthContext,
  useSettingContextFacade,
} from '@src/business';
import {LoginResult} from '@src/business/model';

type AuthFacadeResult = {
  login: (username: string, password) => Promise<void>;
};

export const useAuthFacade = (): AuthFacadeResult => {
  const facade: LoginFacade = LoginFacade.shared();
  const {setUser} = useAuthContext();
  const {setSetting} = useSettingContextFacade();
  const login = async (username: string, password: string): Promise<void> => {
    // setLoading
    const dto: Dto<LoginResult | null> = await facade.login(username, password);
    if (dto.next()) {
      const loginResult: LoginResult = dto.data!;
      setSetting(loginResult.setting);
      setUser(loginResult.user);
    }
    // setLoading
  };

  return {login};
};
