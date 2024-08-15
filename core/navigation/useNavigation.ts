import {
  ParamListBase,
  useNavigation as useLibNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { Logger } from '@core/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { navigationRef } from '@core/navigation/NavigationContainer';

type NavigationResult = {
  navigate: (routeName: string, param?: any) => void;
  replace: (routeName: string) => void;
  goBack: () => void;
  popToTop: () => void;
  setOptions: (option: any) => void;
  getParam: () => any | null | undefined;
};

export const useNavigation = (): NavigationResult => {
  const navigation = useLibNavigation<StackNavigationProp<ParamListBase, ''>>();
  const navigator = (): any | null | undefined => {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      return navigationRef;
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
      return navigation;
    }
  };
  const navigate = (routeName: string, param?: any): void => {
    navigator()?.navigate(routeName, param);
  };
  const replace = (routeName: string): void => {
    navigator()?.replace(routeName);
  };
  const goBack = (): void => {
    navigator()?.goBack();
  };

  const popToTop = (): void => {
    navigator()?.popToTop();
  };

  const setOptions = useCallback(
    (options: any): void => {
      navigator()?.setOptions(options);
    },
    [navigator()],
  );

  const getParam = (): any | null => {
    const route = navigator()?.current?.getCurrentRoute() || useRoute();
    let param: any | null | undefined = route?.params;
    if (param === undefined) {
      param = null;
    }
    Logger.log(() => [`useNavigation getParam`, param]);
    return param;
  };
  return {
    navigate,
    replace,
    setOptions,
    getParam,
    goBack,
    popToTop,
  };
};
