import {LoginFacade} from '@src/business/facade';
import {Fto} from '@core/common';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {LoginModel, useAuthContext, User, useSettingContextFacade} from '@src/business';
import {Animated} from "react-native";
import Value = Animated.Value;

type AuthFacadeResult = {
  login: (username: string, password) => Promise<void>;
};

export const useAuthFacade = (): AuthFacadeResult => {
  const facade: LoginFacade = LoginFacade.shared();
  const {setUser} = useAuthContext();
  const {setSetting} = useSettingContextFacade();
  const login = async (username: string, password: string): Promise<void> => {
    // setLoading
    const fto: Fto<LoginModel | null> = await facade.login(username, password);
    if (fto.isSuccess && fto.data) {
      const loginModel: LoginModel = fto.data;
      setSetting(loginModel.setting);
      setUser(loginModel.user);
    }
    // setLoading
  };



  return {login};
};
