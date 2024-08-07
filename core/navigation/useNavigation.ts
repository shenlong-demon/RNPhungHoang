import {
  ParamListBase,
  useNavigation as useLibNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback} from 'react';
import {Logger} from '@core/common';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationResult = {
  navigation?: any | null;
  navigate: (routeName: string, param?: any) => void;
  replace: (routeName: string) => void;
  goBack: () => void;
  popToTop: () => void;
  setOptions: (option: any) => void;
  getParam: () => any | null | undefined;
};

export const useNavigation = (): NavigationResult => {
  const navigation = useLibNavigation<StackNavigationProp<ParamListBase, ''>>();
  const routeNavigation = useRoute();

  const route = navigation?.current?.getCurrentRoute() || routeNavigation;
  const navigate = (routeName: string, param?: any): void => {
    navigation.navigate(routeName, param);
  };
  const replace = (routeName: string): void => {
    navigation.replace(routeName);
  };
  const goBack = (): void => {
    navigation.goBack();
  };

  const popToTop = (): void => {
    navigation.popToTop();
  };

  const setOptions = useCallback(
    (options: any): void => {
      navigation.setOptions(options);
    },
    [navigation],
  );

  const getParam = (): any | null => {
    let param: any | null | undefined = route?.params;
    if (param === undefined) {
      param = null;
    }
    Logger.log(() => [`useNavigation getParam`, param]);
    return param;
  };
  return {
    navigation,
    navigate,
    replace,
    setOptions,
    getParam,
    goBack,
    popToTop,
  };
};
