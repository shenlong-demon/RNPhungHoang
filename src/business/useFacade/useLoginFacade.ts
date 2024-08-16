import { AuthFacade } from '@src/business/facade';
import { Dto } from '@core/common';
import {
  useAuthContext,
  usePopupContext,
  useSettingContextFacade,
} from '@src/business';
import { LoginResult } from '@src/business/model';
import { useNavigation } from '@core/navigation';
import { Route } from '@src/screens/portrait/Route';

type AuthFacadeResult = {
  login: (username: string, password: string) => Promise<void>;
};

export const useAuthFacade = (): AuthFacadeResult => {
  const { showToast } = usePopupContext();
  const facade: AuthFacade = AuthFacade.shared().withHandler({
    handle_1003: async (dto: Dto<any | null>): Promise<void> => {
      showToast('Wrong Phone or Password !!!');
    },
  });
  const { setUser } = useAuthContext();
  const { setSetting } = useSettingContextFacade();
  const { replace } = useNavigation();
  const login = async (username: string, password: string): Promise<void> => {
    // setLoading
    const dto: Dto<LoginResult | null> = await facade.login(username, password);
    if (dto.next()) {
      const loginResult: LoginResult = dto.data!;
      setSetting(loginResult.setting);
      setUser(loginResult.user);
      replace(Route.APP);
    }
    // setLoading
  };

  return { login };
};
