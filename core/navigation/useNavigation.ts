import {ParamListBase, useNavigation as useLibNavigation,} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {useCallback} from "react";
type NavigationResult = {
  navigation?: any | null;
  navigate: (routeName: string, param?: any) => void;
  replace: (routeName: string) => void;
  setOptions: (option: any) => void;
};

export const useNavigation = (): NavigationResult => {
  const navigation = useLibNavigation<StackNavigationProp<ParamListBase, ''>>();
  const navigate = (routeName: string, param?: any): void => {
    navigation.navigate(routeName, param);
  };
  const replace = (routeName: string): void => {
    navigation.replace(routeName);
  };
  const setOptions = useCallback((options: any) : void => {
    navigation.setOptions(options);
  }, [navigation]);
  return {navigation, navigate, replace, setOptions};
};
