import {ParamListBase, useNavigation as useLibNavigation, useRoute,} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {useCallback} from "react";
import {NavigationState} from "@react-navigation/routers";
import {Logger} from "@core/common";
type NavigationResult = {
  navigation?: any | null;
  navigate: (routeName: string, param?: any) => void;
  replace: (routeName: string) => void;
  setOptions: (option: any) => void;
  getParam :()=> any | null | undefined;
};

export const useNavigation = (): NavigationResult => {
  const navigation = useLibNavigation<StackNavigationProp<ParamListBase, ''>>();
  const route = useRoute();
  const navigate = (routeName: string, param?: any): void => {
    navigation.navigate(routeName, param);
  };
  const replace = (routeName: string): void => {
    navigation.replace(routeName);
  };
  const setOptions = useCallback((options: any) : void => {
    navigation.setOptions(options);
  }, [navigation]);

  const getParam = (): any | null => {
    let param: any | null | undefined = route.params;
    if(param === undefined){
      param = null;
    }
    Logger.log(() => [`useNavigation getParam`, param])
    return param;
  };
  return {navigation, navigate, replace, setOptions, getParam};
};
