import {LoginFacade} from '@src/business/facade';
import {Fto} from '@core/common';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {User} from '@src/business';

type AuthFacadeResult = {
  login: (username: string, password) => Promise<void>;
};

export const useAuthFacade = (): AuthFacadeResult => {
  const facade: LoginFacade = LoginFacade.shared();
  const {replace} = useNavigation();
  const login = async (username: string, password: string): Promise<void> => {
    // setLoading
    const fto: Fto<User | null> = await facade.login(username, password);
    if (fto.isSuccess) {
      replace(Route.MAIN);
    }
    // setLoading
  };

  return {login};
};
