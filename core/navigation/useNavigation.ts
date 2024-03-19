import {
  ParamListBase,
  useNavigation as useLibNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
// import {StackNavigationProp} from '@react-navigation/stack';
type NavigationResult = {
  navigate: (routeName: string) => void;
  replace: (routeName: string) => void;
};

export const useNavigation = (): NavigationResult => {
  const navigation = useLibNavigation<StackNavigationProp<ParamListBase, ''>>();
  const navigate = (routeName: string): void => {
    navigation.navigate(routeName);
  };
  const replace = (routeName: string): void => {
    navigation.replace(routeName);
  };
  return {navigate, replace};
};
